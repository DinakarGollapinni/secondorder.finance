import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AssetAccent } from "@/components/asset/AssetAccent";


function MiniChart() {
  return (
    <div className="h-16 w-full rounded-xl bg-white/5 border hairline flex items-end gap-1 p-2">
      {[20, 30, 18, 40, 28, 55, 42, 62, 50, 70].map((h, i) => (
        <div key={i} className="w-full rounded-sm bg-white/25" style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <Badge>Calm systems • Long-term investing</Badge>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            SecondOrder — an <span className="text-white/90">operating system</span> for long‑term investors.
          </h1>
          <p className="text-muted max-w-prose">
            Signals, ladders, calculators, and playbooks — built for tech-driven investors who want calm decision-making across market cycles.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/playbook" className="btn btn-primary">Explore Playbook</Link>
            <Link href="/toolkit" className="btn btn-ghost">Try the Toolkit</Link>
            <span className="kbd hidden sm:inline-flex">Pro tools gated • Stripe-ready</span>
          </div>
        </div>

        <Card className="overflow-hidden accent-glow">
          <CardHeader className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white/90">SecondOrder Signals</div>
              <div className="text-xs text-muted">Snapshot</div>
            </div>
            <Badge>Risk Regime: Neutral</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border hairline bg-white/5 p-4">
                <div className="text-xs text-muted">Equity Drawdown</div>
                <div className="mt-1 text-2xl font-semibold">-4.2%</div>
                <div className="mt-3"><MiniChart /></div>
              </div>
              <div className="rounded-2xl border hairline bg-white/5 p-4">
                <div className="text-xs text-muted">Suggested Action</div>
                <div className="mt-1 text-sm font-medium text-white/90">Keep DCA, build cash buffer</div>
                <div className="mt-3 space-y-2 text-xs text-muted">
                  <div className="flex justify-between"><span>Volatility</span><span>Moderate</span></div>
                  <div className="flex justify-between"><span>Breadth</span><span>Normal</span></div>
                  <div className="flex justify-between"><span>Valuation</span><span>Elevated</span></div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border hairline bg-white/5 p-4">
              <div className="text-xs text-muted">What this is</div>
              <div className="mt-1 text-sm text-white/80">
                A calm dashboard + playbook. Start simple, drill down only when needed.
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Equity", href: "/asset-classes/equity", desc: "Core growth engine, breadth.", accent: "hsl(210 90% 60%)", },
          { title: "Gold", href: "/asset-classes/gold", desc: "Hedge, liquidity, regime shifts.", accent: "hsl(43 95% 58%)", },
          { title: "Crypto", href: "/asset-classes/crypto", desc: "Volatility, sizing, cycles.", accent: "hsl(190 95% 55%)", },
          { title: "REITs", href: "/asset-classes/reits", desc: "Rates sensitivity, income.", accent: "hsl(270 85% 65%)", },
        ].map((c) => (
          <Link key={c.title} href={c.href} className="block group">
            <Card className="relative h-full overflow-hidden transition hover:translate-y-[-1px] hover:bg-white/5">
              {/* Accent overlay */}
              <div className="pointer-events-none absolute inset-0">
                <AssetAccent color={c.accent} />
              </div>

              {/* Content */}
              <CardContent className="relative pt-5">
                <div className="text-base font-semibold">{c.title}</div>
                <div className="mt-1 text-sm text-muted">{c.desc}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="text-sm font-medium text-white/90">Toolkit (Free)</div>
            <div className="text-xs text-muted">Fast calculators & checklists</div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border hairline bg-white/5 p-3">
              <div>
                <div className="text-sm font-medium">Compound interest</div>
                <div className="text-xs text-muted">Estimate future value with contributions</div>
              </div>
              <Link className="btn btn-ghost" href="/toolkit">Open</Link>
            </div>
            <div className="flex items-center justify-between rounded-xl border hairline bg-white/5 p-3">
              <div>
                <div className="text-sm font-medium">Home loan EMI</div>
                <div className="text-xs text-muted">Monthly payment + amortization</div>
              </div>
              <Link className="btn btn-ghost" href="/toolkit">Open</Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="text-sm font-medium text-white/90">Pro Lab</div>
            <div className="text-xs text-muted">Differentiators (gated)</div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl border hairline bg-white/5 p-4">
              <div className="text-sm font-medium">Regime-aware DCA</div>
              <div className="text-xs text-muted mt-1">Adjust contributions based on fundamentals + technical risk.</div>
            </div>
            <div className="rounded-xl border hairline bg-white/5 p-4">
              <div className="text-sm font-medium">Signal + Ladder backtest</div>
              <div className="text-xs text-muted mt-1">Simulate “sell in stages, buy back later” across 2020/2022.</div>
            </div>
            <div className="flex gap-3 pt-1">
              <Link href="/pro" className="btn btn-primary">See Pro</Link>
              <span className="text-xs text-muted self-center">Stripe + Auth ready</span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
