import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const nav = [
  { label: "Overview", href: "/playbook" },
  { label: "Asset Classes", href: "/playbook/asset-classes/gold", section: true },
  { label: "Gold", href: "/playbook/asset-classes/gold" },
  { label: "Crypto", href: "/playbook/asset-classes/crypto" },
  { label: "Equity", href: "/playbook/asset-classes/equity" },
  { label: "REITs", href: "/playbook/asset-classes/reits" },
  { label: "Strategy", href: "/playbook/strategy/risk-dashboard", section: true },
  { label: "Risk Dashboard", href: "/playbook/strategy/risk-dashboard" },
  { label: "Ladder Sell/Buyback", href: "/playbook/strategy/ladder" },
  { label: "DCA Systems", href: "/playbook/strategy/dca" },
];

export function PlaybookShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-8 md:grid-cols-[260px_1fr]">
      <aside className="glass rounded-2xl shadow-soft p-4 md:sticky md:top-[88px] md:h-[calc(100vh-120px)] md:overflow-auto">
        <div className="flex items-center justify-between pb-3">
          <div className="text-sm font-semibold">Playbook</div>
          <Badge>Docs</Badge>
        </div>
        <nav className="space-y-1">
          {nav.map((item) =>
            item.section ? (
              <div key={item.label} className="pt-3 pb-1 text-xs uppercase tracking-wider text-muted">{item.label}</div>
            ) : (
              <Link key={item.href} href={item.href} className="block rounded-xl px-3 py-2 text-sm text-white/85 hover:bg-white/5">
                {item.label}
              </Link>
            )
          )}
        </nav>
      </aside>

      <article className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="text-muted max-w-prose">Calm explanations + systems thinking. Start simple, drill down only when needed.</p>
        </header>
        {children}
      </article>
    </div>
  );
}
