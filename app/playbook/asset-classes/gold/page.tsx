import { PlaybookShell } from "@/components/playbook-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function InlineChart() {
  return (
    <div className="h-40 rounded-2xl border hairline bg-white/5 p-4 flex flex-col gap-3">
      <div className="text-xs text-muted">Illustrative trend</div>
      <div className="flex-1 rounded-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10" />
      <div className="text-[11px] text-muted">Replace with real charts later (Recharts).</div>
    </div>
  );
}

export default function Page() {
  return (
    <PlaybookShell title="Gold">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white/90">Role in Portfolio</div>
                <div className="text-xs text-muted">Plain-English framing</div>
              </div>
              <Badge>Playbook</Badge>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm text-white/80 space-y-1">
              <li>A portfolio stabilizer when confidence in paper assets falls.</li>
              <li>A hedge against extreme regimes (liquidity crises, inflation shocks).</li>
              <li>Often uncorrelated in stress — but not always.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-sm font-medium text-white/90">When it shines</div>
              <div className="text-xs text-muted">Market environments</div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm text-white/80 space-y-1">
              <li>Real yields falling or inflation uncertainty rising.</li>
              <li>Risk-off periods where investors want liquidity + hard assets.</li>
              <li>When equity concentration risk is high.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-sm font-medium text-white/90">Risks</div>
              <div className="text-xs text-muted">What can go wrong</div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm text-white/80 space-y-1">
              <li>Can underperform long stretches during equity bull markets.</li>
              <li>Sensitive to real rates and USD strength.</li>
              <li>Over-allocation can cap long-run growth.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <InlineChart />
          <div className="rounded-2xl border hairline bg-white/5 p-4">
            <div className="text-sm font-semibold">How SecondOrder uses this</div>
            <p className="mt-2 text-sm text-white/80">
              Use Gold as a <span className="font-medium">system component</span>, not a prediction tool.
              Size it, rebalance it, and treat it as part of a portfolio operating system.
            </p>
          </div>
        </div>
      </div>
    </PlaybookShell>
  );
}
