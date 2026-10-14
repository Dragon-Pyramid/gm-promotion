import {NextResponse} from "next/server";

import {handleChatRetrievalPayload} from "@/lib/rag/server/chat-retrieval-contract.mjs";
import {generateGroundedChatAnswer} from "@/lib/rag/server/chat-generation-runtime.mjs";
import {readBoundedJsonRequest} from "@/lib/security/server/read-bounded-json-request.mjs";

export const runtime = "nodejs";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store"
};

export async function POST(request: Request) {
  const parsed = await readBoundedJsonRequest(request, {maxBytes: 8192});
  if (!parsed.ok) {
    return NextResponse.json(
      {ok: false, error: parsed.error},
      {status: parsed.status, headers: NO_STORE_HEADERS}
    );
  }
  const raw: unknown = parsed.value;

  try {
    const response = await handleChatRetrievalPayload(
      raw,
      {
        generateGroundedAnswer:
          generateGroundedChatAnswer
      }
    );

    return NextResponse.json(
      response.body,
      {
        status: response.status,
        headers: NO_STORE_HEADERS
      }
    );
  } catch (error) {
    console.error("[chat] Retrieval contract failed.", error);

    return NextResponse.json(
      {ok: false, error: "retrieval_failed"},
      {
        status: 500,
        headers: NO_STORE_HEADERS
      }
    );
  }
}
