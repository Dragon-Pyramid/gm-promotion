import { createGroundedAnswerGenerator } from "./grounded-answer-generator.mjs";
import {
  createOpenAIResponsesProvider,
  OPENAI_DEFAULT_MODEL
} from "./openai-responses-provider.mjs";

export function createChatGenerationRuntime({
  env = process.env,
  fetchImpl = globalThis.fetch
} = {}) {
  let generator = null;

  return async function generateGroundedChatAnswer(request) {
    if (generator === null) {
      const provider = createOpenAIResponsesProvider({
        apiKey: env.OPENAI_API_KEY,
        model:
          typeof env.OPENAI_MODEL === "string" &&
          env.OPENAI_MODEL.trim().length > 0
            ? env.OPENAI_MODEL.trim()
            : OPENAI_DEFAULT_MODEL,
        fetchImpl
      });

      generator = createGroundedAnswerGenerator({
        provider
      });
    }

    return generator(request);
  };
}

export const generateGroundedChatAnswer =
  createChatGenerationRuntime();
