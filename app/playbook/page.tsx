import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { AssetAccent } from "@/components/asset/AssetAccent";

const assets = [
  { id: "equity", title: "Equity", desc: "Core growth engine, breadth." },
  { id: "metals", title: "Metals", desc: "Hedge, liquidity, regime shifts." },
  { id: "crypto", title: "Crypto", desc: "Volatility, sizing, cycles." },
  { id: "reits", title: "REITs", desc: "Rates sensitivity, income." },
  { id: "system-design", title: "System Design", desc: "Architecture, policy engines, and regimes." }
];

const categoryColors: Record<string, string> = {
  metals: "hsl(45 100% 65%)",
  crypto: "hsl(180 100% 68%)",
  equity: "hsl(210 100% 68%)",
  reits: "hsl(270 95% 72%)",
  "system-design": "hsl(150 100% 65%)",
};

export default function PlaybookIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">Playbook</h1>
        <p className="mt-3 text-white/70">
          Systems-level thinking across asset classes. Not advice — frameworks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {assets.map((a) => (
          <Link key={a.id} href={`/playbook/${a.id}`} className="block group">
            <Card className="relative h-48 overflow-hidden transition hover:border-white/20 hover:bg-white/5">
              {/* Accent overlay */}
              <div className="pointer-events-none absolute inset-0">
                <AssetAccent color={categoryColors[a.id] || "#888888"} />
              </div>

              <CardContent className="relative flex h-full flex-col justify-center p-8">
                <div className="text-2xl font-semibold">{a.title}</div>
                <div className="mt-2 text-white/70">{a.desc}</div>
                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-white/40 uppercase tracking-widest group-hover:text-white/60 transition">
                  Explore Frameworks →
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
