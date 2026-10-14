import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {createRequire} from "node:module";
import {fileURLToPath} from "node:url";

import {readBoundedJsonRequest} from "../src/lib/security/server/read-bounded-json-request.mjs";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requireFromRepo = createRequire(path.join(repo, "package.json"));
const ts = requireFromRepo("typescript");
const counters = {chat: 0, demo: 0};
const verifiedTokens = new Set();

async function loadEndpoint(relative, name, expectedImports) {
  const filename = path.join(repo, ...relative.split("/"));
  const code = fs.readFileSync(filename, "utf8");
  assert(code.includes("export async function POST("), `${name}: POST export missing`);
  const source = ts.createSourceFile(filename, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const modules = source.statements.filter(ts.isImportDeclaration).map((item) => item.moduleSpecifier.text);
  assert.deepEqual(modules, expectedImports, `${name}: import inventory changed; review harness`);
  const compiled = ts.transpileModule(code, {fileName: filename, compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
    isolatedModules: true
  }}).outputText;
  assert.equal((compiled.match(/^\s*import\s+/gm) ?? []).length, modules.length, `${name}: unexpected JS imports`);
  const withoutImports = compiled.replace(/^\s*import\s+[^\r\n]*\r?\n/gm, "");
  assert(!/^\s*import\s+/m.test(withoutImports), `${name}: unresolved imports`);

  globalThis.__g02cReadRequest = readBoundedJsonRequest;
  globalThis.__g02cCounters = counters;
  globalThis.__g02cVerifiedTokens = verifiedTokens;
  const common = `const NextResponse = {json: (body, options={}) => Response.json(body, {status: options.status ?? 200, headers: options.headers})};\nconst readBoundedJsonRequest = globalThis.__g02cReadRequest;\n`;
  const mocked = name === "CHAT"
    ? `const handleChatRetrievalPayload = async () => {globalThis.__g02cCounters.chat += 1; return {status:200, body:{ok:true,answer:'synthetic'}};};\nconst generateGroundedChatAnswer = async () => {throw Error('Network provider must not be called');};\n`
    : `const process = {env:{YAHOO_SMTP_USER:'qa@example.invalid',YAHOO_SMTP_APP_PASSWORD:'synthetic-not-secret',DEMO_RECIPIENT_EMAIL:'qa@example.invalid'}};\nconst nodemailer = {createTransport: () => ({sendMail: async () => {globalThis.__g02cCounters.demo += 1; return {messageId:'offline'};}})};\nconst verifyDemoTurnstile = async (token) => {
      if (typeof token !== 'string' || !token) return {ok:false,status:400,error:'turnstile_token_required'};
      if (globalThis.__g02cVerifiedTokens.has(token)) return {ok:false,status:403,error:'turnstile_rejected'};
      globalThis.__g02cVerifiedTokens.add(token);
      return {ok:true};
    };\n`;
  const body = Buffer.from(common + mocked + withoutImports).toString("base64");
  const endpointModule = await import(`data:text/javascript;base64,${body}`);
  return endpointModule.POST;
}

const chat = await loadEndpoint("src/app/api/chat/route.ts", "CHAT", [
  "next/server",
  "@/lib/rag/server/chat-retrieval-contract.mjs",
  "@/lib/rag/server/chat-generation-runtime.mjs",
  "@/lib/security/server/read-bounded-json-request.mjs"
]);
const demo = await loadEndpoint("src/app/api/demo-request/route.ts", "DEMO", [
  "nodemailer", "next/server", "@/lib/security/server/read-bounded-json-request.mjs",
  "@/lib/security/server/verify-demo-turnstile.mjs"
]);

const cases = [
  {name: "CHAT", fn: chat, key: "chat", url: "http://localhost:3000/api/chat", cap: 8192,
    body: JSON.stringify({message: "Hello Gym Master", pageLocale: "en"})},
  {name: "DEMO", fn: demo, key: "demo", url: "http://localhost:3000/api/demo-request", cap: 24576,
    body: JSON.stringify({name: "Synthetic QA", gym: "Synthetic Gym", email: "qa@example.invalid", locale: "en", turnstileToken: "qa-token-placeholder"})}
];

let passed = 0;
for (const endpoint of cases) {
  const {name, fn, key, url, cap, body} = endpoint;
  const jsonHeader = {"Content-Type": "application/json"};
  async function probe(label, expected, payload, headers, sideEffect) {
    const before = counters[key];
    // Each valid DEMO probe simulates an independent newly issued single-use token.
    if (name === "DEMO" && label.startsWith("valid_")) {
      payload = payload.replace("qa-token-placeholder", `qa-token-${label}`);
    }
    const request = new Request(url, {method: "POST", body: payload, headers});
    const response = await fn(request);
    const result = await response.json();
    assert.equal(response.status, expected, `${name} ${label}: HTTP status`);
    assert.equal(counters[key] - before, sideEffect, `${name} ${label}: provider/SMTP side effect`);
    if (expected === 200) assert.equal(result.ok, true, `${name} ${label}: valid request failed`);
    else assert.equal(result.ok, false, `${name} ${label}: missing error payload`);
    if (name === "CHAT") assert.equal(response.headers.get("cache-control"), "no-store");
    console.log(`PASS ${name} ${label}: status=${expected} mockCalls=${sideEffect}`);
    passed++;
  }
  await probe("valid_same_origin", 200, body, {...jsonHeader, Origin: "http://localhost:3000"}, 1);
  await probe("valid_missing_origin", 200, body, jsonHeader, 1);
  await probe("valid_charset_utf8", 200, body, {"Content-Type": "application/json; charset=utf-8"}, 1);
  await probe("malformed_json", 400, "{broken-json", jsonHeader, 0);
  await probe("unsupported_media_type", 415, body, {"Content-Type": "text/plain", Origin: "http://localhost:3000"}, 0);
  await probe("missing_media_type", 415, body, {Origin: "http://localhost:3000"}, 0);
  await probe("declared_content_length_too_large", 413, body, {...jsonHeader, "Content-Length": String(cap+1)}, 0);
  const tooBig = JSON.stringify({padding: "x".repeat(cap+100)});
  await probe("actual_body_over_cap", 413, tooBig, jsonHeader, 0);
  await probe("forged_short_length", 413, tooBig, {...jsonHeader, "Content-Length": "1"}, 0);
  await probe("cross_origin", 403, body, {...jsonHeader, Origin: "https://external.example"}, 0);
  await probe("null_origin", 403, body, {...jsonHeader, Origin: "null"}, 0);
  await probe("malformed_origin", 403, body, {...jsonHeader, Origin: "not-an-origin"}, 0);
  await probe("non_numeric_content_length", 400, body, {...jsonHeader, "Content-Length": "invalid"}, 0);
  await probe("utf8_body_beyond_byte_limit", 413, JSON.stringify({x: "ñ".repeat(cap)}), jsonHeader, 0);
  await probe("invalid_utf8", 400, new Uint8Array([0xff,0xfe]), jsonHeader, 0);
}

assert.equal(passed, 30);
console.log(`G02C HTTP BOUNDARY GREEN PASS: ${passed} offline assertions (15 per endpoint).`);
console.log("No OpenAI, SMTP, localhost, deployment or outbound network requests.");
