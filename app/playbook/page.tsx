import Link from "next/link";
import { playbookIndex } from "@/content/playbook/index";
import { Card, CardContent } from "@/components/ui/card";
import { AssetAccent } from "@/components/asset/AssetAccent";

const categoryColors: Record<string, string> = {
  Gold: "hsl(43 95% 58%)",
  Crypto: "hsl(190 95% 55%)",
  Equity: "hsl(210 90% 60%)",
  REITs: "hsl(270 85% 65%)",
};

const ORDER = ["Equity", "Gold", "Crypto", "REITs"];

export default function PlaybookIndexPage() {
  const sortedArticles = [...playbookIndex].sort((a, b) => {
    return ORDER.indexOf(a.category) - ORDER.indexOf(b.category);
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight">Playbook</h1>
        <p className="mt-3 text-white/70">
          Systems-level thinking across asset classes. Not advice — frameworks.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {sortedArticles.map((a) => (
          <Link key={a.slug} href={`/playbook/${a.slug}`} className="block group">
            <Card className="relative h-full overflow-hidden transition hover:border-white/20 hover:bg-white/5">
              {/* Accent overlay */}
              <div className="pointer-events-none absolute inset-0">
                <AssetAccent color={categoryColors[a.category] || "#888888"} />
              </div>

              <CardContent className="relative p-6">
                <div className="text-xs uppercase tracking-wider text-white/50">
                  {a.category}
                </div>
                <div className="mt-2 text-lg font-semibold">{a.title}</div>
                <div className="mt-2 text-white/70">{a.description}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
