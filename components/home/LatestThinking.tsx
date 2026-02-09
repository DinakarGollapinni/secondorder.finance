import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { AssetAccent } from "@/components/asset/AssetAccent";
import { getAllArticles } from "@/lib/playbook";

const categoryColors: Record<string, string> = {
    metals: "hsl(45 100% 65%)",
    crypto: "hsl(180 100% 68%)",
    equity: "hsl(210 100% 68%)",
    reits: "hsl(270 95% 72%)",
    "system-design": "hsl(150 100% 65%)",
};

export async function LatestThinking() {
    const articles = await getAllArticles();

    const latestArticles = [...articles]
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
        .slice(0, 3);

    if (latestArticles.length === 0) return null;

    return (
        <section className="space-y-4">
            <div className="space-y-1">
                <div className="text-xs font-bold tracking-widest text-white/40 uppercase">Latest Thinking</div>
                <div className="text-[11px] text-white/50">Frameworks that explain the current signals</div>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
                {latestArticles.map((a) => (
                    <Link key={a.slug} href={`/playbook/${a.asset}/${a.slug}`} className="block group">
                        <Card className="relative h-full overflow-hidden transition hover:border-white/20 hover:bg-white/5">
                            <div className="pointer-events-none absolute inset-0">
                                <AssetAccent color={categoryColors[a.asset] || "#888888"} />
                            </div>
                            <CardContent className="relative p-6">
                                <div className="text-xs uppercase tracking-wider text-white/50">
                                    {a.asset}
                                </div>
                                <div className="mt-2 text-lg font-semibold">{a.title}</div>
                                <div className="mt-2 text-white/70 line-clamp-1">{a.description}</div>
                                <div className="mt-4 flex items-center gap-3 text-[10px] font-medium text-white/40 uppercase tracking-widest">
                                    <span>{a.level}</span>
                                    {a.lens && (
                                        <>
                                            <span>•</span>
                                            <span className="text-primary">{a.lens}</span>
                                        </>
                                    )}
                                    <span>•</span>
                                    <span>{a.readingTime} min read</span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    );
}
