import { handleChatRetrievalPayload } from "../src/lib/rag/server/chat-retrieval-contract.mjs";
import { createChatGenerationRuntime } from "../src/lib/rag/server/chat-generation-runtime.mjs";
import {
  createOpenAIResponsesProvider,
  OPENAI_DEFAULT_MODEL
} from "../src/lib/rag/server/openai-responses-provider.mjs";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function responseWithText(text) {
  return {
    ok: true,
    status: 200,
    async json() {
      return {
        status: "completed",
        output: [
          {
            type: "message",
            role: "assistant",
            content: [
              {
                type: "output_text",
                text
              }
            ]
          }
        ]
      };
    }
  };
}

const directCalls = [];

const directProvider =
  createOpenAIResponsesProvider({
    apiKey: "sk-test-not-real",
    fetchImpl: async (url, options) => {
      directCalls.push({url, options});
      return responseWithText(
        "  Respuesta pública de prueba.  "
      );
    }
  });

const directOutput =
  await directProvider.generateText({
    instructions: "Use only supplied evidence.",
    input: "{\"question\":\"Gym Master\"}",
    locale: "es"
  });

assert(
  directOutput === "Respuesta pública de prueba.",
  "Adapter should return trimmed output text"
);

assert(
  directCalls.length === 1,
  "Adapter should perform exactly one fetch"
);

const directCall = directCalls[0];

assert(
  directCall.url ===
    "https://api.openai.com/v1/responses",
  "Unexpected OpenAI Responses endpoint"
);

assert(
  directCall.options.method === "POST",
  "OpenAI request must use POST"
);

assert(
  directCall.options.headers.Authorization ===
    "Bearer sk-test-not-real",
  "Authorization header mismatch"
);

assert(
  directCall.options.headers["Content-Type"] ===
    "application/json",
  "Content-Type header mismatch"
);

const body = JSON.parse(directCall.options.body);

assert(
  Object.keys(body).sort().join(",") ===
    [
      "model",
      "instructions",
      "input",
      "store",
      "tools",
      "max_output_tokens"
    ].sort().join(","),
  "OpenAI request body has unexpected fields"
);

assert(
  body.model === OPENAI_DEFAULT_MODEL &&
  body.model === "gpt-6-luna",
  "Unexpected default OpenAI model"
);

assert(
  body.store === false,
  "OpenAI response storage must be disabled"
);

assert(
  Array.isArray(body.tools) &&
  body.tools.length === 0,
  "OpenAI built-in tools must be disabled"
);

assert(
  body.max_output_tokens === 320,
  "Unexpected max output token limit"
);

console.log("PASS - Responses request shape");
console.log("PASS - store=false");
console.log("PASS - built-in tools disabled");
console.log("PASS - default model gpt-6-luna");

const runtimeCalls = [];

const runtime =
  createChatGenerationRuntime({
    env: {
      OPENAI_API_KEY: "sk-runtime-test",
      OPENAI_MODEL: "gpt-6-luna"
    },
    fetchImpl: async (url, options) => {
      runtimeCalls.push({url, options});
      return responseWithText(
        "Gym Master organiza información pública relevante para la operación del gimnasio."
      );
    }
  });

const grounded =
  await handleChatRetrievalPayload(
    {
      message: "¿Qué es Gym Master?",
      pageLocale: "es"
    },
    {
      generateGroundedAnswer: runtime
    }
  );

assert(
  grounded.status === 200 &&
  grounded.body.ok === true &&
  grounded.body.grounded === true &&
  runtimeCalls.length === 1,
  "Grounded runtime integration failed"
);

assert(
  grounded.body.answer.includes("Gym Master"),
  "Grounded runtime answer missing"
);

const runtimeBody =
  JSON.parse(runtimeCalls[0].options.body);

assert(
  runtimeBody.input.includes(
    "PUBLIC_GYM_MASTER_CONTEXT"
  ),
  "Runtime must send grounded public context"
);

assert(
  !runtimeBody.input.includes("contentHash") &&
  !runtimeBody.input.includes("chunkId") &&
  !runtimeBody.input.includes("\"score\"") &&
  !runtimeBody.input.includes("\"profile\""),
  "Runtime leaked retrieval internals"
);

console.log("PASS - grounded chat uses OpenAI runtime adapter");
console.log("PASS - provider input contains public evidence only");

let unexpectedFetches = 0;

const noKeyRuntime =
  createChatGenerationRuntime({
    env: {},
    fetchImpl: async () => {
      unexpectedFetches += 1;
      throw new Error("Unexpected external call");
    }
  });

const unsupported =
  await handleChatRetrievalPayload(
    {
      message: "¿Cuál es la capital de Japón?",
      pageLocale: "es"
    },
    {
      generateGroundedAnswer: noKeyRuntime
    }
  );

assert(
  unsupported.status === 200 &&
  unsupported.body.grounded === false &&
  unexpectedFetches === 0,
  "Unsupported query must not touch OpenAI runtime"
);

const excluded =
  await handleChatRetrievalPayload(
    {
      message: "¿Qué puede hacer Masteradmin?",
      pageLocale: "es"
    },
    {
      generateGroundedAnswer: noKeyRuntime
    }
  );

assert(
  excluded.status === 200 &&
  excluded.body.grounded === false &&
  unexpectedFetches === 0,
  "Excluded scope must not touch OpenAI runtime"
);

console.log("PASS - unsupported/excluded do not require API key");

let missingKeyRejected = false;

try {
  await handleChatRetrievalPayload(
    {
      message: "¿Qué es Gym Master?",
      pageLocale: "es"
    },
    {
      generateGroundedAnswer: noKeyRuntime
    }
  );
} catch (error) {
  missingKeyRejected =
    error instanceof Error &&
    error.message.includes(
      "OPENAI_API_KEY is not configured"
    );
}

assert(
  missingKeyRejected,
  "Grounded request without API key must fail closed"
);

console.log("PASS - grounded request without API key fails closed");

const failingProvider =
  createOpenAIResponsesProvider({
    apiKey: "sk-test-not-real",
    fetchImpl: async () => ({
      ok: false,
      status: 401,
      async json() {
        return {};
      }
    })
  });

let httpFailureSafe = false;

try {
  await failingProvider.generateText({
    instructions: "test",
    input: "test",
    locale: "en"
  });
} catch (error) {
  httpFailureSafe =
    error instanceof Error &&
    error.message ===
      "OpenAI Responses request failed with status 401" &&
    !error.message.includes("sk-test-not-real");
}

assert(
  httpFailureSafe,
  "HTTP failure must not leak API key"
);

console.log("PASS - provider HTTP errors do not leak credentials");

const emptyProvider =
  createOpenAIResponsesProvider({
    apiKey: "sk-test-not-real",
    fetchImpl: async () => ({
      ok: true,
      status: 200,
      async json() {
        return {
          status: "completed",
          output: []
        };
      }
    })
  });

let emptyRejected = false;

try {
  await emptyProvider.generateText({
    instructions: "test",
    input: "test",
    locale: "en"
  });
} catch (error) {
  emptyRejected =
    error instanceof Error &&
    error.message.includes("no usable text");
}

assert(
  emptyRejected,
  "Empty Responses output must fail closed"
);

console.log("PASS - empty Responses output fails closed");

console.log("");
console.log("OpenAI Responses adapter/runtime PASS");
console.log("External API calls: 0");
console.log("Real API key required for this gate: NO");
