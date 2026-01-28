import Link from "next/link";
import { PlaybookShell } from "@/components/playbook-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function PlaybookIndex() {
  return (
    <PlaybookShell title="Playbook Overview">
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { title: "Asset Classes", desc: "Gold, crypto, equity, REITs — role, risks, sizing.", href: "/playbook/asset-classes/gold" },
          { title: "Strategy", desc: "Signals, ladders, DCA systems, risk dashboard.", href: "/playbook/strategy/risk-dashboard" },
        ].map((c) => (
          <Link key={c.title} href={c.href}>
            <Card className="hover:bg-white/5 transition">
              <CardContent className="pt-5">
                <div className="text-base font-semibold">{c.title}</div>
                <div className="mt-1 text-sm text-muted">{c.desc}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border hairline bg-white/5 p-5">
        <div className="text-sm font-semibold">How to use this site</div>
        <ol className="mt-2 list-decimal pl-5 text-sm text-white/80 space-y-1">
          <li>Read an asset class page (start with Equity or Gold).</li>
          <li>Use the Toolkit calculators for fast sanity checks.</li>
          <li>Upgrade to Pro for regime-aware tools & backtests.</li>
        </ol>
      </div>
    </PlaybookShell>
  );
}
