import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProAccessForm } from "@/components/pro-access-form";

export default function Pro() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 py-8">
      {/* Hero Section */}
      <header className="space-y-4 text-center">
        <div className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent border border-accent/20">
          Coming Soon
        </div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">SecondOrder Pro</h1>
        <p className="mx-auto max-w-2xl text-lg text-white/70">
          Advanced decision systems for investors who want structure, memory, and repeatability across market cycles.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:items-center">
        {/* Features List */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-medium text-white/90">What’s included</h2>
            <p className="text-sm text-muted">Pro extends SecondOrder beyond calculators into persistent, regime-aware investment systems.</p>
          </div>

          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="flex-none h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-white/90">Rules-Based Backtests</div>
                <p className="text-sm text-muted/80">Evaluate allocation frameworks across historical regimes and stress environments.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-none h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-white/90">Regime Dashboards</div>
                <p className="text-sm text-muted/80">Read-only indicators that summarize market conditions and risk regimes.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-none h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-white/90">Portfolio Tooling</div>
                <p className="text-sm text-muted/80">Persist allocations, risk preferences, and calculator presets.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Access Form */}
        <Card className="glass accent-glow border-accent/10">
          <CardHeader>
            <div className="space-y-1">
              <h2 className="text-lg font-medium text-white/90">Request Early Access</h2>
              <p className="text-sm text-muted">Join the waitlist to help shape SecondOrder&apos;s direction.</p>
            </div>
          </CardHeader>
          <CardContent>
            <ProAccessForm />
          </CardContent>
        </Card>
      </div>

      {/* Why Pro exists */}
      <div className="mx-auto max-w-2xl text-center space-y-4">
        <h3 className="text-lg font-medium text-white/90">Why Pro exists</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Most investing mistakes happen when people forget their own rules.
          Pro adds persistence, structure, and system memory — so decisions remain consistent across stress, volatility, and regime shifts.
        </p>
        <div className="pt-4">
          <Link
            href="/playbook/system-design/policy-engine"
            className="text-xs font-medium text-accent hover:text-accent/80 transition-colors underline underline-offset-4 decoration-accent/20"
          >
            Learn how the Policy Engine works →
          </Link>
        </div>
      </div>
    </div>
  );
}
