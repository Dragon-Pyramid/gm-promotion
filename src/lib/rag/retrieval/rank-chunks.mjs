import {
  buildDocumentFrequency,
  scoreChunk
} from "./lexical-score.mjs";
import { uniqueTokens } from "./tokenize.mjs";

export function rankChunks({
  chunks,
  query,
  queryLocale,
  profileHint,
  topicHint,
  topK = 5
}) {
  if (!Number.isInteger(topK) || topK < 1) {
    throw new Error("topK must be a positive integer");
  }

  const eligible = chunks.filter((chunk) => {
    if (chunk.visibility !== "public") {
      throw new Error(`Non-public chunk rejected: ${chunk.chunkId}`);
    }

    if (chunk.status !== "current") {
      throw new Error(`Non-current chunk rejected: ${chunk.chunkId}`);
    }

    return chunk.locale === queryLocale;
  });

  const queryTokens = uniqueTokens(query);

  if (queryTokens.length === 0 || eligible.length === 0) {
    return [];
  }

  const documentFrequency = buildDocumentFrequency(
    eligible,
    queryTokens
  );

  return eligible
    .map((chunk) => {
      const signals = scoreChunk({
        chunk,
        query,
        queryTokens,
        documentFrequency,
        candidateCount: eligible.length,
        profileHint,
        topicHint
      });

      return {
        chunk,
        score: signals.finalScore,
        sameLanguage: chunk.locale === queryLocale,
        signals
      };
    })
    .filter((result) => result.signals.matchedTokenCount > 0)
    .sort((a, b) =>
      b.score - a.score ||
      Number(b.sameLanguage) - Number(a.sameLanguage) ||
      a.chunk.documentId.localeCompare(b.chunk.documentId) ||
      a.chunk.sectionIndex - b.chunk.sectionIndex
    )
    .slice(0, topK)
    .map((result, index) => ({
      ...result,
      rank: index + 1
    }));
}
