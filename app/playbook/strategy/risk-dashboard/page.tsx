import { PlaybookShell } from "@/components/playbook-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RiskDashboard() {
  return (
    <PlaybookShell title="Risk Dashboard">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-white/90">Concept</div>
            <div className="text-xs text-muted">Technicals + fundamentals → one calm score</div>
          </div>
          <Badge>Coming soon</Badge>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-white/80">
          <p>
            The dashboard turns multiple signals into a single “regime” suggestion — not a prediction.
            It’s designed to reduce decision fatigue.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Technical stress (drawdowns, breadth, volatility)</li>
            <li>Fundamentals (valuation proxies, earnings, rates)</li>
            <li>Action mapping (DCA speed, cash buffer, ladder stages)</li>
          </ul>
        </CardContent>
      </Card>
    </PlaybookShell>
  );
}
