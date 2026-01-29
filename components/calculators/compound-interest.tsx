"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function fmt(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

// FV with contributions (monthly), compounded monthly.
export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [monthly, setMonthly] = useState(1000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [inflationAdjusted, setInflationAdjusted] = useState(false);
  const [inflationRate, setInflationRate] = useState(3);


  const result = useMemo(() => {
  const r = (rate / 100) / 12;
  const n = years * 12;

  const fvPrincipal = principal * Math.pow(1 + r, n);
  const fvContrib = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r);
  const fv = fvPrincipal + fvContrib;

  const invested = principal + monthly * n;
  const gain = fv - invested;

  // Inflation adjustment (convert future dollars into today's dollars)
  const inf = (inflationRate / 100);
  const realFv = fv / Math.pow(1 + inf, years);

  return { fv, invested, gain, realFv };
}, [principal, monthly, rate, years, inflationRate]);


  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-white/90">Compound interest calculator</div>
          <div className="text-xs text-muted">Monthly contributions • Monthly compounding</div>
        </div>
        <Badge>Free</Badge>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <label className="block">
            <div className="text-xs text-muted">Initial investment (USD)</div>
            <input className="mt-1 w-full rounded-xl border hairline bg-black/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/10"
              type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
          </label>

          <label className="block">
            <div className="text-xs text-muted">Monthly contribution (USD)</div>
            <input className="mt-1 w-full rounded-xl border hairline bg-black/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/10"
              type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} />
          </label>

          <label className="block">
            <div className="text-xs text-muted">Annual return (%)</div>
            <input className="mt-1 w-full rounded-xl border hairline bg-black/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/10"
              type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </label>

          <label className="block">
            <div className="text-xs text-muted">Years</div>
            <input className="mt-1 w-full rounded-xl border hairline bg-black/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/10"
              type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </label>

          <label className="block">
              <div className="text-xs text-muted">Inflation-adjusted view</div>

              <div className="mt-2 inline-flex rounded-2xl border hairline bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setInflationAdjusted(false)}
                  className={[
                    "px-3 py-1.5 text-xs rounded-xl transition",
                    inflationAdjusted ? "text-white/70 hover:text-white/90" : "bg-white/10 text-white",
                  ].join(" ")}
                >
                  Nominal
                </button>

                <button
                  type="button"
                  onClick={() => setInflationAdjusted(true)}
                  className={[
                    "px-3 py-1.5 text-xs rounded-xl transition",
                    inflationAdjusted ? "bg-white/10 text-white" : "text-white/70 hover:text-white/90",
                  ].join(" ")}
                >
                  Today&#39;s dollars
                </button>
              </div>

              <div className="mt-2 text-xs text-muted">
                {inflationAdjusted
                  ? "Showing value adjusted for inflation (today’s purchasing power)."
                  : "Showing nominal future dollars (not inflation-adjusted)."}
              </div>
           </label>


          {inflationAdjusted && (
            <div className="mt-2">
              <label className="block">
                <div className="text-xs text-muted">Assumed inflation (%)</div>
                <input
                  className="mt-1 w-full rounded-xl border hairline bg-black/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/10"
                  type="number"
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                />
              </label>
            </div>
          )}

        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border hairline bg-white/5 p-4">
            <div className="text-xs text-muted">
              {inflationAdjusted ? "Future value (today’s dollars)" : "Future value (nominal)"}
            </div>
            <div className="mt-1 text-3xl font-semibold">
              ${fmt(inflationAdjusted ? result.realFv : result.fv)}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border hairline bg-black/20 p-3">
                <div className="text-xs text-muted">Total invested</div>
                <div className="mt-1 font-medium">${fmt(result.invested)}</div>
              </div>
              <div className="rounded-xl border hairline bg-black/20 p-3">
                <div className="text-xs text-muted">Total gain</div>
                <div className="mt-1 font-medium">${fmt(result.gain)}</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border hairline bg-white/5 p-4 text-sm text-white/75">
            Simplified model (constant return). In Pro, we’ll add volatility, inflation-adjusted value, and regime-aware assumptions.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
