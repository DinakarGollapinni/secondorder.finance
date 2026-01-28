import { PlaybookShell } from "@/components/playbook-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Ladder() {
  return (
    <PlaybookShell title="Ladder Sell/Buyback">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-white/90">Ladder</div>
            <div className="text-xs text-muted">Stage exits + staged re-entries</div>
          </div>
          <Badge>Pro</Badge>
        </CardHeader>
        <CardContent className="text-sm text-white/80 space-y-2">
          <p>
            The ladder is a rules-based approach: sell a small portion at predefined drawdowns and
            buy back in stages. It’s meant to reduce panic and avoid “all-in/all-out” timing.
          </p>
          <p className="text-muted">
            In Pro, this connects to your notebook/backtests and generates order checklists.
          </p>
        </CardContent>
      </Card>
    </PlaybookShell>
  );
}
