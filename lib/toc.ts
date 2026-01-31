// lib/toc.ts

export type TocItem = {
  text: string;
  id: string;
  level: 2 | 3;
};

export function buildTocFromMdx(mdx: string): TocItem[] {
  const lines = mdx.split("\n");
  const items: TocItem[] = [];

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)/);
    const h3 = line.match(/^###\s+(.+)/);

    const match = h2 ?? h3;
    if (!match) continue;

    const text = match[1].trim();
    const level: 2 | 3 = h2 ? 2 : 3;

    const id = slugify(text);
    items.push({ text, id, level });
  }

  return items;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
