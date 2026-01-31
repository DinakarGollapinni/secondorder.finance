import Link from "next/link";
import { notFound } from "next/navigation";
import { AssetAccent } from "@/components/asset/AssetAccent";


const ASSETS = {
  gold: {
    name: "Gold",
    accent: "hsl(43 95% 58%)", // warm amber
    tagline: "Insurance, liquidity, regime hedge.",
    description:
      "Gold is treated as a stability and purchasing-power asset. This hub groups frameworks, tools, and (soon) signals.",
    playbook: [
      { slug: "gold", title: "Gold in a Long-Term Portfolio", blurb: "Why gold acts as insurance, not growth." },
    ],
    tools: [
      { href: "/toolkit/compound-interest", title: "Compound Interest", blurb: "Growth math + inflation-adjusted view." },
      { href: "/toolkit/emi", title: "Home Loan EMI", blurb: "Payment schedule, principal vs interest." },
    ],
  },
  crypto: {
    name: "Crypto",
    accent: "hsl(190 95% 55%)", // electric cyan
    tagline: "Volatility sleeve, asymmetric optionality.",
    description:
      "Crypto is treated as a high-volatility sleeve with position sizing and rebalancing rules. This hub groups frameworks and tools.",
    playbook: [
      { slug: "crypto", title: "Crypto as a Volatility Sleeve", blurb: "Sizing, rebalancing, and common failure modes." },
    ],
    tools: [
      { href: "/toolkit/compound-interest", title: "Compound Interest", blurb: "Estimate long-term compounding scenarios." },
    ],
  },
  equity: {
    name: "Equity",
    accent: "hsl(210 90% 60%)", // calm blue
    tagline: "Core growth engine, breadth, valuation.",
    description:
      "Equities are the primary growth engine. This hub collects core allocation frameworks, valuation context, and risk controls.",
    playbook: [
      { slug: "equity", title: "Equity Core: Own the Economy", blurb: "Why broad index ownership wins over time." },
    ],
    tools: [
      { href: "/toolkit/compound-interest", title: "Compound Interest", blurb: "DCA scenarios + inflation-adjusted outcomes." },
    ],
  },
  reits: {
    name: "REITs",
    accent: "hsl(270 85% 65%)", // violet
    tagline: "Rate sensitivity, income, real assets.",
    description:
      "REITs behave like a hybrid of equities and rates. This hub tracks rate regimes, yields, and allocation frameworks.",
    playbook: [
      { slug: "reits", title: "REITs: Rates + Real Assets", blurb: "Where REITs fit and when they struggle." },
    ],
    tools: [
      { href: "/toolkit/emi", title: "Home Loan EMI", blurb: "Mortgage math and payment schedules." },
    ],
  },
} as const;

type AssetSlug = keyof typeof ASSETS;

function Card({
  title,
  blurb,
  href,
  badge,
  accentColor,
}: {
  title: string;
  blurb: string;
  href: string;
  badge?: string;
  accentColor?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.06]"
    >
      {accentColor ? <AssetAccent color={accentColor} /> : null}

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-base font-semibold text-white">{title}</div>
            <div className="mt-1 text-sm text-white/70">{blurb}</div>
          </div>

          {badge ? (
            <div className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
              {badge}
            </div>
          ) : null}
        </div>

        <div className="mt-4 text-sm text-white/60 group-hover:text-white/80">
          Open →
        </div>
      </div>
    </Link>
  );
}


export default function AssetHubPage({ params }: { params: { slug: string } }) {
  const slug = params.slug as AssetSlug;
  const asset = ASSETS[slug];

  if (!asset) return notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
      {/* Hero */}
      <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 overflow-hidden">
        <AssetAccent color={asset.accent} />

        <div className="relative">
            <div className="text-xs uppercase tracking-widest text-white/60">
            Asset Class Hub
            </div>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
            {asset.name}
            </h1>

            <p className="mt-2 text-lg text-white/70">
            {asset.tagline}
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70">
            {asset.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
            <Link
                href="/playbook"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
            >
                Browse Playbook
            </Link>

            <Link
                href="/toolkit"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
            >
                Open Toolkit
            </Link>
            </div>
        </div>
       </div>


      {/* Sections */}
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Playbook */}
        <section className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-white">Frameworks (Playbook)</h2>
          <p className="mt-1 text-sm text-white/60">
            Articles that explain how this asset behaves across regimes, and how
            it fits into a long-term portfolio.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {asset.playbook.map((a) => (
                <Card
                    key={a.slug}
                    title={a.title}
                    blurb={a.blurb}
                    href={`/playbook/${a.slug}`}
                    badge="Playbook"
                    accentColor={asset.accent}
                />
            ))}

          </div>
        </section>

        {/* Tools + Coming soon */}
        <section className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-white">Tools (Toolkit)</h2>
            <p className="mt-1 text-sm text-white/60">
              Practical calculators and utilities.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4">
              {asset.tools.map((t) => (
                <Card
                    key={t.href}
                    title={t.title}
                    blurb={t.blurb}
                    href={t.href}
                    badge="Tool"
                    accentColor={asset.accent}
                />
              ))}

            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">Signals</h2>
            <p className="mt-1 text-sm text-white/60">
              Coming soon: simple regime indicators and risk context.
            </p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-sm font-medium text-white/80">
                Placeholder
              </div>
              <div className="mt-2 text-sm text-white/60">
                We’ll add: real rates, trend, volatility, and positioning summaries.
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">News</h2>
            <p className="mt-1 text-sm text-white/60">
              Coming soon: curated headlines with context.
            </p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-sm font-medium text-white/80">
                Placeholder
              </div>
              <div className="mt-2 text-sm text-white/60">
                We’ll add: a small feed + your “SecondOrder take” per headline.
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
