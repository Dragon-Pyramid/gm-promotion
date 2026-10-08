import { rankChunks } from "./rank-chunks.mjs";
import { normalizeText } from "./normalize-query.mjs";
import { uniqueTokens } from "./tokenize.mjs";

const SUBSTANTIVE_EXCLUDED_TOKENS = new Set(["gym", "master"]);

const ALLOWED_LOCALES = new Set(["es", "en"]);

function resolveLocale(queryLocale, pageLocale) {
  if (queryLocale !== undefined && queryLocale !== null) {
    if (!ALLOWED_LOCALES.has(queryLocale)) {
      throw new Error(`Unsupported query locale: ${queryLocale}`);
    }

    return queryLocale;
  }

  if (ALLOWED_LOCALES.has(pageLocale)) {
    return pageLocale;
  }

  throw new Error("A valid queryLocale or pageLocale is required");
}

function isGroundedEnough(results, query) {
  const top = results[0];

  if (!top) {
    return false;
  }

  const normalizedQuery = normalizeText(query);
  const hasGymMasterBrandPhrase = normalizedQuery.includes("gym master");

  const substantiveQueryTokens = uniqueTokens(query).filter(
    (token) =>
      !hasGymMasterBrandPhrase ||
      !SUBSTANTIVE_EXCLUDED_TOKENS.has(token)
  );

  const hasRequiredSubstantiveEvidence =
    substantiveQueryTokens.length === 0 ||
    top.signals.matchedSubstantiveTokenCount >= 1;

  return (
    hasRequiredSubstantiveEvidence &&
    top.signals.matchedTokenCount >= 1 &&
    top.signals.coverage >= 0.2 &&
    top.signals.lexicalScore >= 2
  );
}

export function retrieve({
  chunks,
  query,
  queryLocale,
  pageLocale,
  profileHint,
  topicHint,
  topK = 5
}) {
  if (!Array.isArray(chunks)) {
    throw new Error("chunks must be an array");
  }

  if (typeof query !== "string" || query.trim().length === 0) {
    throw new Error("query must be a non-empty string");
  }

  const resolvedLocale = resolveLocale(
    queryLocale,
    pageLocale
  );

  const primaryResults = rankChunks({
    chunks,
    query,
    queryLocale: resolvedLocale,
    profileHint,
    topicHint,
    topK
  });

  const primaryGrounded = isGroundedEnough(primaryResults, query);

  if (primaryGrounded) {
    return {
      queryLocale: resolvedLocale,
      usedCrossLanguageFallback: false,
      groundedEnough: true,
      results: primaryResults
    };
  }

  const fallbackLocale = resolvedLocale === "es" ? "en" : "es";

  const fallbackResults = rankChunks({
    chunks,
    query,
    queryLocale: fallbackLocale,
    profileHint,
    topicHint,
    topK
  }).map((result) => ({
    ...result,
    sameLanguage: false
  }));

  const fallbackGrounded = isGroundedEnough(fallbackResults, query);

  return {
    queryLocale: resolvedLocale,
    usedCrossLanguageFallback: fallbackResults.length > 0,
    groundedEnough: fallbackGrounded,
    results: fallbackGrounded ? fallbackResults : []
  };
}
