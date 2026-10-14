import { retrievePublicContext } from "../src/lib/rag/server/retrieve-public-context.mjs";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const baselineCases = [
  ["ES product overview", "¿Qué es Gym Master?", "es", "es", ["product-overview"]],
  ["EN product overview", "What is Gym Master?", "en", "en", ["product-overview"]],
  ["ES admin intelligence", "¿Qué puede ver un administrador para entender cómo funciona el gimnasio?", "es", "es", ["intelligence"]],
  ["EN admin intelligence", "What can an administrator see to understand gym activity?", "en", "en", ["intelligence"]],
  ["ES connected operations", "¿Cómo se conecta el ingreso de un socio con pagos, ventas y stock?", "es", "es", ["operations"]],
  ["EN connected operations", "How are member check-in, payments, sales and stock connected?", "en", "en", ["operations"]],
  ["ES member training", "¿Cómo acompaña Gym Master el entrenamiento y el progreso del socio?", "es", "es", ["training-progress"]],
  ["EN member training", "How does Gym Master support member training and progress?", "en", "en", ["training-progress"]],
  ["ES relationship", "¿Cómo ayuda con el seguimiento, mensajes y próxima visita?", "es", "es", ["relationship"]],
  ["EN relationship", "How does it help with follow-up, messages and the next visit?", "en", "en", ["relationship"]],
  ["ES commercial unknown", "¿Cuánto cuesta Gym Master?", "es", "es", ["demo-sales"]],
  ["EN commercial unknown", "How much does Gym Master cost?", "en", "en", ["demo-sales"]],
  ["ES controlled AI claim", "¿Gym Master usa IA para predecir qué socio va a abandonar?", "es", "es", ["faq"]],
  ["EN controlled AI claim", "Does Gym Master use AI to predict which member will churn?", "en", "en", ["faq"]]
].map(([name, query, pageLocale, expectedLocale, supportTopics]) => ({
  name,
  query,
  pageLocale,
  expectedLocale,
  supportTopics
}));

const holdoutCases = [
  ["ES modules", "¿Qué módulos y funcionalidades incluye la plataforma?", "es", "es", ["modules"]],
  ["EN modules", "What modules and features are included in the platform?", "en", "en", ["modules"]],
  ["ES commercial team", "¿Qué puede hacer el equipo comercial con caja y kiosco?", "es", "es", ["team-commercial", "operations"]],
  ["EN commercial team", "What can the commercial team do with the kiosk and sales operation?", "en", "en", ["team-commercial", "operations"]],
  ["ES member role", "¿Qué puede consultar un socio desde su experiencia?", "es", "es", ["member"]],
  ["EN member role", "What can a member see in the member experience?", "en", "en", ["member"]],
  ["ES admin reporting", "¿Hay reportes e indicadores para administración?", "es", "es", ["modules", "administrator", "intelligence"]],
  ["EN admin reporting", "Are there reports and indicators for administrators?", "en", "en", ["modules", "administrator", "intelligence"]],
  ["ES demo intent", "Quiero una demostración para mi gimnasio", "es", "es", ["demo-sales"]],
  ["EN demo intent", "I want a demo for my gym", "en", "en", ["demo-sales"]],
  ["ES relationship notifications", "¿Puedo enviar mensajes y notificaciones a los socios?", "es", "es", ["relationship", "modules"]],
  ["EN relationship notifications", "Can I send messages and notifications to members?", "en", "en", ["relationship", "modules"]]
].map(([name, query, pageLocale, expectedLocale, supportTopics]) => ({
  name,
  query,
  pageLocale,
  expectedLocale,
  supportTopics
}));

async function evaluate(label, cases) {
  let grounded = 0;
  let localePass = 0;
  let supportTop1 = 0;
  let supportTop3 = 0;
  let unexpectedFallback = 0;

  console.log(`=== ${label} ===`);

  for (const testCase of cases) {
    const result = await retrievePublicContext({
      query: testCase.query,
      pageLocale: testCase.pageLocale,
      topK: 3
    });

    const topics = result.results.map(
      (entry) => entry.chunk.topic
    );

    const top1 =
      topics.length > 0 &&
      testCase.supportTopics.includes(topics[0]);

    const top3 =
      topics.some((topic) =>
        testCase.supportTopics.includes(topic)
      );

    if (result.groundedEnough) grounded += 1;
    if (result.queryLocale === testCase.expectedLocale) {
      localePass += 1;
    }
    if (top1) supportTop1 += 1;
    if (top3) supportTop3 += 1;
    if (result.usedCrossLanguageFallback) {
      unexpectedFallback += 1;
    }

    console.log(
      `${top3 ? "PASS" : "MISS"} - ${testCase.name}: ` +
      `locale=${result.queryLocale} ` +
      `hint=${result.hints.topicHint ?? "-"} ` +
      `status=${result.retrievalStatus} ` +
      `supports=[${testCase.supportTopics.join(", ")}] ` +
      `top3=[${topics.join(", ")}]`
    );
  }

  console.log("");
  console.log(`${label} grounded: ${grounded}/${cases.length}`);
  console.log(`${label} locale: ${localePass}/${cases.length}`);
  console.log(`${label} fallback: ${unexpectedFallback}/${cases.length}`);
  console.log(`${label} support Top1: ${supportTop1}/${cases.length}`);
  console.log(`${label} support Top3: ${supportTop3}/${cases.length}`);
  console.log("");

  return {
    grounded,
    localePass,
    supportTop1,
    supportTop3,
    unexpectedFallback
  };
}

