import { PlaybookShell } from "@/components/ui/playbook-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DCA() {
  return (
    <PlaybookShell title="DCA Systems">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-white/90">DCA</div>
            <div className="text-xs text-muted">Default strategy with optional risk-aware tweaks</div>
          </div>
          <Badge>Playbook</Badge>
        </CardHeader>
        <CardContent className="text-sm text-white/80 space-y-2">
          <p>
            The default is simple: invest on a schedule into broad diversified funds.
            SecondOrder adds optional “guardrails” so you don’t overreact during cycles.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Base DCA (always on)</li>
            <li>Reduced DCA (when risk is high)</li>
            <li>Opportunity buffer (cash/T-bills) for drawdowns</li>
          </ul>
        </CardContent>
      </Card>
    </PlaybookShell>
  );
}
