"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function fmt(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

export function EmiCalculator() {
  const [principal, setPrincipal] = useState(300000);
  const [rate, setRate] = useState(7.5);
  const [years, setYears] = useState(30);

  const result = useMemo(() => {
    const r = (rate / 100) / 12;
    const n = years * 12;
    const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const interest = total - principal;
    return { emi, total, interest };
  }, [principal, rate, years]);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-white/90">Home loan EMI calculator</div>
          <div className="text-xs text-muted">Fixed-rate • Monthly payment</div>
        </div>
        <Badge>Free</Badge>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <label className="block">
            <div className="text-xs text-muted">Loan amount (USD)</div>
            <input className="mt-1 w-full rounded-xl border hairline bg-black/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/10"
              type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
          </label>
          <label className="block">
            <div className="text-xs text-muted">Interest rate (%)</div>
            <input className="mt-1 w-full rounded-xl border hairline bg-black/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/10"
              type="number" step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </label>
          <label className="block">
            <div className="text-xs text-muted">Term (years)</div>
            <input className="mt-1 w-full rounded-xl border hairline bg-black/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/10"
              type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </label>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border hairline bg-white/5 p-4">
            <div className="text-xs text-muted">Monthly EMI</div>
            <div className="mt-1 text-3xl font-semibold">${fmt(result.emi)}</div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border hairline bg-black/20 p-3">
                <div className="text-xs text-muted">Total paid</div>
                <div className="mt-1 font-medium">${fmt(result.total)}</div>
              </div>
              <div className="rounded-xl border hairline bg-black/20 p-3">
                <div className="text-xs text-muted">Total interest</div>
                <div className="mt-1 font-medium">${fmt(result.interest)}</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border hairline bg-white/5 p-4 text-sm text-white/75">
            In Pro, we can add prepayment modeling and INR/USD scenarios for India relocation planning.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
