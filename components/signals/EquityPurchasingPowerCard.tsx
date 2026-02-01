
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMarketSignal } from "@/lib/market-data";

function Sparkline({ data }: { data: { date: string; value: number }[] }) {
    if (data.length < 2) return null;

    // Dimensions and Margins
    const width = 300;
    const height = 100;
    const padding = { top: 10, bottom: 20, left: 0, right: 35 }; // Right padding for Y-axis text

    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    // X and Y scaling functions
    const getX = (i: number) => (i / (data.length - 1)) * (width - padding.right);
    const getY = (v: number) => padding.top + (height - padding.top - padding.bottom) - ((v - min) / range) * (height - padding.top - padding.bottom);

    // Generate Line Path
    const points = data.map((d, i) => `${getX(i)},${getY(d.value)} `).join(" ");

    // Generate Area Fill Path
    const areaPoints = `${points} ${getX(data.length - 1)},${height - padding.bottom} 0, ${height - padding.bottom} `;

    // Date Formatting for Labels
    const startDate = new Date(data[0].date).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    const endDate = new Date(data[data.length - 1].date).toLocaleDateString("en-US", { month: "short", year: "2-digit" });

    // Y-axis Labels
    const maxLabel = max.toFixed(2);
    const minLabel = min.toFixed(2);
    const midLabel = ((max + min) / 2).toFixed(2);
    const midY = getY((max + min) / 2);

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height} `} preserveAspectRatio="none" className="overflow-visible font-sans">
            <defs>
                <linearGradient id="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(210, 90%, 60%)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="hsl(210, 90%, 60%)" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="0" y1={getY(max)} x2={width - padding.right} y2={getY(max)} stroke="white" strokeOpacity="0.1" strokeDasharray="4 4" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
            <line x1="0" y1={midY} x2={width - padding.right} y2={midY} stroke="white" strokeOpacity="0.1" strokeDasharray="4 4" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
            <line x1="0" y1={getY(min)} x2={width - padding.right} y2={getY(min)} stroke="white" strokeOpacity="0.1" strokeDasharray="4 4" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />

            {/* Area Fill */}
            <polygon points={areaPoints} fill="url(#chart-gradient)" />

            {/* Line */}
            <polyline
                fill="none"
                stroke="hsl(210, 90%, 60%)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
                vectorEffect="non-scaling-stroke"
            />

            {/* X-Axis Labels */}
            <text x="0" y={height} fontSize="10" fill="currentColor" className="text-muted" opacity="0.7">{startDate}</text>
            <text x={width - padding.right} y={height} fontSize="10" textAnchor="end" fill="currentColor" className="text-muted" opacity="0.7">{endDate}</text>

            {/* Y-Axis Labels */}
            <text x={width} y={getY(max) + 3} fontSize="10" textAnchor="end" fill="currentColor" className="text-muted" opacity="0.7">{maxLabel}</text>
            <text x={width} y={midY + 3} fontSize="10" textAnchor="end" fill="currentColor" className="text-muted" opacity="0.7">{midLabel}</text>
            <text x={width} y={getY(min) + 3} fontSize="10" textAnchor="end" fill="currentColor" className="text-muted" opacity="0.7">{minLabel}</text>
        </svg>
    );
}

export async function EquityPurchasingPowerCard() {
    const signal = await getMarketSignal();

    if (!signal) {
        return (
            <Card className="overflow-hidden accent-glow">
                <CardHeader className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium text-white/90">SecondOrder Signals</div>
                        <div className="text-xs text-muted">Snapshot</div>
                    </div>
                    <Badge className="border-red-500/50 text-red-400">Data Unavailable</Badge>
                </CardHeader>
                <CardContent>
                    <div className="h-32 flex items-center justify-center text-sm text-muted">
                        Unable to fetch market data.
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Formatting strings
    const ppDrawdown = (signal.ratioDrawdown * 100).toFixed(1) + "%";
    const nominalDrawdown = (signal.spyDrawdown * 100).toFixed(1) + "%";

    return (
        <Card className="overflow-hidden accent-glow">
            <CardHeader className="flex items-center justify-between pb-2">
                <div>
                    <div className="text-sm font-medium text-white/90">SecondOrder Signals</div>
                    <div className="text-xs text-muted">Equity Purchasing Power</div>
                </div>
                <Badge className={signal.suggestedAction.includes("DCA") ? "bg-white/10" : ""}>
                    Risk: {signal.suggestedAction.includes("buffer") ? "Elevated" : "Neutral"}
                </Badge>
            </CardHeader>

            <CardContent className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    {/* Main Signal Display */}
                    <div className="rounded-2xl border hairline bg-white/5 p-4 relative overflow-hidden group">
                        <div className="absolute inset-x-0 bottom-0 h-10 opacity-20 pointer-events-none">
                            {/* Background Sparkline effect? Maybe too subtle. Let's keep clean. */}
                        </div>

                        <div className="text-xs text-muted">Purchasing Power (vs Gold)</div>
                        <div className="mt-1 text-2xl font-semibold tracking-tight text-white">
                            {ppDrawdown}
                        </div>

                        {/* Small Nominal display */}
                        <div className="mt-1 text-xs text-muted flex items-center gap-1">
                            <span>Nominal (USD):</span>
                            <span className={signal.spyDrawdown < -0.1 ? "text-red-400" : "text-white/70"}>
                                {nominalDrawdown}
                            </span>
                        </div>

                        {/* Sparkline */}
                        <div className="mt-4 h-24 w-full">
                            <Sparkline data={signal.sparkline} />
                        </div>
                    </div>

                    {/* Action Display */}
                    <div className="rounded-2xl border hairline bg-white/5 p-4 flex flex-col justify-between">
                        <div>
                            <div className="text-xs text-muted mb-1">Suggested System Action</div>
                            <div className="text-sm font-medium text-white/90 leading-snug">
                                {signal.suggestedAction}
                            </div>
                            <div className="mt-2 text-xs text-muted leading-relaxed opacity-80">
                                {signal.suggestedActionDescription}
                            </div>
                            <div className="mt-2 text-[10px] text-muted/50 italic">
                                System guidance, not personalized advice.
                            </div>
                        </div>

                        <div className="mt-3 space-y-1.5 pt-3 border-t border-white/5">
                            <div className="flex justify-between text-[10px] text-muted uppercase tracking-wider">
                                <span>Trend (200d)</span>
                                <span className={signal.spyHs ? "text-green-400" : "text-red-400"}>
                                    {signal.spyHs ? "Uptrend" : "Downtrend"}
                                </span>
                            </div>
                            <div className="flex justify-between text-[10px] text-muted uppercase tracking-wider">
                                <span>Strength</span>
                                <span>{Math.abs(signal.ratioDrawdown) > Math.abs(signal.spyDrawdown) ? "Gold > SPY" : "SPY > Gold"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border hairline bg-white/5 p-4">
                    <div className="text-xs text-muted">What this is</div>
                    <div className="mt-1 text-sm text-white/80 leading-relaxed">
                        Real purchasing power tracks assets against hard money (Gold), not just printing-press money (USD).
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