const baseline = await evaluate("BASELINE", baselineCases);
const holdout = await evaluate("HOLDOUT", holdoutCases);

const unsupportedEs = await retrievePublicContext({
  query: "¿Cuál es la capital de Japón?",
  pageLocale: "es"
});

const unsupportedEn = await retrievePublicContext({
  query: "What is the capital of Japan?",
  pageLocale: "en"
});

const brandOverlapEs = await retrievePublicContext({
  query: "¿Gym Master fabrica automóviles eléctricos?",
  pageLocale: "es"
});

const brandOverlapEn = await retrievePublicContext({
  query: "Does Gym Master manufacture electric cars?",
  pageLocale: "en"
});

for (const [name, result] of [
  ["unsupported ES", unsupportedEs],
  ["unsupported EN", unsupportedEn],
  ["brand overlap ES", brandOverlapEs],
  ["brand overlap EN", brandOverlapEn]
]) {
  assert(
    result.groundedEnough === false &&
    result.results.length === 0 &&
    result.retrievalStatus === "unsupported",
    `${name} should be unsupported`
  );
  console.log(`PASS - ${name}`);
}

const excludedEs = await retrievePublicContext({
  query: "¿Qué puede hacer Masteradmin?",
  pageLocale: "es"
});

const excludedEn = await retrievePublicContext({
  query: "What can Master Admin do?",
  pageLocale: "en"
});

for (const [name, result] of [
  ["Masteradmin ES", excludedEs],
  ["Masteradmin EN", excludedEn]
]) {
  assert(
    result.groundedEnough === false &&
    result.results.length === 0 &&
    result.retrievalStatus === "excluded_scope",
    `${name} should be excluded from public scope`
  );
  console.log(`PASS - ${name} excluded`);
}

const englishOnSpanishPage = await retrievePublicContext({
  query: "How much does Gym Master cost?",
  pageLocale: "es"
});

assert(
  englishOnSpanishPage.queryLocale === "en",
  "English query should override Spanish page locale"
);
console.log("PASS - EN query overrides ES page locale");

const spanishOnEnglishPage = await retrievePublicContext({
  query: "¿Cuánto cuesta Gym Master?",
  pageLocale: "en"
});

assert(
  spanishOnEnglishPage.queryLocale === "es",
  "Spanish query should override English page locale"
);
console.log("PASS - ES query overrides EN page locale");

const ambiguousEs = await retrievePublicContext({
  query: "Gym Master stock",
  pageLocale: "es"
});

const ambiguousEn = await retrievePublicContext({
  query: "Gym Master stock",
  pageLocale: "en"
});

assert(
  ambiguousEs.queryLocale === "es" &&
  ambiguousEn.queryLocale === "en",
  "Ambiguous query should fall back to page locale"
);
console.log("PASS - ambiguous query falls back to page locale");

let oversizeRejected = false;

try {
  await retrievePublicContext({
    query: "x".repeat(601),
    pageLocale: "es"
  });
} catch (error) {
  oversizeRejected =
    error instanceof Error &&
    error.message.includes("exceeds 600");
}

assert(
  oversizeRejected,
  "Oversize query must be rejected"
);
console.log("PASS - oversize query rejected");

const accepted =
  baseline.grounded === baselineCases.length &&
  baseline.localePass === baselineCases.length &&
  baseline.unexpectedFallback === 0 &&
  baseline.supportTop3 === baselineCases.length &&
  holdout.grounded === holdoutCases.length &&
  holdout.localePass === holdoutCases.length &&
  holdout.unexpectedFallback === 0 &&
  holdout.supportTop3 === holdoutCases.length;

assert(
  accepted,
  "Retrieval service evaluation did not satisfy acceptance criteria"
);

console.log("");
console.log("Retrieval service boundary PASS");
console.log(
  `Baseline Top1/Top3: ${baseline.supportTop1}/${baselineCases.length} / ` +
  `${baseline.supportTop3}/${baselineCases.length}`
);
console.log(
  `Holdout Top1/Top3: ${holdout.supportTop1}/${holdoutCases.length} / ` +
  `${holdout.supportTop3}/${holdoutCases.length}`
);
