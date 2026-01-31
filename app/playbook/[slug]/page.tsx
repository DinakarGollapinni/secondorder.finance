import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import MDXRenderer from "@/components/mdx/MDXRenderer";
import { serialize } from "next-mdx-remote/serialize";
import PlaybookShell from "@/components/playbook/PlaybookShell";
import { buildTocFromMdx } from "@/lib/toc";

const playbookDir = path.join(process.cwd(), "content/playbook");

export default async function PlaybookArticle({
  params,
}: {
  params: { slug: string };
}) {
  const filePath = path.join(playbookDir, `${params.slug}.mdx`);
  if (!fs.existsSync(filePath)) notFound();

  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);

  const mdxSource = await serialize(content);
  const toc = buildTocFromMdx(content);

  return (
    <PlaybookShell
      title={data.title ?? params.slug}
      summary={data.summary}
      currentSlug={params.slug}
      toc={toc}
    >
      <MDXRenderer mdxSource={mdxSource} />
    </PlaybookShell>
  );
}
