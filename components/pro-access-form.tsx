"use client";

import { useState } from "react";

export function ProAccessForm() {
    const [email, setEmail] = useState("");
    const [interest, setInterest] = useState("");
    const [honeypot, setHoneypot] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (honeypot) {
            // Silently ignore bot submissions
            setStatus("success");
            setMessage("You’re on the list. When Pro opens, you’ll get a single email.");
            return;
        }

        setStatus("loading");

        try {
            const res = await fetch("/api/early-access", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, interest, honeypot, source: "pro_page_form", page_path: "/pro" }),
            });

            const data = await res.json();

            if (res.status === 409) {
                setStatus("duplicate");
                setMessage("You’re already on the list. When Pro opens, you’ll get a single email.");
            } else if (res.ok) {
                setStatus("success");
                setMessage("You’re on the list. When Pro opens, you’ll get a single email.");
            } else {
                throw new Error(data.error || "Something went wrong");
            }
        } catch (err: any) {
            setStatus("error");
            setMessage(err.message || "Failed to join waitlist. Please try again.");
        }
    };

    if (status === "success" || status === "duplicate") {
        return (
            <div className="glass rounded-2xl p-6 text-center space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="mx-auto h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white/90">Confirmation</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                        {message}
                    </p>
                    <p className="text-xs text-muted/80 pt-2">
                        Reply to hello@secondorder.finance with what you want most.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field (hidden from humans) */}
            <div className="hidden" aria-hidden="true">
                <input
                    type="text"
                    name="full_name_verification"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-medium text-muted uppercase tracking-wider">
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent/50 transition"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="interest" className="text-xs font-medium text-muted uppercase tracking-wider">
                    What are you looking for? (Optional)
                </label>
                <textarea
                    id="interest"
                    rows={3}
                    placeholder="e.g. Backtesting for custom strategies, regime-aware dashboards..."
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent/50 transition resize-none"
                />
            </div>

            <button
                type="submit"
                disabled={status === "loading"}
                className="btn btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === "loading" ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Requesting...
                    </span>
                ) : (
                    "Request Early Access"
                )}
            </button>

            {status === "error" && (
                <p className="text-xs text-red-400 text-center animate-in fade-in duration-300">
                    {message}
                </p>
            )}

            <p className="text-[10px] text-center text-muted/60">
                No spam. Early access is limited.
            </p>
        </form>
    );
}
