import type { RiskLevel } from "@/lib/policy";

export type PurchasingPowerState = "Improving" | "Stable" | "Declining";

export interface SystemSignalSummaryInput {
    spyHs: boolean;
    spyDrawdown: number;
    ratioDrawdown: number;
    riskLevel: RiskLevel;
}

export function getPurchasingPowerState(ratioDrawdown: number): PurchasingPowerState {
    if (ratioDrawdown > -0.1) return "Improving";
    if (ratioDrawdown < -0.2) return "Declining";
    return "Stable";
}

export function buildSystemSummary(signal: SystemSignalSummaryInput) {
    const equityTrend = signal.spyHs ? "long-term uptrend" : "downtrend";
    const ppState = getPurchasingPowerState(signal.ratioDrawdown);
    const ddPercent = Math.abs(signal.spyDrawdown * 100);

    const ppClause =
        ppState === "Improving"
            ? "purchasing power versus gold is improving"
            : ppState === "Declining"
                ? "purchasing power versus gold is under pressure"
                : "purchasing power versus gold is mixed";

    const posture =
        signal.riskLevel === "Extreme"
            ? "defensive"
            : signal.riskLevel === "Elevated"
                ? "cautious"
                : "neutral";

    const summarySentence =
        signal.spyHs
            ? `Equities remain in a ${equityTrend}, but ${ppClause}, keeping the system in a ${posture} posture.`
            : `Equities are in a ${equityTrend}, and ${ppClause}, keeping the system in a ${posture} posture.`;

    const focusBullets =
        signal.riskLevel === "Extreme"
            ? [
                "Prioritize capital preservation",
                "Limit discretionary risk adds",
                "Wait for stabilization before increasing exposure",
            ]
            : signal.riskLevel === "Elevated"
                ? [
                    "Preserve allocation discipline",
                    "Prefer phased adds over lump sums",
                    "Monitor for trend confirmation or deeper drawdowns",
                ]
                : [
                    "Maintain baseline allocation and DCA cadence",
                    "Avoid emotional reallocation",
                    "Watch for drawdown expansion or trend breaks",
                ];

    const changeBullets = [
        ddPercent < 8
            ? "Equity drawdown exceeds 8%"
            : ddPercent < 15
                ? "Equity drawdown exceeds 15%"
                : "Equity drawdown recovers below 15%",
        signal.spyHs
            ? "SPY breaks below its 200-day trend"
            : "SPY reclaims its 200-day trend",
        ppState === "Improving"
            ? "SPY/Gold drawdown slips below -10% or -20%"
            : ppState === "Declining"
                ? "SPY/Gold drawdown improves above -20% or -10%"
                : "SPY/Gold drawdown moves above -10% or below -20%",
    ];

    return { summarySentence, focusBullets, ppState, changeBullets };
}
