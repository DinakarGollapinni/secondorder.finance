"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BASELINES, getPolicyOutput, type SignalData, type Baseline } from "@/lib/policy";
import { getPurchasingPowerState } from "@/lib/signal-summary";

interface SparklineData {
    date: string;
    value: number;
}

interface SignalsDashboardProps {
    signal: SignalData & {
        spyClose: number;
        ratioClose: number;
        ratioDrawdown: number;
        signalStatus: string;
        sparkline: SparklineData[];
    };
}

function Sparkline({ data }: { data: SparklineData[] }) {
    if (data.length < 2) return null;
    const width = 300;
    const height = 120;
    const padding = { top: 10, bottom: 24, left: 0, right: 35 };
    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const getX = (i: number) => (i / (data.length - 1)) * (width - padding.right);
    const getY = (v: number) => padding.top + (height - padding.top - padding.bottom) - ((v - min) / range) * (height - padding.top - padding.bottom);
    const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(" ");
    const areaPoints = `${points} ${getX(data.length - 1)},${height - padding.bottom} 0, ${height - padding.bottom}`;
    const startDate = new Date(data[0].date).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    const endDate = new Date(data[data.length - 1].date).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    const maxLabel = max.toFixed(2);
    const minLabel = min.toFixed(2);
    const midLabel = ((max + min) / 2).toFixed(2);
    const midY = getY((max + min) / 2);

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMinYMin meet"
            width="100%"
            height="100%"
            className="block w-full h-full overflow-visible font-sans"
        >
            <defs>
                <linearGradient id="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(210, 90%, 60%)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="hsl(210, 90%, 60%)" stopOpacity="0" />
                </linearGradient>
            </defs>
            <line x1="0" y1={getY(max)} x2={width - padding.right} y2={getY(max)} stroke="white" strokeOpacity="0.1" strokeDasharray="4 4" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
            <line x1="0" y1={midY} x2={width - padding.right} y2={midY} stroke="white" strokeOpacity="0.1" strokeDasharray="4 4" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
            <line x1="0" y1={getY(min)} x2={width - padding.right} y2={getY(min)} stroke="white" strokeOpacity="0.1" strokeDasharray="4 4" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
            <polygon points={areaPoints} fill="url(#chart-gradient)" />
            <polyline fill="none" stroke="hsl(210, 90%, 60%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} vectorEffect="non-scaling-stroke" />
            <text x="0" y={height - 2} fontSize="10" fill="currentColor" className="text-muted" opacity="0.7">{startDate}</text>
            <text x={width - padding.right} y={height - 2} fontSize="10" textAnchor="end" fill="currentColor" className="text-muted" opacity="0.7">{endDate}</text>
            <text x={width} y={getY(max) + 3} fontSize="10" textAnchor="end" fill="currentColor" className="text-muted" opacity="0.7">{maxLabel}</text>
            <text x={width} y={midY + 3} fontSize="10" textAnchor="end" fill="currentColor" className="text-muted" opacity="0.7">{midLabel}</text>
            <text x={width} y={getY(min) + 3} fontSize="10" textAnchor="end" fill="currentColor" className="text-muted" opacity="0.7">{minLabel}</text>
        </svg>
    );
}

