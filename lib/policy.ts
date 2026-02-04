export type RiskLevel = 'Neutral' | 'Elevated' | 'Extreme';
export type DrawdownTier = 'small' | 'medium' | 'large';
export type TrendStatus = 'uptrend' | 'downtrend';

export type PolicyRegime =
    | 'neutral-uptrend'
    | 'trend-break'
    | 'pullback'
    | 'drawdown'
    | 'defensive-tilt'
    | 'defensive-override';

export interface SignalData {
    spyDrawdown: number;
    spyHs: boolean;
    riskLevel: RiskLevel;
}

export interface Baseline {
    id: string;
    name: string;
    weights: string;
    description: string;
    guardrails?: string;
}

export interface PolicyOutput {
    regime: PolicyRegime;
    action: string;
    because: string;
}

export const BASELINES: Baseline[] = [
    {
        id: "demo",
        name: "Demo baseline",
        weights: "70/20/10",
        description: "Default split: 70% EQ, 20% Metals, 10% Cash",
        guardrails: "Allocation may drift ±5% before rebalancing is triggered"
    },
    {
        id: "core",
        name: "Core Growth",
        weights: "80/10/10",
        description: "Equity-heavy: 80% EQ, 10% Metals, 10% Cash",
        guardrails: "Even in strong signals, allocation changes are limited to 2% per month to preserve compounding discipline."
    },
    {
        id: "balanced",
        name: "Balanced",
        weights: "60/20/10/10",
        description: "All-weather: 60% EQ, 20% Metals, 10% REITs, 10% Cash",
        guardrails: "Portfolio rebalances only when allocations drift more than ±5%"
    },
    {
        id: "defensive",
        name: "Defensive",
        weights: "40/40/20",
        description: "Capital preservation: 40% EQ, 40% Metals, 20% Cash",
        guardrails: "During elevated risk, the system may shift up to +15% toward defensive assets — no more."
    },
];

export function getPolicyOutput(signal: SignalData, baseline: Baseline): PolicyOutput {
    const dd = Math.abs(signal.spyDrawdown * 100);
    const ddTier: DrawdownTier = dd < 8 ? 'small' : dd < 15 ? 'medium' : 'large';
    const trend: TrendStatus = signal.spyHs ? 'uptrend' : 'downtrend';

    // 1. Maintain Baseline (Uptrend + Small Drawdown)
    if (trend === 'uptrend' && ddTier === 'small') {
        return {
            regime: 'neutral-uptrend',
            action: "Maintain baseline allocation & DCA cadence",
            because: `Drawdown is minimal (${dd.toFixed(1)}%) and major trend is upward.`
        };
    }

    // 2. Defensive Template Logic
    if (baseline.id === 'defensive') {
        if (ddTier === 'medium' || trend === 'downtrend') {
            return {
                regime: 'defensive-tilt',
                action: "Defensive tilt: route new equity DCA toward Metals",
                because: `${trend === 'downtrend' ? 'Trend broken' : 'Medium drawdown'}; prioritizing capital preservation.`
            };
        }
        if (ddTier === 'large') {
            return {
                regime: 'defensive-override',
                action: "Defensive posture: pause new equity DCA; preserve liquidity",
                because: `Major drawdown (${dd.toFixed(1)}%) triggered safety override.`
            };
        }
    }

    // 3. Standard Logic (Core, Balanced, Demo)
    if (trend === 'downtrend' && ddTier === 'small') {
        return {
            regime: 'trend-break',
            action: "Continue DCA; redirect surplus to cash buffer",
            because: "Trend has broken while prices remain elevated; prioritizing optionality."
        };
    }

    if (ddTier === 'medium') {
        return {
            regime: 'pullback',
            action: "Deploy initial dip-bucket (20–30% of cash reserve)",
            because: `Meaningful retreat (${dd.toFixed(1)}%) from highs; beginning staged entry.`
        };
    }

    if (ddTier === 'large') {
        return {
            regime: 'drawdown',
            action: "Deploy primary dip-bucket (major tranche)",
            because: `Major discount (${dd.toFixed(1)}%) from 12-mo high; aggressive accumulation.`
        };
    }

    return {
        regime: 'neutral-uptrend',
        action: "Maintain baseline allocation & DCA cadence",
        because: "System in neutral regime."
    };
}
