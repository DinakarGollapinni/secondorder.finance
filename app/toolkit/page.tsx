import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tools = [
  {
    title: "Compound interest",
    desc: "Future value with contributions + optional inflation-adjusted view.",
    href: "/toolkit/compound-interest",
    tag: "Free",
  },
  {
    title: "Home loan EMI",
    desc: "Monthly payment + total interest over time.",
    href: "/toolkit/emi",
    tag: "Free",
  },
  {
    title: "Regime-aware DCA (coming)",
    desc: "Adjust DCA speed based on fundamentals + technical risk.",
    href: "/pro",
    tag: "Pro",
  },
];

export default function ToolkitIndex() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Toolkit</h1>
        <p className="text-muted max-w-prose">
          Focused calculators with clear assumptions. Free tools stay free; Pro tools are where SecondOrder differentiates.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((t) => (
          <Link key={t.title} href={t.href} className="block">
            <Card className="h-full hover:bg-white/5 transition">
              <CardHeader className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-white/90">{t.title}</div>
                  <div className="text-xs text-muted">{t.desc}</div>
                </div>
                <Badge>{t.tag}</Badge>
              </CardHeader>
              <CardContent className="text-sm text-white/75">
                Open →
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
