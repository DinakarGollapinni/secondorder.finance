import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Pro() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Pro</h1>
        <p className="text-white/90 text-lg max-w-prose">
          Advanced decision systems for investors who want structure, memory, and repeatability across market cycles.
        </p>
        <p className="text-muted/80 text-sm max-w-prose">
          Pro extends SecondOrder beyond calculators — into persistent, regime-aware investment systems designed to enforce discipline over time.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white/90">Signal + Ladder</div>
              <div className="text-xs text-muted">Regime-aware allocation systems</div>
            </div>
            <Badge>Pro</Badge>
          </CardHeader>
          <CardContent className="text-sm text-white/80 space-y-2">
            <p>Translate market conditions into staged actions — when to add, pause, rebalance, or hold.</p>
            <p>Designed to reduce emotional decision-making during drawdowns and euphoric peaks.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white/90">Saved Portfolios</div>
              <div className="text-xs text-muted">Memory for your investment system</div>
            </div>
            <Badge>Pro</Badge>
          </CardHeader>
          <CardContent className="text-sm text-white/80">
            Persist allocations, risk preferences, cash buffers, and calculator presets — so decisions stay consistent over time, not reactive to headlines.
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="text-sm font-medium text-white/90">Why Pro exists</div>
        </CardHeader>
        <CardContent className="text-sm text-white/80 space-y-4">
          <p>Most investing mistakes happen when people forget their own rules.</p>
          <p>Pro adds persistence, structure, and system memory — so decisions remain consistent across stress, volatility, and regime shifts.</p>
          <p className="text-muted/90">Pro features will roll out gradually, with early access for users who want to help shape SecondOrder’s direction.</p>
          <div className="flex gap-3 pt-2">
            <Link href="/toolkit" className="btn btn-primary">Try Free Toolkit</Link>
            <Link href="/about" className="btn btn-ghost">Learn about Pro</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
