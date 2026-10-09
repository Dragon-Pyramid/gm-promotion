import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildDocumentChunks } from "../../src/lib/rag/ingestion/build-chunks.mjs";
import { parseManifest } from "../../src/lib/rag/ingestion/parse-manifest.mjs";
import {
  validateChunks,
  validateDocuments
} from "../../src/lib/rag/ingestion/validate-ingestion.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..", "..");
const manifestPath = path.join(
  repoRoot,
  "src",
  "content",
  "rag",
  "manifest.ts"
);

async function loadBaseline() {
  const manifestSource = await readFile(manifestPath, "utf8");
  const documents = parseManifest(manifestSource);
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

  return { documents, chunks };
}

async function expectThrow(name, fn, expectedMessagePart) {
  try {
    await fn();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (
      expectedMessagePart &&
      !message.includes(expectedMessagePart)
    ) {
      throw new Error(
        `${name}: threw unexpected message: ${message}`
      );
    }

    console.log(`PASS - ${name}: ${message}`);
    return;
  }

  throw new Error(`${name}: expected failure but operation succeeded`);
}

const { documents, chunks } = await loadBaseline();

console.log("Baseline validation PASS");
console.log(`Documents: ${documents.length}`);
console.log(`Chunks: ${chunks.length}`);

await expectThrow(
  "duplicate manifest ids",
  () => {
    const duplicateDocuments = documents.map((document, index) =>
      index === 1
        ? {
            ...document,
            id: documents[0].id
          }
        : { ...document }
    );

    validateDocuments(duplicateDocuments);
  },
  "Duplicate document id"
);

await expectThrow(
  "frontmatter mismatch",
  async () => {
    const document = {
      ...documents[0],
      topic: "intentionally-wrong-topic"
    };

    const markdown = await readFile(
      path.resolve(repoRoot, documents[0].path),
      "utf8"
    );

    buildDocumentChunks(document, markdown);
  },
  "Manifest/frontmatter mismatch"
);

await expectThrow(
  "non-public document",
  async () => {
    const document = {
      ...documents[0],
      visibility: "private"
    };

    const markdown = await readFile(
      path.resolve(repoRoot, documents[0].path),
      "utf8"
    );

    buildDocumentChunks(document, markdown);
  },
  "Non-public document rejected"
);

await expectThrow(
  "non-current document",
  async () => {
    const document = {
      ...documents[0],
      status: "draft"
    };

    const markdown = await readFile(
      path.resolve(repoRoot, documents[0].path),
      "utf8"
    );

    buildDocumentChunks(document, markdown);
  },
  "Non-current document rejected"
);

await expectThrow(
  "hash mismatch",
  () => {
    const corrupted = chunks.map((chunk, index) =>
      index === 0
        ? {
            ...chunk,
            contentHash:
              "0".repeat(64)
          }
        : { ...chunk }
    );

    validateChunks(corrupted);
  },
  "SHA-256 content hash mismatch"
);

await expectThrow(
  "duplicate chunk id",
  () => {
    const corrupted = chunks.map((chunk) => ({ ...chunk }));
    corrupted[1].chunkId = corrupted[0].chunkId;

    validateChunks(corrupted);
  },
  "Duplicate chunk id"
);

await expectThrow(
  "chunk id/content identity mismatch",
  () => {
    const corrupted = chunks.map((chunk, index) =>
      index === 0
        ? {
            ...chunk,
            chunkId:
              `${chunk.documentId}::${String(chunk.sectionIndex).padStart(3, "0")}::deadbeefdead`
          }
        : { ...chunk }
    );

    validateChunks(corrupted);
  },
  "Chunk id does not match content identity"
);

console.log("All fail-closed ingestion tests PASS");
