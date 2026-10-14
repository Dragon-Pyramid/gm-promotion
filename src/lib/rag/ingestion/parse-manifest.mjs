const REQUIRED_FIELDS = [
  "id",
  "locale",
  "profile",
  "topic",
  "path",
  "visibility",
  "status",
  "version"
];

function findMatchingDelimiter(source, startIndex, openChar, closeChar) {
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index];

    if (quote !== null) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === openChar) {
      depth += 1;
      continue;
    }

    if (char === closeChar) {
      depth -= 1;

      if (depth === 0) {
        return index;
      }

      if (depth < 0) {
        throw new Error(`Unexpected closing delimiter: ${closeChar}`);
      }
    }
  }

  throw new Error(`Matching delimiter not found for ${openChar}`);
}

function extractObjectBlocks(arrayBody) {
  const blocks = [];

  let quote = null;
  let escaped = false;
  let objectStart = -1;
  let depth = 0;

  for (let index = 0; index < arrayBody.length; index += 1) {
    const char = arrayBody[index];

    if (quote !== null) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "{") {
      if (depth === 0) {
        objectStart = index;
      }
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;

      if (depth < 0) {
        throw new Error("Unexpected closing brace in ragDocuments");
      }

      if (depth === 0 && objectStart !== -1) {
        blocks.push(arrayBody.slice(objectStart + 1, index));
        objectStart = -1;
      }
    }
  }

  if (depth !== 0 || objectStart !== -1) {
    throw new Error("Unbalanced object braces in ragDocuments");
  }

  return blocks;
}

function readStringField(block, field) {
  const match = block.match(
    new RegExp(`(?:^|\\n)\\s*${field}:\\s*"([^"]+)"\\s*,?\\s*(?:\\n|$)`)
  );

  if (!match) {
    throw new Error(`Manifest entry missing string field: ${field}`);
  }

  return match[1];
}

function readNumberField(block, field) {
  const match = block.match(
    new RegExp(`(?:^|\\n)\\s*${field}:\\s*(\\d+)\\s*,?\\s*(?:\\n|$)`)
  );

  if (!match) {
    throw new Error(`Manifest entry missing numeric field: ${field}`);
  }

  return Number(match[1]);
}

export function parseManifest(source) {
  const marker = "export const ragDocuments";
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error("ragDocuments export not found in manifest");
  }

  const assignmentIndex = source.indexOf("=", markerIndex);

  if (assignmentIndex === -1) {
    throw new Error("ragDocuments assignment not found");
  }

  const arrayStart = source.indexOf("[", assignmentIndex);

  if (arrayStart === -1) {
    throw new Error("ragDocuments array start not found");
  }

  const arrayEnd = findMatchingDelimiter(source, arrayStart, "[", "]");
  const arrayBody = source.slice(arrayStart + 1, arrayEnd);
  const blocks = extractObjectBlocks(arrayBody);

  if (blocks.length === 0) {
    throw new Error("No manifest entries found");
  }

  const documents = blocks.map((block) => {
    const entry = {
      id: readStringField(block, "id"),
      locale: readStringField(block, "locale"),
      profile: readStringField(block, "profile"),
      topic: readStringField(block, "topic"),
      path: readStringField(block, "path"),
      visibility: readStringField(block, "visibility"),
      status: readStringField(block, "status"),
      version: readNumberField(block, "version")
    };

    for (const field of REQUIRED_FIELDS) {
      if (entry[field] === undefined || entry[field] === "") {
        throw new Error(
          `Manifest entry ${entry.id || "(unknown)"} missing ${field}`
        );
      }
    }

    return entry;
  });

  const ids = new Set();

  for (const document of documents) {
    if (ids.has(document.id)) {
      throw new Error(`Duplicate manifest document id: ${document.id}`);
    }

    ids.add(document.id);
  }

  return documents;
}