export function SignalsDashboard({ signal }: SignalsDashboardProps) {
    const [activeBaseline, setActiveBaseline] = useState<Baseline>(BASELINES[0]);
    const [showSettings, setShowSettings] = useState(false);

    const policy = getPolicyOutput(signal, activeBaseline);

    return (
        <Card className="overflow-hidden accent-glow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <div className="text-sm font-medium text-white/90">SecondOrder Signals</div>
                    <Link
                        href="/playbook/system-design/policy-engine"
                        className="text-[10px] text-muted hover:text-white transition-colors underline decoration-white/20 underline-offset-2"
                    >
                        How this works
                    </Link>
                </div>
                <div className="relative group inline-flex">
                    <Badge
                        className={signal.riskLevel === 'Neutral' ? "bg-white/10" : signal.riskLevel === 'Elevated' ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}
                    >
                        Equity Risk: {signal.riskLevel}
                    </Badge>
                    <div className="pointer-events-none absolute right-0 top-full z-20 mt-2 w-64 rounded-lg border border-white/10 bg-black/90 px-2.5 py-2 text-[10px] leading-snug text-white/80 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        Risk reflects SPY drawdown vs its 12‑month high (last ~252 trading days), adjusted for trend.
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="relative">
                    <div className="space-y-4">
                        {/* Observation Section */}
                        <div className="rounded-2xl border hairline bg-white/5 p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-xs text-muted uppercase tracking-wider">Observed Market State</div>
                                    <div className="mt-2 text-xs text-muted leading-relaxed">
                                        Equity trend (SPY, 200D): {signal.spyHs ? "Uptrend" : "Downtrend"}
                                    </div>
                                    <div className="text-xs text-muted leading-relaxed">
                                        Purchasing power (SPY vs Gold, 12M): {getPurchasingPowerState(signal.ratioDrawdown)}
                                    </div>
                                </div>
                                <div className="relative group inline-flex">
                                    <button
                                        type="button"
                                        aria-label="SPY trend info"
                                        className="h-7 px-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-semibold uppercase tracking-wide text-white/70 transition hover:text-white hover:border-white/30"
                                    >
                                        SPY Trend {signal.spyHs ? "⬆︎" : "⬇︎"}
                                    </button>
                                    <div className="pointer-events-none absolute right-0 top-full z-20 mt-2 w-64 rounded-lg border border-white/10 bg-black/90 px-2.5 py-2 text-[10px] leading-snug text-white/80 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                                        <div>SPY {signal.spyHs ? "above" : "below"} its 200-day average.</div>
                                    </div>
                                </div>
                            </div>

                            {/* Graph Title */}
                            <div className="mt-4 space-y-1">
                                <div className="text-sm font-semibold text-white/90">Equity Purchasing Power vs Gold (SPY / GLD)</div>
                                <div className="text-[10px] text-muted leading-snug">Measures whether equities are gaining or losing real purchasing power relative to gold.</div>
                            </div>

                            {/* Chart */}
                            <div className="mt-3 space-y-2">
                                <div className="text-[9px] text-muted uppercase tracking-wider">Purchasing Power Ratio</div>
                                <div className="h-56 md:h-64 w-full">
                                    <Sparkline data={signal.sparkline} />
                                </div>
                            </div>

                            <div className="mt-2 flex justify-between text-[10px] text-muted">
                                <span>SPY drawdown (12M): {(signal.spyDrawdown * 100).toFixed(1)}%</span>
                                <span>SPY/Gold drawdown (12M): {(signal.ratioDrawdown * 100).toFixed(1)}%</span>
                            </div>
                        </div>

                        {/* System/Policy Details */}
                        <div className="grid gap-4 md:grid-cols-2">
                            {/* Regime Classification */}
                            <div className="rounded-2xl border hairline bg-white/5 p-4 space-y-2">
                                <div className="text-xs text-muted uppercase tracking-wider">System Regime Classification</div>
                                <Badge className="text-[10px] h-5 bg-white/10 border-white/20">
                                    {policy.regime.replace(/-/g, ' ')}
                                </Badge>
                                <div className="text-[10px] text-muted/80 leading-snug italic">
                                    Regimes classify market conditions; they do not forecast outcomes.
                                </div>
                            </div>

                            {/* Policy Guidance */}
                            <div className="rounded-2xl border hairline bg-white/5 p-4 space-y-2">
                                <div className="text-xs text-muted uppercase tracking-wider">Policy Guidance</div>
                                <div className="text-sm text-white/80 leading-snug">
                                    {policy.action}
                                </div>
                                <div className="text-[10px] text-muted/80 italic leading-snug">
                                    {policy.because}
                                </div>
                            </div>

                            {/* Baseline Template */}
                            <div className="rounded-2xl border hairline bg-white/5 p-4 space-y-1">
                                <div className="flex items-center justify-between gap-2 text-[10px] text-muted">
                                    <div className="flex items-center gap-1.5">
                                    <span>Baseline Template (Demo):</span>
                                    <Badge className="h-4 px-1.5 text-[9px] font-mono border-white/10 bg-white/5">
                                        {activeBaseline.weights}
                                    </Badge>
                                    <button onClick={() => setShowSettings(true)} className="hover:text-white transition-colors underline decoration-white/20 underline-offset-2">(change)</button>
                                    </div>
                                    <button
                                        onClick={() => setShowSettings(!showSettings)}
                                        className="p-1 hover:bg-white/10 rounded-md transition-colors"
                                        aria-label="Edit baseline template"
                                    >
                                        <svg className="h-4 w-4 text-muted hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-[9px] text-muted/70 leading-snug">
                                    Used to simulate policy responses shown above.
                                </div>
                            </div>

                            {/* Guardrails */}
                            {activeBaseline.guardrails && (
                                <div className="rounded-2xl border hairline bg-white/5 p-4 space-y-1">
                                    <div className="text-[9px] text-muted/80 uppercase tracking-wider">Guardrails</div>
                                    <div className="flex items-start gap-2 rounded-lg bg-white/5 p-2 text-[10px] text-muted/80 leading-relaxed">
                                        <svg className="h-3 w-3 mt-0.5 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <span>{activeBaseline.guardrails}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Settings / Templates Panel Overlay */}
                    {showSettings && (
                        <div className="absolute inset-0 z-10 rounded-2xl border border-accent/20 bg-black/80 backdrop-blur-sm p-4 animate-in fade-in slide-in-from-top-2 overflow-auto">
                            <div className="flex justify-between items-center mb-4">
                                <div className="space-y-1">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">Select Baseline Template</h3>
                                    <div className="text-[10px] text-muted/70 leading-snug">Baseline defines how policies translate into allocation actions.</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link
                                        href="/playbook/system-design/policy-engine"
                                        className="text-[10px] text-muted hover:text-white underline decoration-white/20 underline-offset-2"
                                    >
                                        Learn more
                                    </Link>
                                    <button
                                        onClick={() => setShowSettings(false)}
                                        className="text-[10px] text-muted hover:text-white"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                {BASELINES.map((b) => (
                                    <button
                                        key={b.id}
                                        onClick={() => {
                                            setActiveBaseline(b);
                                            setShowSettings(false);
                                        }}
                                        className={`flex flex-col text-left p-3 rounded-xl border transition-all ${activeBaseline.id === b.id
                                            ? 'bg-white/10 border-white/20'
                                            : 'bg-white/5 border-transparent hover:border-white/10 hover:bg-white/5'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-white">{b.name}</span>
                                            <span className="text-xs font-mono text-muted">{b.weights}</span>
                                        </div>
                                        <div className="text-[10px] text-muted mt-1">{b.description}</div>
                                        {b.guardrails && (
                                            <div className="text-[9px] text-muted/60 italic mt-0.5">Constraint: {b.guardrails}</div>
                                        )}
                                    </button>
                                ))}
                                <div className="mt-2 flex items-center justify-center rounded-xl border border-dashed border-white/10 p-3 text-xs text-muted hover:bg-white/5 cursor-not-allowed">
                                    Custom Policy (Pro Lab)
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="rounded-2xl border hairline bg-white/5 p-4">
                    <div className="text-xs text-muted">What this is</div>
                    <div className="mt-1 text-sm text-white/80 leading-relaxed">
                        Real purchasing power compares assets against hard money (gold) to isolate inflation and currency effects, rather than relying on nominal USD prices.
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
