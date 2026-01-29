import Link from "next/link";
import { CompoundInterestCalculator } from "@/components/calculators/compound-interest";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CompoundInterestPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Compound Interest</h1>
          <p className="text-muted max-w-prose">
            Estimate future value with monthly contributions. Includes an inflation-adjusted (“today’s dollars”) toggle.
          </p>
        </div>
        <Link className="btn btn-ghost" href="/toolkit">← Back</Link>
      </div>

      <CompoundInterestCalculator />

      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-white/90">How it’s calculated</div>
            <div className="text-xs text-muted">Plain-English explanation</div>
          </div>
          <Badge>Method</Badge>
        </CardHeader>
        <CardContent className="text-sm text-white/80 space-y-2">
          <p>
            This calculator assumes monthly compounding with a constant annual return rate.
            Your future value is the growth of your initial principal plus the growth of every monthly contribution.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="font-medium">Nominal</span> = future dollars (not adjusted for inflation).</li>
            <li><span className="font-medium">Inflation-adjusted</span> = converts the future value into “today’s dollars” using an assumed inflation rate.</li>
          </ul>
          <p className="text-muted">
            Real markets are volatile; this is a planning model, not a prediction engine.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
