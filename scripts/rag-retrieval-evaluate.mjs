import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildDocumentChunks } from "../src/lib/rag/ingestion/build-chunks.mjs";
import { parseManifest } from "../src/lib/rag/ingestion/parse-manifest.mjs";
import {
  validateChunks,
  validateDocuments
} from "../src/lib/rag/ingestion/validate-ingestion.mjs";
import { retrieve } from "../src/lib/rag/retrieval/retrieve.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const manifestPath = path.join(
  repoRoot,
  "src",
  "content",
  "rag",
  "manifest.ts"
);

const cases = [
  {
    name: "ES product overview",
    query: "¿Qué es Gym Master?",
    queryLocale: "es",
    pageLocale: "es",
    profileHint: "general",
    topicHint: "product-overview",
    expectedTopic: "product-overview"
  },
  {
    name: "EN product overview",
    query: "What is Gym Master?",
    queryLocale: "en",
    pageLocale: "en",
    profileHint: "general",
    topicHint: "product-overview",
    expectedTopic: "product-overview"
  },
  {
    name: "ES admin intelligence",
    query: "¿Qué puede ver un administrador para entender cómo funciona el gimnasio?",
    queryLocale: "es",
    pageLocale: "es",
    profileHint: "admin",
    topicHint: "intelligence",
    expectedTopic: "intelligence"
  },
  {
    name: "EN admin intelligence",
    query: "What can an administrator see to understand gym activity?",
    queryLocale: "en",
    pageLocale: "en",
    profileHint: "admin",
    topicHint: "intelligence",
    expectedTopic: "intelligence"
  },
  {
    name: "ES connected operations",
    query: "¿Cómo se conecta el ingreso de un socio con pagos, ventas y stock?",
    queryLocale: "es",
    pageLocale: "es",
    profileHint: "team",
    topicHint: "operations",
    expectedTopic: "operations"
  },
  {
    name: "EN connected operations",
    query: "How are member check-in, payments, sales and stock connected?",
    queryLocale: "en",
    pageLocale: "en",
    profileHint: "team",
    topicHint: "operations",
    expectedTopic: "operations"
  },
  {
    name: "ES member training",
    query: "¿Cómo acompaña Gym Master el entrenamiento y el progreso del socio?",
    queryLocale: "es",
    pageLocale: "es",
    profileHint: "member",
    topicHint: "training-progress",
    expectedTopic: "training-progress"
  },
  {
    name: "EN member training",
    query: "How does Gym Master support member training and progress?",
    queryLocale: "en",
    pageLocale: "en",
    profileHint: "member",
    topicHint: "training-progress",
    expectedTopic: "training-progress"
  },
  {
    name: "ES relationship",
    query: "¿Cómo ayuda con el seguimiento, mensajes y próxima visita?",
    queryLocale: "es",
    pageLocale: "es",
    profileHint: "member",
    topicHint: "relationship",
    expectedTopic: "relationship"
  },
  {
    name: "EN relationship",
    query: "How does it help with follow-up, messages and the next visit?",
    queryLocale: "en",
    pageLocale: "en",
    profileHint: "member",
    topicHint: "relationship",
    expectedTopic: "relationship"
  },
  {
    name: "ES commercial unknown",
    query: "¿Cuánto cuesta Gym Master?",
    queryLocale: "es",
    pageLocale: "es",
    profileHint: "general",
    topicHint: "demo-sales",
    expectedTopic: "demo-sales"
  },
  {
    name: "EN commercial unknown",
    query: "How much does Gym Master cost?",
    queryLocale: "en",
    pageLocale: "en",
    profileHint: "general",
    topicHint: "demo-sales",
    expectedTopic: "demo-sales"
  },
  {
    name: "ES controlled AI claim",
    query: "¿Gym Master usa IA para predecir qué socio va a abandonar?",
    queryLocale: "es",
    pageLocale: "es",
    profileHint: "general",
    topicHint: "faq",
    expectedTopic: "faq"
  },
  {
    name: "EN controlled AI claim",
    query: "Does Gym Master use AI to predict which member will churn?",
    queryLocale: "en",
    pageLocale: "en",
    profileHint: "general",
    topicHint: "faq",
    expectedTopic: "faq"
  }
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function buildCorpus() {
  const source = await readFile(manifestPath, "utf8");
  const documents = parseManifest(source);

  validateDocuments(documents);

  const chunks = [];

  for (const document of documents) {
    const markdown = await readFile(
      path.resolve(repoRoot, document.path),
      "utf8"
    );

    chunks.push(...buildDocumentChunks(document, markdown));
  }

  chunks.sort((a, b) =>
    a.locale.localeCompare(b.locale) ||
    a.documentId.localeCompare(b.documentId) ||
    a.sectionIndex - b.sectionIndex
  );

  validateChunks(chunks);

  return chunks;
}

const chunks = await buildCorpus();

let top1Expected = 0;
let top3Expected = 0;

for (const testCase of cases) {
  const response = retrieve({
    chunks,
    query: testCase.query,
    queryLocale: testCase.queryLocale,
    pageLocale: testCase.pageLocale,
    profileHint: testCase.profileHint,
    topicHint: testCase.topicHint,
    topK: 3
  });

  assert(
    response.groundedEnough,
    `${testCase.name}: expected groundedEnough=true`
  );

  assert(
    response.usedCrossLanguageFallback === false,
    `${testCase.name}: unexpected cross-language fallback`
  );

  assert(
    response.results.every(
      (result) =>
        result.sameLanguage &&
        result.chunk.locale === testCase.queryLocale
    ),
    `${testCase.name}: same-language-first contract violated`
  );

  const topics = response.results.map((result) => result.chunk.topic);
  const top1Hit = topics[0] === testCase.expectedTopic;
  const top3Hit = topics.includes(testCase.expectedTopic);

  if (top1Hit) {
    top1Expected += 1;
  }

  if (top3Hit) {
    top3Expected += 1;
  }

  console.log(
    `${top3Hit ? "PASS" : "FAIL"} - ${testCase.name}: ` +
    `expected=${testCase.expectedTopic} top3=[${topics.join(", ")}]`
  );

  assert(
    top3Hit,
    `${testCase.name}: expected topic missing from top 3`
  );
}

const unsupported = retrieve({
  chunks,
  query: "¿Cuál es la capital de Japón?",
  queryLocale: "es",
  pageLocale: "es",
  topK: 3
});

assert(
  unsupported.groundedEnough === false &&
  unsupported.results.length === 0,
  "Unsupported query should return groundedEnough=false with no results"
);

console.log("PASS - unsupported query returns groundedEnough=false");
const brandOverlapUnsupportedEs = retrieve({
  chunks,
  query: "¿Gym Master fabrica automóviles eléctricos?",
  queryLocale: "es",
  pageLocale: "es",
  topK: 3
});

assert(
  brandOverlapUnsupportedEs.groundedEnough === false &&
  brandOverlapUnsupportedEs.results.length === 0,
  "ES brand-overlap unsupported query should not be grounded"
);

console.log("PASS - ES brand-overlap unsupported query is rejected");

const brandOverlapUnsupportedEn = retrieve({
  chunks,
  query: "Does Gym Master manufacture electric cars?",
  queryLocale: "en",
  pageLocale: "en",
  topK: 3
});

assert(
  brandOverlapUnsupportedEn.groundedEnough === false &&
  brandOverlapUnsupportedEn.results.length === 0,
  "EN brand-overlap unsupported query should not be grounded"
);

console.log("PASS - EN brand-overlap unsupported query is rejected");

const localeOverride = retrieve({
  chunks,
  query: "How much does Gym Master cost?",
  queryLocale: "en",
  pageLocale: "es",
  profileHint: "general",
  topicHint: "demo-sales",
  topK: 3
});

assert(
  localeOverride.results.length > 0 &&
  localeOverride.results.every(
    (result) => result.chunk.locale === "en"
  ) &&
  localeOverride.queryLocale === "en",
  "queryLocale must override pageLocale"
);

console.log("PASS - queryLocale overrides pageLocale");

const spanishOnly = chunks.filter(
  (chunk) => chunk.locale === "es"
);

const fallback = retrieve({
  chunks: spanishOnly,
  query: "Gym Master stock",
  queryLocale: "en",
  pageLocale: "en",
  topicHint: "modules",
  topK: 3
});

assert(
  fallback.groundedEnough &&
  fallback.usedCrossLanguageFallback &&
  fallback.results.length > 0 &&
  fallback.results.every(
    (result) =>
      result.chunk.locale === "es" &&
      result.sameLanguage === false
  ),
  "Cross-language fallback fixture failed"
);

console.log("PASS - explicit cross-language fallback");

const first = JSON.stringify(
  retrieve({
    chunks,
    query: cases[4].query,
    queryLocale: cases[4].queryLocale,
    pageLocale: cases[4].pageLocale,
    profileHint: cases[4].profileHint,
    topicHint: cases[4].topicHint,
    topK: 5
  })
);

const second = JSON.stringify(
  retrieve({
    chunks,
    query: cases[4].query,
    queryLocale: cases[4].queryLocale,
    pageLocale: cases[4].pageLocale,
    profileHint: cases[4].profileHint,
    topicHint: cases[4].topicHint,
    topK: 5
  })
);

assert(first === second, "Retrieval ordering is not deterministic");
console.log("PASS - deterministic repeated retrieval");
const privateFixture = chunks.map((chunk, index) =>
  index === 0
    ? { ...chunk, visibility: "private" }
    : chunk
);

let privateRejected = false;

try {
  retrieve({
    chunks: privateFixture,
    query: "What is Gym Master?",
    queryLocale: "en",
    pageLocale: "en",
    topK: 3
  });
} catch (error) {
  privateRejected =
    error instanceof Error &&
    error.message.includes("Non-public chunk rejected");
}

assert(privateRejected, "Retrieval must fail closed on a non-public chunk");
console.log("PASS - retrieval fails closed on non-public chunk");

const staleFixture = chunks.map((chunk, index) =>
  index === 0
    ? { ...chunk, status: "stale" }
    : chunk
);

let staleRejected = false;

try {
  retrieve({
    chunks: staleFixture,
    query: "What is Gym Master?",
    queryLocale: "en",
    pageLocale: "en",
    topK: 3
  });
} catch (error) {
  staleRejected =
    error instanceof Error &&
    error.message.includes("Non-current chunk rejected");
}

assert(staleRejected, "Retrieval must fail closed on a non-current chunk");
console.log("PASS - retrieval fails closed on non-current chunk");

console.log("");
console.log("Retrieval evaluation PASS");
console.log(`Cases: ${cases.length}`);
console.log(`Top1 expected-topic hits: ${top1Expected}/${cases.length}`);
console.log(`Top3 expected-topic hits: ${top3Expected}/${cases.length}`);
