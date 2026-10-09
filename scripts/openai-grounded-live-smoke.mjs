import { loadEnvFile } from "node:process";

import { handleChatRetrievalPayload } from "../src/lib/rag/server/chat-retrieval-contract.mjs";
import { createChatGenerationRuntime } from "../src/lib/rag/server/chat-generation-runtime.mjs";

if (
  !process.env.OPENAI_API_KEY ||
  process.env.OPENAI_API_KEY.trim().length === 0
) {
  try {
    loadEnvFile(".env.local");
  } catch (error) {
    if (
      !error ||
      typeof error !== "object" ||
      error.code !== "ENOENT"
    ) {
      throw error;
    }
  }
}

if (
  !process.env.OPENAI_API_KEY ||
  process.env.OPENAI_API_KEY.trim().length === 0
) {
  throw new Error(
    "OPENAI_API_KEY is missing. Configure it server-side before running the live smoke."
  );
}

const runtime =
  createChatGenerationRuntime({
    env: process.env
  });

console.log(
  `Live smoke model: ${
    process.env.OPENAI_MODEL?.trim() ||
    "gpt-6-luna"
  }`
);
console.log("Sending exactly one grounded model request...");

const response =
  await handleChatRetrievalPayload(
    {
      message:
        "¿Qué es Gym Master y cómo puede ayudar a un gimnasio?",
      pageLocale: "es"
    },
    {
      generateGroundedAnswer: runtime
    }
  );

if (
  response.status !== 200 ||
  response.body.ok !== true ||
  response.body.grounded !== true ||
  typeof response.body.answer !== "string" ||
  response.body.answer.trim().length === 0
) {
  throw new Error(
    "Live grounded generation smoke did not return a valid grounded answer"
  );
}

console.log("");
console.log("OpenAI grounded live smoke PASS");
console.log(`Locale: ${response.body.queryLocale}`);
console.log(
  `Cross-language fallback: ${response.body.usedCrossLanguageFallback}`
);
console.log(
  `Commercial intent: ${response.body.commercialIntent}`
);
console.log(
  `Sources: ${response.body.sources.length}`
);
console.log("");
console.log("Answer:");
console.log(response.body.answer);
