import { readFile } from "node:fs/promises";
import path from "node:path";

import { buildDocumentChunks } from "../ingestion/build-chunks.mjs";
import { parseManifest } from "../ingestion/parse-manifest.mjs";
import {
  validateChunks,
  validateDocuments
} from "../ingestion/validate-ingestion.mjs";

const repoRoot = process.cwd();
const corpusRoot = path.join(
  repoRoot,
  "src",
  "content",
  "rag"
);
const manifestPath = path.join(
  corpusRoot,
  "manifest.ts"
);
const manifestDocumentPrefix = "src/content/rag/";

let corpusPromise = null;

function assertCuratedCorpusPath(documentPath) {
  if (
    typeof documentPath !== "string" ||
    !documentPath.startsWith(manifestDocumentPrefix)
  ) {
    throw new Error(
      `Manifest path outside curated RAG corpus: ${documentPath}`
    );
  }

  const relativeDocumentPath =
    documentPath.slice(manifestDocumentPrefix.length);

  if (
    !relativeDocumentPath ||
    relativeDocumentPath.includes("\\") ||
    path.isAbsolute(relativeDocumentPath)
  ) {
    throw new Error(
      `Manifest path outside curated RAG corpus: ${documentPath}`
    );
  }

  const absolutePath = path.join(
    corpusRoot,
    relativeDocumentPath
  );
  const relativeToCorpus = path.relative(
    corpusRoot,
    absolutePath
  );

  if (
    relativeToCorpus.startsWith("..") ||
    path.isAbsolute(relativeToCorpus)
  ) {
    throw new Error(
      `Manifest path outside curated RAG corpus: ${documentPath}`
    );
  }

  return absolutePath;
}

async function buildRuntimeCorpus() {
  const manifestSource = await readFile(manifestPath, "utf8");
  const documents = parseManifest(manifestSource);

  validateDocuments(documents);

  const chunks = [];

  for (const document of documents) {
    const markdown = await readFile(
      assertCuratedCorpusPath(document.path),
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

  return Object.freeze(
    chunks.map((chunk) => Object.freeze({...chunk}))
  );
}

export async function loadPublicRagCorpus() {
  if (corpusPromise === null) {
    corpusPromise = buildRuntimeCorpus().catch((error) => {
      corpusPromise = null;
      throw error;
    });
  }

  return corpusPromise;
}
