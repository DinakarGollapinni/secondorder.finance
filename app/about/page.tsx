import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="text-muted max-w-prose">
          SecondOrder is a portfolio operating system built with systems thinking: reduce decision fatigue, increase consistency.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white/90">Why I built this</div>
              <div className="text-xs text-muted">A calm system for investing</div>
            </div>
            <Badge>Story</Badge>
          </CardHeader>
          <CardContent className="text-sm text-white/80 space-y-2">
            <p>
              I wanted a repeatable framework for allocating across equity, gold, and crypto—plus tools that help me act calmly during drawdowns instead of reacting to headlines.
            </p>
            <p className="text-muted">
              The public playbook explains the strategy. The Pro lab adds simulators, backtests, and saved presets.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white/90">Tech stack</div>
              <div className="text-xs text-muted">Recruiter-friendly</div>
            </div>
            <Badge>Engineering</Badge>
          </CardHeader>
          <CardContent className="text-sm text-white/80 space-y-2">
            <ul className="list-disc pl-5 space-y-1">
              <li>Next.js (App Router), TypeScript, Tailwind</li>
              <li>Modern UI tokens (dark theme, glass cards)</li>
              <li>Planned: Auth + Stripe + Postgres for saved portfolios</li>
              <li>Planned: GitHub Actions, CI, automated deploy on Vercel</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="text-sm font-medium text-white/90">Contact</div>
          <div className="text-xs text-muted">Let’s talk</div>
        </CardHeader>
        <CardContent className="text-sm text-white/80">
          Email: <a className="underline decoration-white/20 hover:decoration-white/50" href="mailto:hello@secondorder.finance">hello@secondorder.finance</a>
        </CardContent>
      </Card>
    </div>
  );
}
