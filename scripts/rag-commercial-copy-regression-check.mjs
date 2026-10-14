import assert from "node:assert/strict";
import {loadPublicRagCorpus} from "../src/lib/rag/server/load-corpus.mjs";
import {retrievePublicContext} from "../src/lib/rag/server/retrieve-public-context.mjs";
import {handleChatRetrievalPayload} from "../src/lib/rag/server/chat-retrieval-contract.mjs";

const chunks = await loadPublicRagCorpus();
assert.equal(chunks.length, 94, "Curated corpus chunk count changed unexpectedly");
assert.equal(chunks.filter((chunk) => chunk.locale === "es").length, 47);
assert.equal(chunks.filter((chunk) => chunk.locale === "en").length, 47);
assert(chunks.every((chunk) => chunk.visibility === "public" && chunk.status === "current"));

for (const {label, message, pageLocale, phrase} of [
  {label: "ES purchase", message: "Quiero contratar Gym Master", pageLocale: "es", phrase: "contratar gym master"},
  {label: "EN purchase", message: "I want to buy Gym Master", pageLocale: "en", phrase: "buy gym master"}
]) {
  const retrieval = await retrievePublicContext({query: message, pageLocale, topK: 3});
  assert.equal(retrieval.groundedEnough, true, `${label}: must retrieve supported public context`);
  assert.equal(retrieval.queryLocale, pageLocale, `${label}: incorrect answer locale`);
  assert.equal(retrieval.usedCrossLanguageFallback, false, `${label}: unexpected language fallback`);
  const sales = retrieval.results.find((item) => item.chunk.topic === "demo-sales");
  assert(sales, `${label}: public demo-sales must support purchase inquiry`);
  assert.equal(sales.chunk.locale, pageLocale, `${label}: sale evidence must be same-language`);
  assert(sales.chunk.content.toLowerCase().includes(phrase), `${label}: missing curated sales clarification`);
  const response = await handleChatRetrievalPayload({message, pageLocale});
  assert.equal(response.status, 200);
  assert.equal(response.body?.grounded, true);
  assert.equal(response.body?.commercialIntent, true, `${label}: server sales routing changed`);
  assert.equal(response.body?.queryLocale, pageLocale);
  assert(response.body?.sources?.some((source) => source.topic === "demo-sales"));
  console.log(`PASS ${label}: same-language public grounding and server commercial CTA`);
}

for (const {label, message, pageLocale, intent, grounded} of [
  {label: "ES price", message: "\u00bfCu\u00e1nto cuesta Gym Master?", pageLocale: "es", intent: true, grounded: true},
  {label: "EN price", message: "How much does Gym Master cost?", pageLocale: "en", intent: true, grounded: true},
  {label: "ES operational stock", message: "\u00bfC\u00f3mo funcionan las ventas y el stock?", pageLocale: "es", intent: false, grounded: true},
  {label: "EN commercial team role", message: "What can the commercial team do?", pageLocale: "en", intent: false, grounded: true},
  {label: "ES unrelated", message: "\u00bfCu\u00e1l es la capital de Jap\u00f3n?", pageLocale: "es", intent: false, grounded: false},
  {label: "EN unrelated", message: "What is the capital of Japan?", pageLocale: "en", intent: false, grounded: false},
  {label: "ES Masteradmin excluded", message: "\u00bfQu\u00e9 puede hacer Masteradmin?", pageLocale: "es", intent: false, grounded: false},
  {label: "EN Masteradmin excluded", message: "What can Master Admin do?", pageLocale: "en", intent: false, grounded: false}
]) {
  const response = await handleChatRetrievalPayload({message, pageLocale});
  assert.equal(response.status, 200, `${label}: invalid response`);
  assert.equal(response.body?.commercialIntent, intent, `${label}: commercial routing changed`);
  assert.equal(response.body?.grounded, grounded, `${label}: grounded state changed`);
  assert.equal(response.body?.queryLocale, pageLocale, `${label}: locale changed`);
  if (!grounded) assert.equal(response.body?.sources?.length, 0, `${label}: unsupported source leak`);
  console.log(`PASS ${label}: intent=${intent} grounded=${grounded}`);
}
for (const {label, message, pageLocale, queryLocale} of [
  {label: "EN on ES page", message: "I want to buy Gym Master", pageLocale: "es", queryLocale: "en"},
  {label: "ES on EN page", message: "Quiero contratar Gym Master", pageLocale: "en", queryLocale: "es"}
]) {
  const response = await handleChatRetrievalPayload({message, pageLocale});
  assert.equal(response.body?.grounded, true, `${label}: unsupported`);
  assert.equal(response.body?.commercialIntent, true);
  assert.equal(response.body?.queryLocale, queryLocale, `${label}: query language not respected`);
  assert.equal(response.body?.usedCrossLanguageFallback, false);
  console.log(`PASS ${label}: query locale overrides page locale`);
}
console.log("F-08C commercial public-corpus regression PASS");
console.log("External API calls: 0. Generated-answer semantics: not evaluated here.");
