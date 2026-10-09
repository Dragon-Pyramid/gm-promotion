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

const probes = [
  {
    locale: "es",
    pageLocale: "es",
    profileHint: "general",
    topicHint: "product-overview",
    query: "¿Qué es Gym Master?"
  },
  {
    locale: "en",
    pageLocale: "en",
    profileHint: "general",
    topicHint: "product-overview",
    query: "What is Gym Master?"
  },
  {
    locale: "es",
    pageLocale: "es",
    profileHint: "admin",
    topicHint: "intelligence",
    query: "¿Qué puede ver un administrador para entender cómo funciona el gimnasio?"
  },
  {
    locale: "en",
    pageLocale: "en",
    profileHint: "admin",
    topicHint: "intelligence",
    query: "What can an administrator see to understand gym activity?"
  },
  {
    locale: "es",
    pageLocale: "es",
    profileHint: "team",
    topicHint: "operations",
    query: "¿Cómo se conecta el ingreso de un socio con pagos, ventas y stock?"
  },
  {
    locale: "en",
    pageLocale: "en",
    profileHint: "team",
    topicHint: "operations",
    query: "How are member check-in, payments, sales and stock connected?"
  },
  {
    locale: "es",
    pageLocale: "es",
    profileHint: "member",
    topicHint: "training-progress",
    query: "¿Cómo acompaña Gym Master el entrenamiento y el progreso del socio?"
  },
  {
    locale: "en",
    pageLocale: "en",
    profileHint: "member",
    topicHint: "training-progress",
    query: "How does Gym Master support member training and progress?"
  },
  {
    locale: "es",
    pageLocale: "es",
    profileHint: "member",
    topicHint: "relationship",
    query: "¿Cómo ayuda con el seguimiento, mensajes y próxima visita?"
  },
  {
    locale: "en",
    pageLocale: "en",
    profileHint: "member",
    topicHint: "relationship",
    query: "How does it help with follow-up, messages and the next visit?"
  },
  {
    locale: "es",
    pageLocale: "es",
    profileHint: "general",
    topicHint: "demo-sales",
    query: "¿Cuánto cuesta Gym Master?"
  },
  {
    locale: "en",
    pageLocale: "en",
    profileHint: "general",
    topicHint: "demo-sales",
    query: "How much does Gym Master cost?"
  },
  {
    locale: "es",
    pageLocale: "es",
    profileHint: "general",
    topicHint: "faq",
    query: "¿Gym Master usa IA para predecir qué socio va a abandonar?"
  },
  {
    locale: "en",
    pageLocale: "en",
    profileHint: "general",
    topicHint: "faq",
    query: "Does Gym Master use AI to predict which member will churn?"
  }
];

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

console.log("Retrieval probe baseline");
console.log(`Chunks: ${chunks.length}`);
console.log(`Probes: ${probes.length}`);

for (const [index, probe] of probes.entries()) {
  const response = retrieve({
    chunks,
    query: probe.query,
    queryLocale: probe.locale,
    pageLocale: probe.pageLocale,
    profileHint: probe.profileHint,
    topicHint: probe.topicHint,
    topK: 3
  });

  console.log("");
  console.log(
    `[${String(index + 1).padStart(2, "0")}] ${probe.locale.toUpperCase()} ${probe.query}`
  );
  console.log(
    `grounded=${response.groundedEnough} fallback=${response.usedCrossLanguageFallback}`
  );

  for (const result of response.results) {
    console.log(
      `  #${result.rank} ${result.chunk.topic}/${result.chunk.profile} ` +
      `score=${result.score.toFixed(3)} coverage=${result.signals.coverage.toFixed(3)} ` +
      `chunk=${result.chunk.chunkId}`
    );
  }
}

const unsupported = retrieve({
  chunks,
  query: "¿Cuál es la capital de Japón?",
  queryLocale: "es",
  pageLocale: "es",
  topK: 3
});

console.log("");
console.log("[UNSUPPORTED] ¿Cuál es la capital de Japón?");
console.log(
  `grounded=${unsupported.groundedEnough} fallback=${unsupported.usedCrossLanguageFallback} results=${unsupported.results.length}`
);

const spanishOnly = chunks.filter((chunk) => chunk.locale === "es");

const fallbackFixture = retrieve({
  chunks: spanishOnly,
  query: "Gym Master stock",
  queryLocale: "en",
  pageLocale: "es",
  topicHint: "modules",
  topK: 3
});

console.log("");
console.log("[CROSS-LANGUAGE FIXTURE] EN query over ES-only corpus");
console.log(
  `grounded=${fallbackFixture.groundedEnough} fallback=${fallbackFixture.usedCrossLanguageFallback}`
);

for (const result of fallbackFixture.results) {
  console.log(
    `  #${result.rank} locale=${result.chunk.locale} topic=${result.chunk.topic} ` +
    `sameLanguage=${result.sameLanguage} score=${result.score.toFixed(3)}`
  );
}
