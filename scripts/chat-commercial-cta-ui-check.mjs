import fs from "node:fs";
import path from "node:path";

function assert(value, label) {
  if (!value) throw new Error(label);
}

const root = process.cwd();
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");
const assistant = read("src/components/chat/ChatAssistant.tsx");
const panel = read("src/components/chat/ChatPanel.tsx");
const es = JSON.parse(read("messages/es.json"));
const en = JSON.parse(read("messages/en.json"));

assert(
  assistant.includes("commercialIntent: boolean;") &&
  assistant.includes("commercialIntent?: unknown;") &&
  assistant.includes('typeof candidate.commercialIntent === "boolean"'),
  "A successful response must validate the server boolean"
);
assert(
  assistant.includes("setCommercialIntent(payload.commercialIntent)") &&
  assistant.includes("commercialIntent={commercialIntent}"),
  "The server signal must be passed to the chat panel"
);
assert(
  (assistant.match(/setCommercialIntent\(false\)/g) || []).length === 2,
  "The intent must reset for a new query and on request failure"
);
assert(
  /JSON\.stringify\(\{\s*message:\s*trimmed,\s*pageLocale\s*\}\)/s.test(assistant),
  "Browser must only send message and pageLocale"
);
assert(
  panel.includes("commercialIntent: boolean;") &&
  panel.includes('commercialIntent ? t("cta.salesRequest") : t("cta.requestDemo")') &&
  panel.includes('commercialIntent ? t("cta.contactForm") : t("cta.goToForm")'),
  "CTA must use server-derived commercial intent in both page contexts"
);
assert(
  panel.includes('href="/demo"') &&
  panel.includes("onClick={onDemoAction}") &&
  panel.includes("onClick={onClose}"),
  "Landing and demo navigation and focus behavior must be preserved"
);
for (const [locale, messages] of [["es", es], ["en", en]]) {
  for (const key of ["requestDemo", "goToForm", "salesRequest", "contactForm"]) {
    assert(
      typeof messages.Chat?.cta?.[key] === "string" &&
      messages.Chat.cta[key].trim().length > 0,
      `${locale} missing CTA label ${key}`
    );
  }
}
console.log("PASS - server boolean required and delivered to CTA");
console.log("PASS - missing/invalid responses fail closed and reset commercial state");
console.log("PASS - browser never sends commercial intent");
console.log("PASS - landing /demo link and demo scroll action preserved");
console.log("PASS - localized generic/commercial labels ES/EN");
console.log("Chat commercial CTA check PASS");
