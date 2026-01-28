import { CompoundInterestCalculator } from "@/components/calculators/compound-interest";
import { EmiCalculator } from "@/components/calculators/emi";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Toolkit() {
  return (
    <div className="grid gap-8 md:grid-cols-[260px_1fr]">
      <aside className="glass rounded-2xl shadow-soft p-4 md:sticky md:top-[88px] md:h-[calc(100vh-120px)] md:overflow-auto">
        <div className="flex items-center justify-between pb-3">
          <div className="text-sm font-semibold">Toolkit</div>
          <Badge>Free</Badge>
        </div>
        <div className="space-y-1">
          <a className="block rounded-xl px-3 py-2 text-sm text-white/85 hover:bg-white/5" href="#compound">Compound interest</a>
          <a className="block rounded-xl px-3 py-2 text-sm text-white/85 hover:bg-white/5" href="#emi">Home loan EMI</a>
          <div className="pt-3 pb-1 text-xs uppercase tracking-wider text-muted">Pro Lab</div>
          <Link className="block rounded-xl px-3 py-2 text-sm text-white/85 hover:bg-white/5" href="/pro">Advanced tools (locked)</Link>
        </div>
      </aside>

      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Toolkit</h1>
          <p className="text-muted max-w-prose">
            Fast calculators & sanity checks. Free tools stay free; Pro tools are where SecondOrder differentiates.
          </p>
        </header>

        <section id="compound" className="scroll-mt-24">
          <CompoundInterestCalculator />
        </section>

        <section id="emi" className="scroll-mt-24">
          <EmiCalculator />
        </section>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white/90">Unlock advanced calculators</div>
              <div className="text-xs text-muted">Designed for high-income tech employees</div>
            </div>
            <Badge>Pro</Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-white/80">
              Regime-aware DCA, ladder backtests, and saved portfolios — coming next.
            </div>
            <Link href="/pro" className="btn btn-primary">See Pro</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
