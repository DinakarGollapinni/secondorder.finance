import { getMarketSignal } from "@/lib/market-data";
import { buildSystemSummary } from "@/lib/signal-summary";

export async function CurrentSystemState() {
    const signal = await getMarketSignal();

    if (!signal) {
        return (
            <section className="space-y-3">
                <div className="space-y-2">
                    <h2 className="text-xs font-bold tracking-widest text-white/40 uppercase">Current System State</h2>
                </div>
                <div className="text-sm text-muted">Unable to load system state right now.</div>
            </section>
        );
    }

    const { summarySentence, focusBullets, changeBullets } = buildSystemSummary({
        spyHs: signal.spyHs,
        spyDrawdown: signal.spyDrawdown,
        ratioDrawdown: signal.ratioDrawdown,
        riskLevel: signal.riskLevel,
    });

    return (
        <section className="space-y-4">
            <div className="space-y-2">
                <h2 className="text-xs font-bold tracking-widest text-white/40 uppercase">Current System State</h2>
            </div>

            <p className="text-sm text-muted leading-relaxed max-w-prose">
                {summarySentence}
            </p>

            <div className="space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-white/40">System focus right now</div>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted">
                    {focusBullets.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-white/40">What would change this signal</div>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted">
                    {changeBullets.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
