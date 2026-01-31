import { notFound } from "next/navigation";
import Link from "next/link";
import { playbookIndex } from "@/content/playbook/index";

export default function AssetClassPage({ params }: { params: { slug: string } }) {
  const slug = params.slug.toLowerCase();

  const map: Record<string, string> = {
    gold: "Gold",
    crypto: "Crypto",
    equity: "Equity",
    reits: "REITs",
  };

  const category = map[slug];
  if (!category) return notFound();

  const articles = playbookIndex.filter((a) => a.category === category);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-semibold tracking-tight">{category}</h1>
      <p className="mt-3 text-white/70">
        A curated set of frameworks and tools for {category}.
      </p>

      <div className="mt-8 space-y-4">
        {articles.map((a) => (
          <Link key={a.slug} href={`/playbook/${a.slug}`} className="block text-white/85 hover:text-white">
            → {a.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
