import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {createRequire} from "node:module";
import {fileURLToPath} from "node:url";

import {verifyDemoTurnstile} from "../src/lib/security/server/verify-demo-turnstile.mjs";

// Fully mocked provider. No outbound network, SMTP or real Turnstile credentials.
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requireFromRepo = createRequire(path.join(repo, "package.json"));
const ts = requireFromRepo("typescript");
const originalFetch = globalThis.fetch;
const envKeys = ["TURNSTILE_SECRET_KEY", "NEXT_PUBLIC_TURNSTILE_SITE_KEY", "TURNSTILE_ALLOWED_HOSTNAMES", "VERCEL_ENV"];
const oldEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));
const usedTokens = new Set();
let providerCalls = 0;
let smtpCalls = 0;
let networkFailure = false;
let providerHttpError = false;
let providerAction = "demo_request";
let providerHostname = "localhost";
let passed = 0;

function restore() {
  globalThis.fetch = originalFetch;
  for (const key of envKeys) {
    if (oldEnv[key] === undefined) delete process.env[key];
    else process.env[key] = oldEnv[key];
  }
}
function check(label, condition, message) {
  assert.ok(condition, message ?? label);
  passed++;
  console.log(`PASS I03D ${label}`);
}

try {
  process.env.TURNSTILE_SECRET_KEY = "OFFLINE-SECRET-NOT-A-REAL-KEY";
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "OFFLINE-SITE-NOT-A-REAL-KEY";
  process.env.TURNSTILE_ALLOWED_HOSTNAMES = "localhost, gym.example";
  delete process.env.VERCEL_ENV;

  globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://challenges.cloudflare.com/turnstile/v0/siteverify");
    assert.equal(options.method, "POST");
    assert.ok(options.signal);
    providerCalls++;
    if (networkFailure) throw new Error("mock provider unavailable");
    if (providerHttpError) return new Response("offline", {status: 503});
    const form = new URLSearchParams(options.body);
    const token = form.get("response");
    const duplicate = usedTokens.has(token);
    usedTokens.add(token);
    return Response.json({
      success: Boolean(token) && !duplicate,
      action: providerAction,
      hostname: providerHostname
    });
  };

  let result = await verifyDemoTurnstile("good-1");
  check("valid provider and hostname", result.ok === true);
  result = await verifyDemoTurnstile("good-1");
  check("reused token denied", result.status === 403);
  const beforeMissing = providerCalls;
  result = await verifyDemoTurnstile("");
  check("missing token denied pre-provider", result.status === 400 && providerCalls === beforeMissing);
  result = await verifyDemoTurnstile("x".repeat(2049));
  check("oversize token denied", result.status === 400 && providerCalls === beforeMissing);
  providerHostname = "attacker.invalid";
  result = await verifyDemoTurnstile("hostbad");
  check("wrong hostname denied", result.status === 403);
  providerHostname = "localhost";
  providerAction = "wrong_action";
  result = await verifyDemoTurnstile("actionbad");
  check("wrong action denied", result.status === 403);
  providerAction = "demo_request";
  networkFailure = true;
  result = await verifyDemoTurnstile("offline");
  check("provider exception fails closed", result.status === 503);
  networkFailure = false;
  providerHttpError = true;
  result = await verifyDemoTurnstile("http-error");
  check("provider HTTP 503 fails closed", result.status === 503);
  providerHttpError = false;
  delete process.env.TURNSTILE_ALLOWED_HOSTNAMES;
  const beforeEnv = providerCalls;
  result = await verifyDemoTurnstile("no-env");
  check("missing hostname policy fails closed", result.status === 503 && providerCalls === beforeEnv);
  process.env.TURNSTILE_ALLOWED_HOSTNAMES = "localhost";
  process.env.VERCEL_ENV = "production";
  result = await verifyDemoTurnstile("prod-localhost");
  check("production localhost fails closed", result.status === 503 && providerCalls === beforeEnv);
  process.env.TURNSTILE_ALLOWED_HOSTNAMES = "gym.example";
  process.env.TURNSTILE_SECRET_KEY = "1x0000000000000000000000000000000AA";
  result = await verifyDemoTurnstile("prod-test-secret");
  check("test secret refused in production", result.status === 503 && providerCalls === beforeEnv);
  process.env.TURNSTILE_SECRET_KEY = "OFFLINE-SECRET-NOT-A-REAL-KEY";
  delete process.env.VERCEL_ENV;
  process.env.TURNSTILE_ALLOWED_HOSTNAMES = "localhost";

  const relative = "src/app/api/demo-request/route.ts";
  const filename = path.join(repo, ...relative.split("/"));
  const code = fs.readFileSync(filename, "utf8");
  const source = ts.createSourceFile(filename, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const imports = source.statements.filter(ts.isImportDeclaration).map((item) => item.moduleSpecifier.text);
  assert.deepEqual(imports, [
    "nodemailer", "next/server", "@/lib/security/server/read-bounded-json-request.mjs",
    "@/lib/security/server/verify-demo-turnstile.mjs"
  ]);
  const compiled = ts.transpileModule(code, {fileName: filename, compilerOptions: {
    module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, isolatedModules: true
  }}).outputText;
  const withoutImports = compiled.replace(/^\s*import\s+[^\r\n]*\r?\n/gm, "");
  assert(!/^\s*import\s+/m.test(withoutImports));
  const {readBoundedJsonRequest} = await import("../src/lib/security/server/read-bounded-json-request.mjs");
  const mock = `const NextResponse={json:(body, opts={})=>Response.json(body,{status:opts.status??200})};
const readBoundedJsonRequest=globalThis.__i03dBounded;
const verifyDemoTurnstile=globalThis.__i03dVerifier;
const process={env:{YAHOO_SMTP_USER:'test@example.invalid',YAHOO_SMTP_APP_PASSWORD:'placeholder',DEMO_RECIPIENT_EMAIL:'test@example.invalid'}};
const nodemailer={createTransport:()=>({sendMail:async()=>{globalThis.__i03dMailCount++;return {messageId:'offline'};}})};
`;
  globalThis.__i03dBounded = readBoundedJsonRequest;
  globalThis.__i03dVerifier = verifyDemoTurnstile;
  globalThis.__i03dMailCount = 0;
  const endpoint = await import(`data:text/javascript;base64,${Buffer.from(mock + withoutImports).toString("base64")}`);
  async function call(body) {
    const response = await endpoint.POST(new Request("http://localhost:3000/api/demo-request", {
      method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)
    }));
    return {status: response.status, json: await response.json()};
  }
  const valid = {name: "Synthetic QA",gym:"Example Gym",email:"qa@example.invalid",locale:"en"};
  smtpCalls = globalThis.__i03dMailCount;
  let res = await call(valid);
  check("route no token zero SMTP", res.status === 400 && globalThis.__i03dMailCount === smtpCalls);
  res = await call({...valid,turnstileToken:"route-pass"});
  check("route valid token one SMTP", res.status === 200 && globalThis.__i03dMailCount === smtpCalls+1);
  res = await call({...valid,turnstileToken:"route-pass"});
  check("route repeated token zero additional SMTP", res.status === 403 && globalThis.__i03dMailCount === smtpCalls+1);
  res = await call({...valid,turnstileToken:"route-pass2",website:"bot-field"});
  check("honeypot preserved", res.status === 200 && globalThis.__i03dMailCount === smtpCalls+1);
  res = await call({...valid,name:"",turnstileToken:"invalid-payload"});
  check("validation before Siteverify", res.status === 400 && globalThis.__i03dMailCount === smtpCalls+1);
  networkFailure = true;
  res = await call({...valid,turnstileToken:"route-provider-down"});
  check("route provider down zero SMTP", res.status === 503 && globalThis.__i03dMailCount === smtpCalls+1);
  networkFailure = false;

  const formCode = fs.readFileSync(path.join(repo,"src/components/demo/DemoRequestForm.tsx"),"utf8");
  check("client includes sitekey + widget", formCode.includes("NEXT_PUBLIC_TURNSTILE_SITE_KEY") && formCode.includes("window.turnstile.render"));
  check("client sends token only in email payload", formCode.includes("turnstileToken: token") && !formCode.includes("turnstileToken: token, locale"));
  check("WhatsApp path still opens wa.me", formCode.includes('window.open(url, "_blank", "noopener,noreferrer")'));
  const pageCode = fs.readFileSync(path.join(repo, "src/app/[locale]/demo/page.tsx"), "utf8");
  check("demo page wires all Turnstile labels", ["verificationRequired", "verificationFailed", "verificationUnavailable"]
    .every((key) => pageCode.includes(`${key}: t("form.${key}")`)));
  for (const language of ["es", "en"]) {
    const messages = JSON.parse(fs.readFileSync(path.join(repo, `messages/${language}.json`), "utf8"));
    const labels = messages.Demo.form;
    check(`${language} Turnstile labels present`, ["verificationRequired","verificationFailed","verificationUnavailable"].every((key) => typeof labels[key] === "string" && labels[key].length>0));
  }
  console.log(`I03D SECURITY TURNSTILE OFFLINE PASS: ${passed} assertions; no real network / SMTP / OpenAI calls.`);
} finally {
  restore();
}
