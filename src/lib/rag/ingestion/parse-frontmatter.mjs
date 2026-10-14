const REQUIRED_FIELDS = [
  "id",
  "locale",
  "topic",
  "profile",
  "visibility",
  "status",
  "version"
];

function parseScalar(value) {
  const trimmed = value.trim();

  if (/^\d+$/.test(trimmed)) {
    return Number(trimmed);
  }

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

export function parseFrontmatter(markdown) {
  const normalized = markdown.replace(/\r\n?/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!match) {
    throw new Error("Missing or malformed frontmatter block");
  }

  const metadata = {};

  for (const line of match[1].split("\n")) {
    const field = line.match(/^([^:#]+):\s*(.*?)\s*$/);

    if (!field) {
      throw new Error(`Malformed frontmatter line: ${line}`);
    }

    const key = field[1].trim();
    if (Object.prototype.hasOwnProperty.call(metadata, key)) {
      throw new Error(`Duplicate frontmatter key: ${key}`);
    }

    metadata[key] = parseScalar(field[2]);
  }

  for (const field of REQUIRED_FIELDS) {
    if (
      !Object.prototype.hasOwnProperty.call(metadata, field) ||
      metadata[field] === ""
    ) {
      throw new Error(`Missing required frontmatter field: ${field}`);
    }
  }

  return {
    metadata,
    body: normalized.slice(match[0].length)
  };
}
