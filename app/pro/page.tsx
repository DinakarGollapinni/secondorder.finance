import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Pro() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Pro</h1>
        <p className="text-muted max-w-prose">
          Advanced tools that differentiate SecondOrder. This page is intentionally ready for Stripe + Auth gating.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white/90">Signal + Ladder</div>
              <div className="text-xs text-muted">Backtests, order checklists</div>
            </div>
            <Badge>Pro</Badge>
          </CardHeader>
          <CardContent className="text-sm text-white/80">
            Connects to your notebook strategy. Generates stage-based actions and review checklists.
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white/90">Saved portfolios</div>
              <div className="text-xs text-muted">Persistence + presets</div>
            </div>
            <Badge>Pro</Badge>
          </CardHeader>
          <CardContent className="text-sm text-white/80">
            Save allocations, risk preferences, cash buffer rules, and calculator presets.
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="text-sm font-medium text-white/90">Ready-to-monetize architecture</div>
          <div className="text-xs text-muted">Next: Auth + Stripe</div>
        </CardHeader>
        <CardContent className="text-sm text-white/80 space-y-2">
          <p>In v2, we’ll add Clerk (or Supabase) auth + Stripe subscriptions and gate Pro routes.</p>
          <div className="flex gap-3">
            <Link href="/about" className="btn btn-ghost">About</Link>
            <Link href="/toolkit" className="btn btn-primary">Try Free Toolkit</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
