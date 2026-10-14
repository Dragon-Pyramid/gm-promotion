import { normalizeText } from "./normalize-query.mjs";
import { uniqueTokens } from "./tokenize.mjs";

const BRAND_TOKENS = new Set(["gym", "master"]);

const TOKEN_ALIASES = new Map([
  ["modulo", ["modulo", "module", "modules"]],
  ["modulos", ["modulos", "module", "modules"]],
  ["funcionalidad", ["funcionalidad", "feature", "features", "capability", "capabilities"]],
  ["funcionalidades", ["funcionalidades", "feature", "features", "capability", "capabilities"]],
  ["cost", ["cost", "price", "pricing"]],
  ["price", ["price", "pricing", "cost"]],
  ["pricing", ["pricing", "price", "cost"]],
  ["cuesta", ["cuesta", "precio", "precios"]],
  ["precio", ["precio", "precios", "cuesta"]],
  ["precios", ["precios", "precio", "cuesta"]]
]);

function tokenVariants(token) {
  return TOKEN_ALIASES.get(token) ?? [token];
}

function buildBigrams(tokens) {
  const bigrams = [];

  for (let index = 0; index < tokens.length - 1; index += 1) {
    bigrams.push(`${tokens[index]} ${tokens[index + 1]}`);
  }

  return bigrams;
}

function searchableText(chunk) {
  return [
    chunk.content,
    chunk.sourceSection,
    chunk.topic,
    chunk.profile
  ]
    .filter(Boolean)
    .join(" ");
}

export function buildDocumentFrequency(chunks, queryTokens) {
  const frequencies = new Map();

  for (const token of queryTokens) {
    let count = 0;

    for (const chunk of chunks) {
      const tokens = new Set(uniqueTokens(searchableText(chunk)));

      if (tokenVariants(token).some((variant) => tokens.has(variant))) {
        count += 1;
      }
    }

    frequencies.set(token, count);
  }

  return frequencies;
}

export function scoreChunk({
  chunk,
  query,
  queryTokens,
  documentFrequency,
  candidateCount,
  profileHint,
  topicHint
}) {
  const searchable = searchableText(chunk);
  const normalizedSearchable = normalizeText(searchable);
  const searchableTokens = new Set(uniqueTokens(searchable));
  const normalizedQuery = normalizeText(query);
  const hasGymMasterBrandPhrase = normalizedQuery.includes("gym master");

  let matchedWeight = 0;
  let totalWeight = 0;
  let matchedTokenCount = 0;
  let matchedSubstantiveTokenCount = 0;

  for (const token of queryTokens) {
    const df = documentFrequency.get(token) ?? 0;
    const idf = Math.log((candidateCount + 1) / (df + 1)) + 1;

    totalWeight += idf;

    const tokenMatched = tokenVariants(token).some(
      (variant) => searchableTokens.has(variant)
    );

    if (tokenMatched) {
      matchedWeight += idf;
      matchedTokenCount += 1;

      const tokenIsOnlyBrandEvidence =
        hasGymMasterBrandPhrase &&
        BRAND_TOKENS.has(token);

      if (!tokenIsOnlyBrandEvidence) {
        matchedSubstantiveTokenCount += 1;
      }
    }
  }

  const coverage =
    totalWeight > 0
      ? matchedWeight / totalWeight
      : 0;

  const queryBigrams = buildBigrams(queryTokens);
  const matchedBigrams = queryBigrams.filter((bigram) =>
    normalizedSearchable.includes(bigram)
  ).length;

  const bigramCoverage =
    queryBigrams.length > 0
      ? matchedBigrams / queryBigrams.length
      : 0;

  const exactPhrase =
    normalizedQuery.length >= 6 &&
    normalizedSearchable.includes(normalizedQuery)
      ? 1
      : 0;

  const lexicalScore =
    coverage * 10 +
    matchedTokenCount * 0.5 +
    bigramCoverage * 1.5 +
    exactPhrase * 2;

  const hasSubstantiveQueryTokens = queryTokens.some(
    (token) =>
      !hasGymMasterBrandPhrase ||
      !BRAND_TOKENS.has(token)
  );

  const metadataEvidenceSatisfied =
    !hasSubstantiveQueryTokens ||
    matchedSubstantiveTokenCount > 0;

  const profileBoost =
    metadataEvidenceSatisfied &&
    profileHint &&
    chunk.profile === profileHint
      ? 0.75
      : 0;

  const topicBoost =
    metadataEvidenceSatisfied &&
    topicHint &&
    chunk.topic === topicHint
      ? 3.5
      : 0;

  return {
    lexicalScore,
    localeBoost: 0,
    profileBoost,
    topicBoost,
    coverage,
    matchedTokenCount,
    matchedSubstantiveTokenCount,
    metadataEvidenceSatisfied,
    matchedBigrams,
    exactPhrase,
    finalScore:
      lexicalScore +
      profileBoost +
      topicBoost
  };
}
