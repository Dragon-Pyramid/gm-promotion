import fs from "node:fs";
import path from "node:path";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const repoRoot = process.cwd();

const assistantPath = path.join(
  repoRoot,
  "src",
  "components",
  "chat",
  "ChatAssistant.tsx"
);
const esPath = path.join(repoRoot, "messages", "es.json");
const enPath = path.join(repoRoot, "messages", "en.json");

const assistant = fs.readFileSync(assistantPath, "utf8");
const es = JSON.parse(fs.readFileSync(esPath, "utf8"));
const en = JSON.parse(fs.readFileSync(enPath, "utf8"));

assert(
  assistant.includes('fetch("/api/chat"'),
  "ChatAssistant must call /api/chat"
);

assert(
  assistant.includes('method: "POST"') &&
  assistant.includes('"Content-Type": "application/json"'),
  "ChatAssistant must POST JSON"
);

assert(
  /JSON\.stringify\(\{\s*message:\s*trimmed,\s*pageLocale\s*\}\)/s.test(
    assistant
  ),
  "Browser request must contain only message + pageLocale"
);

assert(
  assistant.includes("useLocale") &&
  assistant.includes(
    'const pageLocale = locale === "en" ? "en" : "es";'
  ),
  "ChatAssistant must resolve page locale deterministically"
);

assert(
  assistant.includes("AbortController") &&
  assistant.includes("activeRequestRef.current?.abort()"),
  "ChatAssistant must abort an active request on unmount"
);

assert(
  assistant.includes("!response.ok") &&
  assistant.includes("!isChatApiSuccess(payload)"),
  "ChatAssistant must reject HTTP or payload failures"
);

for (const forbidden of [
  "mockReply",
  "replyTimerRef",
  "setTimeout("
]) {
  assert(
    !assistant.includes(forbidden),
    `Mock chat artifact still present: ${forbidden}`
  );
}

assert(
  typeof es.Chat.errorReply === "string" &&
  es.Chat.errorReply.length > 0 &&
  typeof en.Chat.errorReply === "string" &&
  en.Chat.errorReply.length > 0,
  "Localized chat error replies are required"
);

assert(
  !Object.hasOwn(es.Chat, "mockReply") &&
  !Object.hasOwn(en.Chat, "mockReply"),
  "mockReply must be removed from both locales"
);

assert(
  es.Chat.previewNote.includes("información pública") &&
  en.Chat.previewNote.includes("public Gym Master information"),
  "Preview note must describe grounded public information"
);

console.log("PASS - ChatAssistant POSTs to /api/chat");
console.log("PASS - browser payload is message + pageLocale only");
console.log("PASS - mock timer/reply removed");
console.log("PASS - request lifecycle has abort cleanup");
console.log("PASS - HTTP/payload failures are guarded");
console.log("PASS - ES/EN live-chat copy updated");
console.log("");
console.log("Chat UI/API wiring check PASS");
