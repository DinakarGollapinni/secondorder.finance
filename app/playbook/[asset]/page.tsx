import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { AssetAccent } from "@/components/asset/AssetAccent";
import { getArticlesByAsset } from "@/lib/playbook";

const categoryColors: Record<string, string> = {
    metals: "hsl(45 100% 65%)",
    crypto: "hsl(180 100% 68%)",
    equity: "hsl(210 100% 68%)",
    reits: "hsl(270 95% 72%)",
    "system-design": "hsl(150 100% 65%)",
};

export async function generateStaticParams() {
    return [
        { asset: "metals" },
        { asset: "equity" },
        { asset: "crypto" },
        { asset: "reits" },
        { asset: "system-design" },
    ];
}

export default async function AssetPlaybookPage({
    params,
}: {
    params: { asset: string };
}) {
    const articles = await getArticlesByAsset(params.asset);

    if (articles.length === 0) {
        // If we have no articles, but it's a valid asset category, we might still show an empty state 
        // or 404 if it's not a known asset.
        const validAssets = ["metals", "equity", "crypto", "reits", "system-design"];
        if (!validAssets.includes(params.asset)) notFound();
    }

    const assetName = params.asset.charAt(0).toUpperCase() + params.asset.slice(1);

    const lensGroup = (lens?: string) => {
        const key = (lens || "").toLowerCase();
        if (["valuations", "valuation", "risk"].includes(key)) return "valuation-risk";
        if (["regime", "stress"].includes(key)) return "regimes-stress";
        return "foundations";
    };

    const tagGroup = (tags: string[]) => {
        const set = new Set(tags.map((t) => t.toLowerCase()));
        if (set.has("regimes") || set.has("drawdowns") || set.has("stress")) return "regimes-stress";
        if (set.has("valuation") || set.has("valuations") || set.has("risk")) return "valuation-risk";
        return "foundations";
    };

    const getGroup = (article: typeof articles[number]) => {
        if (article.lens) return lensGroup(article.lens);
        if (article.tags && article.tags.length > 0) return tagGroup(article.tags);
        return "foundations";
    };

    const groups = [
        { id: "foundations", label: "Foundations" },
        { id: "valuation-risk", label: "Valuation & Risk" },
        { id: "regimes-stress", label: "Regimes & Stress" },
    ].map((group) => ({
        ...group,
        items: articles.filter((a) => getGroup(a) === group.id),
    })).filter((group) => group.items.length > 0);

    return (
        <main className="mx-auto max-w-6xl px-6 py-12">
            <div className="mb-10">
                <Link
                    href="/playbook"
                    className="text-xs font-medium text-white/40 hover:text-white/60 uppercase tracking-widest mb-4 inline-block"
                >
                    ← All Playbooks
                </Link>
                <h1 className="text-4xl font-semibold tracking-tight">{assetName} Playbook</h1>
                <p className="mt-3 text-white/70">
                    Core frameworks and systems for {params.asset} allocation and behavior.
                </p>
            </div>

            <div className="space-y-10">
                {groups.map((group, index) => (
                    <section
                        key={group.id}
                        className={[
                            "space-y-4",
                            index === 0 ? "" : "border-t border-white/10 pt-6",
                        ].join(" ")}
                    >
                        <div className="text-xs font-bold tracking-widest text-white/40 uppercase">
                            {group.label}
                        </div>
                        <div className="grid gap-5 md:grid-cols-2">
                            {group.items.map((a) => (
                                <Link key={a.slug} href={`/playbook/${a.asset}/${a.slug}`} className="block group">
                                    <Card className="relative h-full overflow-hidden transition hover:border-white/20 hover:bg-white/5">
                                        {/* Accent overlay */}
                                        <div className="pointer-events-none absolute inset-0">
                                            <AssetAccent color={categoryColors[a.asset] || "#888888"} />
                                        </div>

                                        {/* Content */}
                                        <CardContent className="relative p-6">
                                            <div className="text-xs uppercase tracking-wider text-white/50">
                                                {a.asset}
                                            </div>
                                            <div className="mt-2 text-lg font-semibold">{a.title}</div>
                                            <div className="mt-2 text-white/70">{a.description}</div>
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
                ))}
            </div>
        </main>
    );
}
