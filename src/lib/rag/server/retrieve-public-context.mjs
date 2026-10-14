import { normalizeText } from "../retrieval/normalize-query.mjs";
import { retrieve } from "../retrieval/retrieve.mjs";
import { loadPublicRagCorpus } from "./load-corpus.mjs";
import { resolveQueryLocale } from "./resolve-query-locale.mjs";
import { resolveRetrievalHints } from "./resolve-retrieval-hints.mjs";

const MAX_QUERY_LENGTH = 600;
const ALLOWED_PAGE_LOCALES = new Set(["es", "en"]);

function assertInput({ query, pageLocale, topK }) {
  if (typeof query !== "string" || query.trim().length === 0) {
    throw new Error("query must be a non-empty string");
  }

  if (query.length > MAX_QUERY_LENGTH) {
    throw new Error(
      `query exceeds ${MAX_QUERY_LENGTH} characters`
    );
  }

  if (!ALLOWED_PAGE_LOCALES.has(pageLocale)) {
    throw new Error(`Unsupported page locale: ${pageLocale}`);
  }

  if (!Number.isInteger(topK) || topK < 1 || topK > 5) {
    throw new Error("topK must be an integer between 1 and 5");
  }
}

function isExcludedPublicScope(query) {
  const normalized = normalizeText(query);

  return (
    normalized.includes("masteradmin") ||
    normalized.includes("master admin")
  );
}

function emptyHints() {
  return {
    topicHint: undefined,
    profileHint: undefined,
    confidence: "none"
  };
}

export async function retrievePublicContext({
  query,
  pageLocale,
  topK = 3
}) {
  assertInput({ query, pageLocale, topK });

  const trimmedQuery = query.trim();
  const queryLocale = resolveQueryLocale({
    query: trimmedQuery,
    pageLocale
  });

  if (isExcludedPublicScope(trimmedQuery)) {
    return {
      queryLocale,
      groundedEnough: false,
      usedCrossLanguageFallback: false,
      retrievalStatus: "excluded_scope",
      hints: emptyHints(),
      results: []
    };
  }

  const hints = resolveRetrievalHints(trimmedQuery);
  const chunks = await loadPublicRagCorpus();

  const response = retrieve({
    chunks,
    query: trimmedQuery,
    queryLocale,
    pageLocale,
    profileHint: hints.profileHint,
    topicHint: hints.topicHint,
    topK
  });

  return {
    queryLocale: response.queryLocale,
    groundedEnough: response.groundedEnough,
    usedCrossLanguageFallback:
      response.usedCrossLanguageFallback,
    retrievalStatus:
      response.groundedEnough
        ? "grounded"
        : "unsupported",
    hints,
    results: response.results.map((result) => ({
      rank: result.rank,
      score: result.score,
      sameLanguage: result.sameLanguage,
      chunk: {
        chunkId: result.chunk.chunkId,
        documentId: result.chunk.documentId,
        locale: result.chunk.locale,
        topic: result.chunk.topic,
        profile: result.chunk.profile,
        sourceSection: result.chunk.sourceSection,
        content: result.chunk.content
      }
    }))
  };
}
