import { retrievePublicContext } from "./retrieve-public-context.mjs";

const ALLOWED_PAGE_LOCALES = new Set(["es", "en"]);
const MAX_MESSAGE_LENGTH = 600;
const ALLOWED_REQUEST_KEYS = new Set(["message", "pageLocale"]);

const RESPONSES = {
  es: {
    grounded:
      "Encontré información pública relevante de Gym Master para tu consulta.",
    unsupported:
      "No tengo información pública suficiente de Gym Master para responder eso con seguridad.",
    excluded_scope:
      "Ese tema no forma parte de la información pública de Gym Master que puedo compartir."
  },
  en: {
    grounded:
      "I found relevant public Gym Master information for your question.",
    unsupported:
      "I do not have enough public Gym Master information to answer that safely.",
    excluded_scope:
      "That topic is not part of the public Gym Master information I can share."
  }
};

function validationError() {
  return {
    status: 400,
    body: {
      ok: false,
      error: "validation_failed"
    }
  };
}

function validatePayload(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return null;
  }

  const keys = Object.keys(raw);

  if (
    keys.length !== 2 ||
    keys.some((key) => !ALLOWED_REQUEST_KEYS.has(key))
  ) {
    return null;
  }

  const { message, pageLocale } = raw;

  if (
    typeof message !== "string" ||
    message.trim().length === 0 ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return null;
  }

  if (
    typeof pageLocale !== "string" ||
    !ALLOWED_PAGE_LOCALES.has(pageLocale)
  ) {
    return null;
  }

  return {
    message: message.trim(),
    pageLocale
  };
}

function publicSources(results) {
  const seen = new Set();
  const sources = [];

  for (const result of results) {
    const source = {
      documentId: result.chunk.documentId,
      topic: result.chunk.topic,
      sourceSection: result.chunk.sourceSection
    };

    const identity = [
      source.documentId,
      source.topic,
      source.sourceSection
    ].join("::");

    if (seen.has(identity)) {
      continue;
    }

    seen.add(identity);
    sources.push(source);
  }

  return sources;
}

function commercialIntent(retrieval) {
  return retrieval.hints.topicHint === "demo-sales";
}

export async function handleChatRetrievalPayload(raw, {generateGroundedAnswer} = {}) {
  const payload = validatePayload(raw);

  if (!payload) {
    return validationError();
  }

  const retrieval = await retrievePublicContext({
    query: payload.message,
    pageLocale: payload.pageLocale,
    topK: 3
  });

  const locale = retrieval.queryLocale;
  let answer =
    RESPONSES[locale][retrieval.retrievalStatus];

  if (retrieval.groundedEnough && generateGroundedAnswer !== undefined) {
    if (typeof generateGroundedAnswer !== "function") {
      throw new Error(
        "generateGroundedAnswer must be a function when provided"
      );
    }

    answer = await generateGroundedAnswer({
      query: payload.message,
      queryLocale: locale,
      results: retrieval.results
    });
  }

  if (!answer) {
    throw new Error(
      `Unhandled retrieval status: ${retrieval.retrievalStatus}`
    );
  }

  return {
    status: 200,
    body: {
      ok: true,
      answer,
      queryLocale: locale,
      grounded: retrieval.groundedEnough,
      usedCrossLanguageFallback:
        retrieval.usedCrossLanguageFallback,
      commercialIntent: commercialIntent(retrieval),
      sources: publicSources(retrieval.results)
    }
  };
}
