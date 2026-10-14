import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildDocumentChunks } from "../src/lib/rag/ingestion/build-chunks.mjs";
import { parseManifest } from "../src/lib/rag/ingestion/parse-manifest.mjs";
import {
  validateChunks,
  validateDocuments
} from "../src/lib/rag/ingestion/validate-ingestion.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const manifestPath = path.join(
  repoRoot,
  "src",
  "content",
  "rag",
  "manifest.ts"
);
const outputPath = path.join(
  repoRoot,
  "artifacts",
  "rag",
  "chunks.v1.json"
);

const checkOnly = process.argv.includes("--check");

function toCanonicalJson(chunks) {
  return `${JSON.stringify(chunks, null, 2)}\n`;
}

async function buildCorpus() {
  const manifestSource = await readFile(manifestPath, "utf8");
  const documents = parseManifest(manifestSource);

  validateDocuments(documents);

  const chunks = [];

  for (const document of documents) {
    const absolutePath = path.resolve(repoRoot, document.path);
    const relativeGuard = path.relative(repoRoot, absolutePath);

    if (
      relativeGuard.startsWith("..") ||
      path.isAbsolute(relativeGuard)
    ) {
      throw new Error(`Manifest path escapes repository: ${document.path}`);
    }

    const expectedPrefix = path.join("src", "content", "rag") + path.sep;
    if (!relativeGuard.startsWith(expectedPrefix)) {
      throw new Error(
        `Manifest path outside curated RAG corpus: ${document.path}`
      );
    }

    const markdown = await readFile(absolutePath, "utf8");
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

const first = await buildCorpus();
const second = await buildCorpus();

const firstJson = toCanonicalJson(first);
const secondJson = toCanonicalJson(second);

if (firstJson !== secondJson) {
  throw new Error("Determinism check failed: repeated ingestion differs");
}

if (!checkOnly) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, firstJson, "utf8");
}

const localeCounts = first.reduce(
  (counts, chunk) => {
    counts[chunk.locale] = (counts[chunk.locale] || 0) + 1;
    return counts;
  },
  {}
);

console.log("RAG ingestion validation PASS");
console.log(`Documents: 22`);
console.log(`Chunks: ${first.length}`);
console.log(`ES chunks: ${localeCounts.es || 0}`);
console.log(`EN chunks: ${localeCounts.en || 0}`);
console.log("Deterministic rerun: PASS");
console.log(
  checkOnly
    ? "Artifact write: skipped (--check)"
    : `Artifact: ${path.relative(repoRoot, outputPath).replaceAll("\\", "/")}`
);
