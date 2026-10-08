import { normalizeText } from "./normalize-query.mjs";

const STOP_WORDS = new Set([
  "a",
  "al",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "can",
  "como",
  "con",
  "cual",
  "cuales",
  "de",
  "del",
  "does",
  "el",
  "en",
  "es",
  "esta",
  "este",
  "for",
  "from",
  "how",
  "in",
  "is",
  "it",
  "la",
  "las",
  "lo",
  "los",
  "of",
  "on",
  "or",
  "para",
  "por",
  "que",
  "se",
  "su",
  "sus",
  "the",
  "to",
  "un",
  "una",
  "what",
  "which",
  "with",
  "y"
]);

export function tokenize(value) {
  const normalized = normalizeText(value);

  if (!normalized) {
    return [];
  }

  return normalized
    .split(" ")
    .filter(Boolean)
    .filter((token) => token.length > 1)
    .filter((token) => !STOP_WORDS.has(token));
}

export function uniqueTokens(value) {
  return [...new Set(tokenize(value))];
}
