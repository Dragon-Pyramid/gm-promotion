import { loadPublicRagCorpus } from "../src/lib/rag/server/load-corpus.mjs";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const first = await loadPublicRagCorpus();
const second = await loadPublicRagCorpus();

assert(first === second, "Runtime corpus cache did not reuse the same Promise result");
assert(first.length === 94, `Expected 94 chunks, found ${first.length}`);
assert(Object.isFrozen(first), "Runtime corpus array must be frozen");
assert(
  first.every((chunk) => Object.isFrozen(chunk)),
  "Every runtime chunk must be frozen"
);
assert(
  first.every(
    (chunk) =>
      chunk.visibility === "public" &&
      chunk.status === "current"
  ),
  "Runtime corpus must contain only public/current chunks"
);

const localeCounts = first.reduce(
  (counts, chunk) => {
    counts[chunk.locale] = (counts[chunk.locale] || 0) + 1;
    return counts;
  },
  {}
);

assert(
  localeCounts.es === 47 && localeCounts.en === 47,
  `Unexpected locale counts: ES=${localeCounts.es || 0} EN=${localeCounts.en || 0}`
);

console.log("Runtime RAG corpus check PASS");
console.log(`Chunks: ${first.length}`);
console.log(`ES chunks: ${localeCounts.es}`);
console.log(`EN chunks: ${localeCounts.en}`);
console.log("Public/current only: PASS");
console.log("Frozen runtime snapshot: PASS");
console.log("In-process cache reuse: PASS");
