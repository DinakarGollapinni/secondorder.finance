import { cache } from 'react';

export const revalidate = 21600; // 6 hours

interface MarketData {
    date: string;
    close: number;
}

interface SignalResult {
    spyClose: number;
    spyDrawdown: number;
    spyHigh: number;
    spy200SMA: number;
    spyHs: boolean; // Above 200DMA?
    ratioClose: number;
    ratioDrawdown: number;
    ratioHigh: number;
    riskLevel: 'Neutral' | 'Elevated' | 'Extreme';
    signalStatus: string; // e.g., "Uptrend intact, drawdown small"
    sparkline: { date: string; value: number }[];
    // Keep reference policy for default display
    suggestedAction: string;
    suggestedActionDescription: string;
}

async function fetchStooqData(symbol: string): Promise<MarketData[]> {
    // Stooq CSV URL for daily data
    const url = `https://stooq.com/q/d/l/?s=${symbol}&i=d`;

    try {
        const response = await fetch(url, { next: { revalidate: 21600 } });
        const text = await response.text();

        // Simple CSV parser
        const lines = text.split('\n');
        const data: MarketData[] = [];

        // Skip header (Date,Open,High,Low,Close,Volume)
        // Stooq format: Date,Open,High,Low,Close,Volume,OpenInt
        // Note: Stooq returns data in descending order usually, or we should sort it.
        // Let's assume standard CSV and parse carefully.

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const parts = line.split(',');
            if (parts.length < 5) continue;

            const date = parts[0];
            const close = parseFloat(parts[4]);

            if (!isNaN(close)) {
                data.push({ date, close });
            }
        }

        // sort by date ascending just in case
        return data.sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
        console.error(`Failed to fetch data for ${symbol}`, error);
        return [];
    }
}

function calculateDrawdown(current: number, high: number): number {
    if (high === 0) return 0;
    return (current - high) / high;
}

function getMovingAverage(data: number[], window: number): number | null {
    if (data.length < window) return null;
    const slice = data.slice(-window);
    const sum = slice.reduce((a, b) => a + b, 0);
    return sum / window;
}

export const getMarketSignal = cache(async (): Promise<SignalResult | null> => {
    const [spyData, gldData] = await Promise.all([
        fetchStooqData('spy.us'),
        fetchStooqData('gld.us')
    ]);

    if (spyData.length === 0 || gldData.length === 0) {
        return null;
    }

    // Create a map for GLD data for easy lookup by date
    const gldMap = new Map(gldData.map(d => [d.date, d.close]));

    // Align data: intersection of dates
    const alignedData = spyData.filter(d => gldMap.has(d.date)).map(d => ({
        date: d.date,
        spyClose: d.close,
        gldClose: gldMap.get(d.date)!
    }));

    if (alignedData.length < 200) return null;

    const lastDate = alignedData[alignedData.length - 1];
    const spyCloses = alignedData.map(d => d.spyClose);

    // 1. SPY 200DMA
    const spy200SMA = getMovingAverage(spyCloses, 200);
    const spyAbove200 = spy200SMA ? lastDate.spyClose > spy200SMA : true; // Default to true if not enough data? (Should have enough)

    // 2. SPY Nominal Drawdown (from 12-month high - approx 252 trading days)
    const lookbackDays = 252;
    const recentSpyData = spyCloses.slice(-lookbackDays);
    const spyHigh = Math.max(...recentSpyData);
    const spyDrawdown = calculateDrawdown(lastDate.spyClose, spyHigh);

    // 3. SPY/GLD Ratio
    const ratios = alignedData.map(d => ({
        date: d.date,
        value: d.spyClose / d.gldClose
    }));

    const lastRatio = ratios[ratios.length - 1];
    const recentRatios = ratios.slice(-lookbackDays).map(r => r.value);
    const ratioHigh = Math.max(...recentRatios);
    const ratioDrawdown = calculateDrawdown(lastRatio.value, ratioHigh);

    // 4. Sparkline (last 6 months ~ 126 days)
    const sparkline = ratios.slice(-126).map(r => ({ date: r.date, value: r.value }));

    let riskLevel: 'Neutral' | 'Elevated' | 'Extreme' = 'Neutral';
    let signalStatus = "Uptrend intact, drawdown small";

    const spyDDPercent = Math.abs(spyDrawdown * 100);

    if (spyDDPercent < 8) {
        if (spyAbove200) {
            riskLevel = 'Neutral';
            signalStatus = "Uptrend intact, drawdown small";
        } else {
            riskLevel = 'Elevated';
            signalStatus = "Drawdown small, but trend broken";
        }
    } else if (spyDDPercent >= 8 && spyDDPercent < 15) {
        riskLevel = 'Elevated';
        signalStatus = "Meaningful pullback in progress";
    } else {
        riskLevel = 'Extreme';
        signalStatus = "Major drawdown, high fear";
    }

    // Default reference policy (Core Growth)
    let action = "Maintain baseline DCA";
    let description = "Markets are uptrending. Maintain existing cadence.";

    if (riskLevel === 'Neutral') {
        action = "Maintain baseline DCA";
        description = "Uptrend intact. Maintain existing cadence.";
    } else if (riskLevel === 'Elevated' && spyDDPercent < 8) {
        action = "DCA + build buffer";
        description = "Be cautious. Trend is weak despite small drawdown.";
    } else if (spyDDPercent >= 8 && spyDDPercent < 15) {
        action = "Deploy dip-bucket (small)";
        description = "Meaningful pullback. Deploy 20-30% of cash.";
    } else {
        action = "Deploy dip-bucket (meaningful)";
        description = "Major discount. Aggressive accumulation.";
    }

    if (Math.abs(ratioDrawdown * 100) > 15 && spyDDPercent < 10) {
        description += " (Note: Equities weak vs Gold)";
    }

    return {
        spyClose: lastDate.spyClose,
        spyDrawdown,
        spyHigh,
        spy200SMA: spy200SMA || 0,
        spyHs: spyAbove200,
        ratioClose: lastRatio.value,
        ratioDrawdown,
        ratioHigh,
        riskLevel,
        signalStatus,
        sparkline,
        suggestedAction: action,
        suggestedActionDescription: description
    };
});
