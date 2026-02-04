import { notFound } from "next/navigation";
import MDXRenderer from "@/components/mdx/MDXRenderer";
import { serialize } from "next-mdx-remote/serialize";
import PlaybookShell from "@/components/playbook/PlaybookShell";
import { buildTocFromMdx } from "@/lib/toc";
import { getArticleBySlug, getAllArticles } from "@/lib/playbook";

// Pre-render all articles for performance
export async function generateStaticParams() {
    const articles = await getAllArticles();
    return articles.map((a) => ({
        asset: a.asset,
        slug: a.slug,
    }));
}

export default async function PlaybookArticle({
    params,
}: {
    params: { asset: string; slug: string };
}) {
    const article = await getArticleBySlug(params.asset, params.slug);

    if (!article) notFound();

    const { meta, content } = article;
    const mdxSource = await serialize(content);
    const toc = buildTocFromMdx(content);

    return (
        <PlaybookShell
            title={meta.title}
            summary={meta.description}
            currentSlug={meta.slug}
            allArticles={await getAllArticles()}
            toc={toc}
        >
            <MDXRenderer mdxSource={mdxSource} />
        </PlaybookShell>
    );
}
