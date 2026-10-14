export function parseMarkdownSections(markdownBody) {
  const lines = markdownBody.replace(/\r\n?/g, "\n").split("\n");
  const sections = [];

  let heading = "(intro)";
  let headingLevel = 0;
  let buffer = [];

  const flush = () => {
    const content = buffer.join("\n").trim();

    if (content.length > 0) {
      sections.push({
        sourceSection: heading,
        headingLevel,
        content
      });
    }

    buffer = [];
  };

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+?)\s*$/);

    if (match) {
      flush();
      heading = match[2].trim();
      headingLevel = match[1].length;
      buffer.push(line.trimEnd());
    } else {
      buffer.push(line.trimEnd());
    }
  }

  flush();

  if (sections.length === 0) {
    throw new Error("Document produced no semantic sections");
  }

  return sections;
}
