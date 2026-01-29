import Link from "next/link";
import { EmiCalculator } from "@/components/calculators/emi";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function EmiPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Home Loan EMI</h1>
          <p className="text-muted max-w-prose">
            Monthly payment calculator for a fixed-rate loan.
          </p>
        </div>
        <Link className="btn btn-ghost" href="/toolkit">← Back</Link>
      </div>

      <EmiCalculator />

      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-white/90">How it’s calculated</div>
            <div className="text-xs text-muted">Fixed-rate amortization model</div>
          </div>
          <Badge>Method</Badge>
        </CardHeader>
        <CardContent className="text-sm text-white/80 space-y-2">
          <p>
            EMI is computed using the standard fixed-rate loan formula with monthly interest.
            It assumes the interest rate and payment stay constant for the entire term.
          </p>
          <p className="text-muted">
            In a later version, we can add prepayment modeling (extra payments) and INR/USD planning for India relocation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
