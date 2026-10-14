import { hashContent } from "./hash-content.mjs";
import { normalizeContent } from "./normalize-content.mjs";
import { parseFrontmatter } from "./parse-frontmatter.mjs";
import { parseMarkdownSections } from "./parse-markdown-sections.mjs";

export const INGESTION_VERSION = 1;
export const MAX_SECTION_CHARS = 1800;

const ALLOWED_LOCALES = new Set(["es", "en"]);
const ALLOWED_PROFILES = new Set(["general", "admin", "team", "member"]);

function assertManifestFrontmatterParity(document, metadata) {
  const fields = [
    "id",
    "locale",
    "topic",
    "profile",
    "visibility",
    "status",
    "version"
  ];

  for (const field of fields) {
    if (metadata[field] !== document[field]) {
      throw new Error(
        `Manifest/frontmatter mismatch for ${document.id}: ${field}`
      );
    }
  }
}

function assertEligible(document) {
  if (!ALLOWED_LOCALES.has(document.locale)) {
    throw new Error(`Unsupported locale for ${document.id}: ${document.locale}`);
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
}

export function buildDocumentChunks(document, markdown) {
  assertEligible(document);

  const { metadata, body } = parseFrontmatter(markdown);
  assertManifestFrontmatterParity(document, metadata);

  const sections = parseMarkdownSections(body);

  return sections.map((section, zeroBasedIndex) => {
    const content = normalizeContent(section.content);
    const sectionIndex = zeroBasedIndex + 1;

    if (content.length === 0) {
      throw new Error(
        `Empty chunk content: ${document.id} section ${sectionIndex}`
      );
    }

    if (content.length > MAX_SECTION_CHARS) {
      throw new Error(
        `Section exceeds ${MAX_SECTION_CHARS} chars and requires reviewed secondary splitting: ${document.id} section ${sectionIndex}`
      );
    }

    const contentHash = hashContent(content);
    const sectionToken = String(sectionIndex).padStart(3, "0");

    return {
      chunkId: `${document.id}::${sectionToken}::${contentHash.slice(0, 12)}`,
      documentId: document.id,
      locale: document.locale,
      topic: document.topic,
      profile: document.profile,
      visibility: document.visibility,
      status: document.status,
      version: document.version,
      sourcePath: document.path,
      sourceSection: section.sourceSection,
      sectionIndex,
      content,
      contentHash,
      ingestionVersion: INGESTION_VERSION
    };
  });
}
