import { handleChatRetrievalPayload } from "../src/lib/rag/server/chat-retrieval-contract.mjs";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function exactKeys(value, expected) {
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();

  return (
    actual.length === wanted.length &&
    actual.every((key, index) => key === wanted[index])
  );
}

async function expectValidationFailure(name, payload) {
  const response = await handleChatRetrievalPayload(payload);

  assert(
    response.status === 400,
    `${name}: expected status 400`
  );
  assert(
    response.body.ok === false &&
    response.body.error === "validation_failed",
    `${name}: expected validation_failed`
  );

  console.log(`PASS - ${name}`);
}

const esGrounded = await handleChatRetrievalPayload({
  message: "¿Qué es Gym Master?",
  pageLocale: "es"
});

assert(esGrounded.status === 200, "ES grounded status");
assert(esGrounded.body.ok === true, "ES grounded ok");
assert(esGrounded.body.queryLocale === "es", "ES grounded locale");
assert(esGrounded.body.grounded === true, "ES grounded flag");
assert(
  esGrounded.body.usedCrossLanguageFallback === false,
  "ES grounded fallback"
);
assert(
  esGrounded.body.commercialIntent === false,
  "ES grounded commercial intent"
);
assert(
  esGrounded.body.sources.length > 0,
  "ES grounded sources"
);
assert(
  exactKeys(esGrounded.body, [
    "ok",
    "answer",
    "queryLocale",
    "grounded",
    "usedCrossLanguageFallback",
    "commercialIntent",
    "sources"
  ]),
  "ES grounded public body keys"
);
assert(
  esGrounded.body.sources.every((source) =>
    exactKeys(source, [
      "documentId",
      "topic",
      "sourceSection"
    ])
  ),
  "Sources must expose metadata only"
);

const serializedGrounded =
  JSON.stringify(esGrounded.body);

for (const forbidden of [
  "contentHash",
  "chunkId",
  "\"content\"",
  "\"score\"",
  "\"profile\"",
  "\"path\""
]) {
  assert(
    !serializedGrounded.includes(forbidden),
    `Public response leaked forbidden field: ${forbidden}`
  );
}

console.log("PASS - grounded response exposes metadata only");

const enCommercial = await handleChatRetrievalPayload({
  message: "How much does Gym Master cost?",
  pageLocale: "es"
});

assert(
  enCommercial.status === 200 &&
  enCommercial.body.ok === true &&
  enCommercial.body.queryLocale === "en" &&
  enCommercial.body.grounded === true &&
  enCommercial.body.commercialIntent === true,
  "EN commercial request contract"
);
console.log("PASS - commercial intent stays server-side");

const unsupportedEs = await handleChatRetrievalPayload({
  message: "¿Cuál es la capital de Japón?",
  pageLocale: "es"
});

assert(
  unsupportedEs.status === 200 &&
  unsupportedEs.body.ok === true &&
  unsupportedEs.body.grounded === false &&
  unsupportedEs.body.sources.length === 0 &&
  unsupportedEs.body.answer.includes("No tengo información pública suficiente"),
  "Unsupported ES response"
);
console.log("PASS - unsupported ES is cautious and source-free");

const unsupportedEn = await handleChatRetrievalPayload({
  message: "What is the capital of Japan?",
  pageLocale: "en"
});

assert(
  unsupportedEn.status === 200 &&
  unsupportedEn.body.ok === true &&
  unsupportedEn.body.grounded === false &&
  unsupportedEn.body.sources.length === 0 &&
  unsupportedEn.body.answer.includes("do not have enough public"),
  "Unsupported EN response"
);
console.log("PASS - unsupported EN is cautious and source-free");

const excludedEs = await handleChatRetrievalPayload({
  message: "¿Qué puede hacer Masteradmin?",
  pageLocale: "es"
});

assert(
  excludedEs.status === 200 &&
  excludedEs.body.grounded === false &&
  excludedEs.body.sources.length === 0 &&
  excludedEs.body.answer.includes("no forma parte"),
  "Excluded ES response"
);
console.log("PASS - excluded public scope ES");

const excludedEn = await handleChatRetrievalPayload({
  message: "What can Master Admin do?",
  pageLocale: "en"
});

assert(
  excludedEn.status === 200 &&
  excludedEn.body.grounded === false &&
  excludedEn.body.sources.length === 0 &&
  excludedEn.body.answer.includes("not part of the public"),
  "Excluded EN response"
);
console.log("PASS - excluded public scope EN");

const repeat = await handleChatRetrievalPayload({
  message: "¿Qué es Gym Master?",
  pageLocale: "es"
});

assert(
  JSON.stringify(repeat.body) ===
    JSON.stringify(esGrounded.body),
  "Repeated contract response must be deterministic"
);
console.log("PASS - deterministic repeated response");

await expectValidationFailure(
  "null payload rejected",
  null
);

await expectValidationFailure(
  "array payload rejected",
  []
);

await expectValidationFailure(
  "empty message rejected",
  {
    message: "   ",
    pageLocale: "es"
  }
);

await expectValidationFailure(
  "oversize message rejected",
  {
    message: "x".repeat(601),
    pageLocale: "es"
  }
);

await expectValidationFailure(
  "invalid locale rejected",
  {
    message: "Gym Master",
    pageLocale: "fr"
  }
);

await expectValidationFailure(
  "browser topicHint rejected",
  {
    message: "¿Qué es Gym Master?",
    pageLocale: "es",
    topicHint: "demo-sales"
  }
);

await expectValidationFailure(
  "browser profileHint rejected",
  {
    message: "¿Qué es Gym Master?",
    pageLocale: "es",
    profileHint: "admin"
  }
);

await expectValidationFailure(
  "browser queryLocale rejected",
  {
    message: "¿Qué es Gym Master?",
    pageLocale: "es",
    queryLocale: "en"
  }
);

await expectValidationFailure(
  "browser commercialIntent=true rejected",
  {
    message: "Quiero una demo",
    pageLocale: "es",
    commercialIntent: true
  }
);

await expectValidationFailure(
  "browser commercialIntent=false rejected",
  {
    message: "Quiero una demo",
    pageLocale: "es",
    commercialIntent: false
  }
);
console.log("");
console.log("Chat retrieval API contract PASS");
console.log(
  "Public request keys: message, pageLocale"
);
console.log(
  "Public response keys: ok, answer, queryLocale, grounded, usedCrossLanguageFallback, commercialIntent, sources"
);
console.log(
  "Raw chunks/content/scores/paths/provider data: NOT EXPOSED"
);
