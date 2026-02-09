import { getMarketSignal } from "@/lib/market-data";
import { buildSystemSummary } from "@/lib/signal-summary";
import { CurrentSystemStateClient } from "@/components/signals/CurrentSystemStateClient";

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
        <CurrentSystemStateClient
            summarySentence={summarySentence}
            focusBullets={focusBullets}
            changeBullets={changeBullets}
        />
    );
}
