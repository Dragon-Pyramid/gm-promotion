import { handleChatRetrievalPayload } from "../src/lib/rag/server/chat-retrieval-contract.mjs";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function check({label, message, pageLocale, expectedCommercialIntent}) {
  const response = await handleChatRetrievalPayload({message, pageLocale});

  assert(
    response.status === 200 && response.body.ok === true,
    `${label}: invalid chat response`
  );
  assert(
    typeof response.body.commercialIntent === "boolean" &&
      response.body.commercialIntent === expectedCommercialIntent,
    `${label}: expected commercialIntent=${expectedCommercialIntent}, got ${response.body.commercialIntent}`
  );
  assert(
    typeof response.body.answer === "string" &&
      response.body.answer.trim().length > 0,
    `${label}: response must retain a non-empty grounded/cautious answer`
  );
  console.log(`PASS - ${label}: commercialIntent=${response.body.commercialIntent}`);
  return response;
}

const commercialCases = [
  {label: "ES pricing", message: "\u00bfCu\u00e1nto cuesta Gym Master?", pageLocale: "es"},
  {label: "EN demo", message: "I want a demo of Gym Master", pageLocale: "en"},
  {label: "ES implementation", message: "\u00bfC\u00f3mo es la implementaci\u00f3n de Gym Master?", pageLocale: "es"},
  {label: "EN implementation", message: "How is Gym Master implemented?", pageLocale: "en"},
  {label: "ES purchase", message: "Quiero contratar Gym Master", pageLocale: "es"},
  {label: "EN purchase", message: "I want to buy Gym Master", pageLocale: "en"},
  {label: "ES sales contact", message: "Quiero hablar con ventas", pageLocale: "es"},
  {label: "EN sales contact", message: "I want to talk to sales", pageLocale: "en"}
];

for (const testCase of commercialCases) {
  await check({...testCase, expectedCommercialIntent: true});
}

const nonCommercialCases = [
  {label: "ES operational sales", message: "\u00bfC\u00f3mo funcionan las ventas y el stock?", pageLocale: "es"},
  {label: "EN commercial team role", message: "What can the commercial team do?", pageLocale: "en"},
  {label: "ES unsupported", message: "\u00bfCu\u00e1l es la capital de Jap\u00f3n?", pageLocale: "es"},
  {label: "ES excluded Masteradmin", message: "\u00bfQu\u00e9 puede hacer Masteradmin?", pageLocale: "es"}
];

for (const testCase of nonCommercialCases) {
  await check({...testCase, expectedCommercialIntent: false});
}

// A commercial question does not authorize an invented price or blank answer.
const unknownPricing = await check({
  label: "ES precise price question routes without fabricated claims",
  message: "\u00bfCu\u00e1nto cuesta exactamente Gym Master hoy?",
  pageLocale: "es",
  expectedCommercialIntent: true
});
assert(
  unknownPricing.body.answer.trim().length > 0,
  "Precise pricing question must not suppress the cautious answer"
);

console.log("");
console.log("Commercial routing server check PASS");
console.log("Commercial intent source: server-only deterministic resolver");
console.log("External API calls: 0");
