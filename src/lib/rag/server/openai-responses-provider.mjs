const DEFAULT_MODEL = "gpt-6-luna";
const DEFAULT_BASE_URL = "https://api.openai.com/v1";
const DEFAULT_MAX_OUTPUT_TOKENS = 320;
const DEFAULT_TIMEOUT_MS = 15000;

function asNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
}

function assertPositiveInteger(value, name) {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`${name} must be a positive integer`);
  }
}

function extractOutputText(payload) {
  if (
    payload &&
    typeof payload.output_text === "string" &&
    payload.output_text.trim().length > 0
  ) {
    return payload.output_text.trim();
  }

  if (!payload || !Array.isArray(payload.output)) {
    return "";
  }

  const parts = [];

  for (const item of payload.output) {
    if (!item || item.type !== "message" || !Array.isArray(item.content)) {
      continue;
    }

    for (const content of item.content) {
      if (
        content &&
        content.type === "output_text" &&
        typeof content.text === "string" &&
        content.text.trim().length > 0
      ) {
        parts.push(content.text.trim());
      }
    }
  }

  return parts.join("\n").trim();
}

export function createOpenAIResponsesProvider({
  apiKey,
  model = DEFAULT_MODEL,
  fetchImpl = globalThis.fetch,
  baseUrl = DEFAULT_BASE_URL,
  maxOutputTokens = DEFAULT_MAX_OUTPUT_TOKENS,
  timeoutMs = DEFAULT_TIMEOUT_MS
}) {
  const normalizedApiKey = asNonEmptyString(apiKey);
  const normalizedModel = asNonEmptyString(model);
  const normalizedBaseUrl = asNonEmptyString(baseUrl);

  if (!normalizedApiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  if (!normalizedModel) {
    throw new Error("OpenAI model must be configured");
  }

  if (!normalizedBaseUrl) {
    throw new Error("OpenAI base URL must be configured");
  }

  if (typeof fetchImpl !== "function") {
    throw new Error("OpenAI provider requires fetch");
  }

  assertPositiveInteger(
    maxOutputTokens,
    "maxOutputTokens"
  );
  assertPositiveInteger(
    timeoutMs,
    "timeoutMs"
  );

  const endpoint =
    `${normalizedBaseUrl.replace(/\/+$/, "")}/responses`;

  return Object.freeze({
    async generateText({instructions, input, locale}) {
      const normalizedInstructions =
        asNonEmptyString(instructions);
      const normalizedInput =
        asNonEmptyString(input);

      if (!normalizedInstructions) {
        throw new Error(
          "OpenAI Responses instructions are required"
        );
      }

      if (!normalizedInput) {
        throw new Error(
          "OpenAI Responses input is required"
        );
      }

      if (locale !== "es" && locale !== "en") {
        throw new Error(
          `Unsupported OpenAI generation locale: ${locale}`
        );
      }

      const controller = new AbortController();
      const timeout = setTimeout(
        () => controller.abort(),
        timeoutMs
      );

      let response;

      try {
        response = await fetchImpl(endpoint, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${normalizedApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: normalizedModel,
            instructions: normalizedInstructions,
            input: normalizedInput,
            store: false,
            tools: [],
            max_output_tokens: maxOutputTokens
          }),
          signal: controller.signal
        });
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          error.name === "AbortError"
        ) {
          throw new Error(
            "OpenAI Responses request timed out"
          );
        }

        throw new Error(
          "OpenAI Responses request failed"
        );
      } finally {
        clearTimeout(timeout);
      }

      if (
        !response ||
        typeof response.ok !== "boolean" ||
        typeof response.json !== "function"
      ) {
        throw new Error(
          "OpenAI Responses returned an invalid HTTP response"
        );
      }

      if (!response.ok) {
        throw new Error(
          `OpenAI Responses request failed with status ${response.status}`
        );
      }

      const payload = await response.json();
      const text = extractOutputText(payload);

      if (!text) {
        throw new Error(
          "OpenAI Responses returned no usable text"
        );
      }

      return text;
    }
  });
}

export const OPENAI_DEFAULT_MODEL = DEFAULT_MODEL;
