const EMBED_HOST = "https://embeds.debtwatch.uk";

export interface EmbedCodeOptions {
  contextSlug: string;
  embedSlug: string;
  version: string;
  width?: number;
  height?: number;
  title?: string;
}

export interface EmbedCodeResult {
  embedUrl: string;
  iframeCode: string;
}

export function buildEmbedCode({
  contextSlug,
  embedSlug,
  version,
  width = 700,
  height = 450,
  title = "DebtWatch chart",
}: EmbedCodeOptions): EmbedCodeResult {
  const embedUrl = `${EMBED_HOST}/${contextSlug}/${version}/${embedSlug}/index.html`;
  const iframeCode = [
    "<iframe",
    `  src="${embedUrl}"`,
    `  width="${width}"`,
    `  height="${height}"`,
    "  style={{ border: 0 }}",
    '  loading="lazy"',
    `  title="${title}"`,
    "/>",
  ].join("\n");

  return {
    embedUrl,
    iframeCode,
  };
}
