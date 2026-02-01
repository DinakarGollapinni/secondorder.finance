import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AssetAccent } from "@/components/asset/AssetAccent";
import { EquityPurchasingPowerCard } from "@/components/signals/EquityPurchasingPowerCard";


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
            <span className="block text-white">SecondOrder</span>
            <span className="block mt-1 text-white/70 font-normal">An operating system for long‑term investors.</span>
          </h1>
          <p className="text-muted max-w-prose">
            Signals, ladders, calculators, and playbooks — built for tech-driven investors who want system-driven decision-making across market cycles.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/playbook" className="btn btn-primary">Explore Playbooks</Link>
            <Link href="/toolkit" className="btn btn-ghost">Try the Toolkit</Link>
          </div>
        </div>

        <EquityPurchasingPowerCard />
      </section>



      <section className="space-y-12 py-8">
        {/* Intro */}
        <div className="space-y-6">
          <p className="text-xl font-medium leading-relaxed text-white/90">
            SecondOrder is a structured environment for long-term investing:
          </p>
          <ul className="grid gap-6 md:grid-cols-3 text-base text-muted">
            <li className="space-y-1">
              <span className="block text-white/90 font-medium">Playbooks</span>
              <span className="block leading-relaxed">explain how assets behave across inflation, growth, stress, and liquidity regimes</span>
            </li>
            <li className="space-y-1">
              <span className="block text-white/90 font-medium">Toolkits</span>
              <span className="block leading-relaxed">provide practical calculators for compounding, drawdowns, and contribution planning</span>
            </li>
            <li className="space-y-1">
              <span className="block text-white/90 font-medium">Signals</span>
              <span className="block leading-relaxed">(coming) summarize market conditions without telling users what to trade</span>
            </li>
          </ul>
          <p className="text-base text-muted pt-2">Everything is designed to support measured, repeatable decisions.</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* How it's different */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">How it’s different</h3>
            <div className="text-sm font-medium text-white/80">Opinionated by design</div>

            <div className="space-y-5 text-sm text-muted">
              <div>
                <p className="mb-2">SecondOrder deliberately avoids:</p>
                <ul className="list-inside list-disc space-y-1 pl-1 marker:text-white/30">
                  <li>stock tips</li>
                  <li>short-term forecasts</li>
                  <li>sensational market commentary</li>
                </ul>
              </div>

              <div>
                <p className="mb-2">Instead, it emphasizes:</p>
                <ul className="list-inside list-disc space-y-1 pl-1 marker:text-white/30">
                  <li>regime awareness</li>
                  <li>diversification logic</li>
                  <li>second-order effects</li>
                </ul>
              </div>

              <p>This makes it especially useful for investors managing portfolios over 10–30 year horizons.</p>
            </div>
          </div>

          {/* Who this is for */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Who this is for</h3>
            <div className="space-y-5 text-sm text-muted mt-8">
              <div>
                <p className="mb-2">SecondOrder is built for investors who:</p>
                <ul className="list-inside list-disc space-y-1 pl-1 marker:text-white/30">
                  <li>invest across asset classes, not just equities</li>
                  <li>care about drawdowns as much as returns</li>
                  <li>want systems, not opinions</li>
                </ul>
              </div>

              <div>
                <p className="mb-2">Typical users include:</p>
                <ul className="list-inside list-disc space-y-1 pl-1 marker:text-white/30">
                  <li>long-term ETF investors</li>
                  <li>engineers and analytical professionals</li>
                  <li>global investors dealing with currency and regime risk</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Equity", href: "/asset-classes/equity", desc: "Core growth engine, breadth.", accent: "hsl(210 100% 68%)", },
          { title: "Gold", href: "/asset-classes/gold", desc: "Hedge, liquidity, regime shifts.", accent: "hsl(45 100% 65%)", },
          { title: "Crypto", href: "/asset-classes/crypto", desc: "Volatility, sizing, cycles.", accent: "hsl(180 100% 68%)", },
          { title: "REITs", href: "/asset-classes/reits", desc: "Rates sensitivity, income.", accent: "hsl(270 95% 72%)", },
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
    </div >
  );
}
