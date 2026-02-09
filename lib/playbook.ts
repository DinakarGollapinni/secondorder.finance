import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

const playbookDir = path.join(process.cwd(), "content/playbook");

// 1. Define Metadata Schema
export const ArticleMetaSchema = z.object({
    title: z.string(),
    description: z.string(),
    asset: z.enum(["metals", "equity", "crypto", "reits", "system-design"]),
    status: z.enum(["published", "draft"]).default("published"),
    order: z.number().default(999),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    featured: z.boolean().default(false),
    toc: z.boolean().default(true),
    level: z.enum(["foundation", "intermediate", "advanced"]).default("foundation"),
    canonical: z.string().optional(),
    tags: z.array(z.string()).default([]),
    upstream: z.object({ asset: z.string(), slug: z.string(), label: z.string().optional() }).optional(),
    downstream: z.object({ asset: z.string(), slug: z.string(), label: z.string().optional() }).optional(),
    related: z.array(z.object({ asset: z.string(), slug: z.string() })).default([]),
    lens: z.string().optional(),
});

export type ArticleMeta = z.infer<typeof ArticleMetaSchema> & {
    slug: string;
    readingTime: number;
};

// 2. Helper to compute reading time
function computeReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
}

// 3. Central Loader
export async function getAllArticles(): Promise<ArticleMeta[]> {
    if (!fs.existsSync(playbookDir)) return [];

    const files = fs.readdirSync(playbookDir, { recursive: true }) as string[];
    const articles: ArticleMeta[] = [];

    for (const file of files) {
        if (file.endsWith("index.mdx")) {
            const filePath = path.join(playbookDir, file);
            const raw = fs.readFileSync(filePath, "utf8");
            const { data, content } = matter(raw);

            // Slug is the directory name containing index.mdx
            const slug = path.basename(path.dirname(file));

            try {
                const meta = ArticleMetaSchema.parse(data);

                // Filter drafts in production
                if (process.env.NODE_ENV === "production" && meta.status === "draft") {
                    continue;
                }

                articles.push({
                    ...meta,
                    slug,
                    readingTime: computeReadingTime(content),
                });
            } catch (e) {
                console.error(`Invalid metadata in ${file}:`, e);
            }
        }
    }

    // 4. Deterministic Sorting: order -> publishedAt -> title
    return articles.sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order;
        if (a.publishedAt !== b.publishedAt) return b.publishedAt.localeCompare(a.publishedAt);
        return a.title.localeCompare(b.title);
    });
}

export async function getArticlesByAsset(asset: string): Promise<ArticleMeta[]> {
    const all = await getAllArticles();
    return all.filter((a) => a.asset === asset);
}

export async function getArticleBySlug(asset: string, slug: string) {
    const filePath = path.join(playbookDir, asset, slug, "index.mdx");
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    try {
        const meta = ArticleMetaSchema.parse(data);

        // Draft check
        if (process.env.NODE_ENV === "production" && meta.status === "draft") {
            return null;
        }

        return {
            meta: {
                ...meta,
                slug,
                readingTime: computeReadingTime(content),
            },
            content,
        };
    } catch (e) {
        console.error(`Invalid metadata in ${asset}/${slug}:`, e);
        return null;
    }
}
