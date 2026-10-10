import { hashContent } from "./hash-content.mjs";
import { INGESTION_VERSION } from "./build-chunks.mjs";

const SHA256_HEX = /^[a-f0-9]{64}$/;
const EXPECTED_BASELINE_DOCUMENTS = 22;
const EXPECTED_BASELINE_CHUNKS = 94;
const ALLOWED_LOCALES = new Set(["es", "en"]);
const ALLOWED_PROFILES = new Set(["general", "admin", "team", "member"]);

export function validateDocuments(documents) {
  if (documents.length !== EXPECTED_BASELINE_DOCUMENTS) {
    throw new Error(
      `Expected ${EXPECTED_BASELINE_DOCUMENTS} manifest documents, found ${documents.length}`
    );
  }

  const ids = new Set();

  for (const document of documents) {
    if (ids.has(document.id)) {
      throw new Error(`Duplicate document id: ${document.id}`);
    }

    ids.add(document.id);

    if (!ALLOWED_LOCALES.has(document.locale)) {
      throw new Error(
        `Unsupported locale for ${document.id}: ${document.locale}`
      );
    }

    if (!ALLOWED_PROFILES.has(document.profile)) {
      throw new Error(
        `Unsupported profile for ${document.id}: ${document.profile}`
      );
    }

    if (document.visibility !== "public") {
      throw new Error(`Non-public document rejected: ${document.id}`);
    }

    if (document.status !== "current") {
      throw new Error(`Non-current document rejected: ${document.id}`);
    }

    if (!Number.isInteger(document.version) || document.version < 1) {
      throw new Error(`Invalid document version: ${document.id}`);
    }
  }
}

export function validateChunks(chunks) {
  if (chunks.length !== EXPECTED_BASELINE_CHUNKS) {
    throw new Error(
      `Expected ${EXPECTED_BASELINE_CHUNKS} chunks, found ${chunks.length}`
    );
  }

  const ids = new Set();

  for (const chunk of chunks) {
    if (ids.has(chunk.chunkId)) {
      throw new Error(`Duplicate chunk id: ${chunk.chunkId}`);
    }

    ids.add(chunk.chunkId);

    if (!ALLOWED_LOCALES.has(chunk.locale)) {
      throw new Error(`Unsupported chunk locale: ${chunk.chunkId}`);
    }

    if (!ALLOWED_PROFILES.has(chunk.profile)) {
      throw new Error(`Unsupported chunk profile: ${chunk.chunkId}`);
    }

    if (chunk.visibility !== "public") {
      throw new Error(`Non-public chunk rejected: ${chunk.chunkId}`);
    }

    if (chunk.status !== "current") {
      throw new Error(`Non-current chunk rejected: ${chunk.chunkId}`);
    }

    if (!chunk.content || chunk.content.trim().length === 0) {
      throw new Error(`Empty content: ${chunk.chunkId}`);
    }

    if (!SHA256_HEX.test(chunk.contentHash)) {
      throw new Error(`Invalid SHA-256 hash format: ${chunk.chunkId}`);
    }

    const recomputedHash = hashContent(chunk.content);

    if (chunk.contentHash !== recomputedHash) {
      throw new Error(`SHA-256 content hash mismatch: ${chunk.chunkId}`);
    }

    if (!Number.isInteger(chunk.sectionIndex) || chunk.sectionIndex < 1) {
      throw new Error(`Invalid section index: ${chunk.chunkId}`);
    }

    if (chunk.ingestionVersion !== INGESTION_VERSION) {
      throw new Error(`Unexpected ingestion version: ${chunk.chunkId}`);
    }

    const sectionToken = String(chunk.sectionIndex).padStart(3, "0");
    const expectedChunkId =
      `${chunk.documentId}::${sectionToken}::${chunk.contentHash.slice(0, 12)}`;

    if (chunk.chunkId !== expectedChunkId) {
      throw new Error(`Chunk id does not match content identity: ${chunk.chunkId}`);
    }
  }

  const sorted = [...chunks].sort((a, b) =>
    a.locale.localeCompare(b.locale) ||
    a.documentId.localeCompare(b.documentId) ||
    a.sectionIndex - b.sectionIndex
  );

  for (let index = 0; index < chunks.length; index += 1) {
    if (chunks[index].chunkId !== sorted[index].chunkId) {
      throw new Error("Chunk ordering is not deterministic");
    }
  }
}
