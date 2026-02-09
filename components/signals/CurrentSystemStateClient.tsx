"use client";

import { useState } from "react";

interface CurrentSystemStateClientProps {
    summarySentence: string;
    focusBullets: string[];
    changeBullets: string[];
}

export function CurrentSystemStateClient({
    summarySentence,
    focusBullets,
    changeBullets,
}: CurrentSystemStateClientProps) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold tracking-widest text-white/40 uppercase">Current System State</h2>
                <button
                    type="button"
                    onClick={() => setShowDetails((v) => !v)}
                    aria-expanded={showDetails}
                    aria-label="Toggle current system state details"
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/10 text-[11px] text-white/50 transition hover:text-white hover:border-white/30"
                >
                    ⓘ
                </button>
            </div>

            <p className="text-sm text-muted leading-relaxed max-w-prose">
                {summarySentence}
            </p>

            {showDetails && (
                <>
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
                </>
            )}
        </section>
    );
}
