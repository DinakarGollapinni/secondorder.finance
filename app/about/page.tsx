import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <div className="space-y-8 max-w-4xl">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <div className="space-y-4 text-white/90 leading-relaxed max-w-prose">
          <p>
            SecondOrder is a portfolio operating system designed around systems thinking — reducing decision fatigue, enforcing consistency, and helping investors act deliberately across market cycles.
          </p>
          <p>
            It is built for long-horizon investors who value process over prediction.
          </p>
        </div>
      </header>

      <div className="grid gap-6">

        {/* Card 1: The Philosophy */}
        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <div>
              <div className="text-sm font-medium text-white/90">The SecondOrder philosophy</div>
              <div className="text-xs text-muted">Decisions compound. So do mistakes.</div>
            </div>
            <Badge>Philosophy</Badge>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-white/80 leading-relaxed">
            <p>
              Most long-term investment underperformance does not come from poor asset selection — it comes from inconsistent behavior across regimes.
            </p>
            <p>
              SecondOrder is designed around a simple idea: <br />
              <span className="text-white font-medium">build a system that makes the right action obvious, even when emotions are loud.</span>
            </p>
            <div className="pt-2">
              <p className="text-muted/90 mb-2">Rather than reacting to headlines or short-term volatility, SecondOrder emphasizes:</p>
              <ul className="list-disc pl-5 space-y-1 text-muted">
                <li><strong className="text-white/80 font-medium">Regime awareness</strong> over market timing</li>
                <li><strong className="text-white/80 font-medium">Rules</strong> over opinions</li>
                <li><strong className="text-white/80 font-medium">Repeatability</strong> over optimization</li>
              </ul>
            </div>
            <p className="text-muted/80 pt-2 border-t border-white/5">
              The public Playbook explains how assets behave across inflation, growth, stress, and liquidity environments. Pro tools extend this into persistent, rule-based systems.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 2: What SecondOrder Is */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white/90">What SecondOrder is</div>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-white/80 space-y-3">
              <ul className="space-y-2 list-disc pl-4 marker:text-emerald-500/50">
                <li>A framework for long-term allocation and contribution decisions</li>
                <li>A toolkit for disciplined, repeatable actions</li>
                <li>A signal layer that summarizes risk without telling you what to trade</li>
              </ul>
              <div className="pt-3 border-t border-white/5">
                <p className="text-muted">SecondOrder is not a trading platform, a stock-picking service, or a prediction engine.</p>
                <p className="mt-2 text-white/90 font-medium">It is an operating system for decision-making.</p>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: What SecondOrder Is Not */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white/90">What SecondOrder is not</div>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-white/80 space-y-3">
              <ul className="space-y-2 list-disc pl-4 marker:text-red-500/50">
                <li>It does not provide personalized financial advice</li>
                <li>It does not optimize for short-term returns</li>
                <li>It does not react to daily market noise</li>
              </ul>
              <div className="pt-3 border-t border-white/5">
                <p className="text-muted italic">SecondOrder is intentionally conservative in its outputs — designed to reduce regret, not maximize excitement.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Card 4: Design Principles */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white/90">Design principles</div>
              <div className="text-xs text-muted">Calm over cleverness</div>
            </div>
            <Badge className="bg-transparent border border-white/20 text-white/80">Principles</Badge>
          </CardHeader>
          <CardContent className="text-sm text-white/80 space-y-4">
            <p>SecondOrder is built around a small set of principles:</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-white font-medium">Calm</div>
                <div className="text-xs text-muted">over cleverness</div>
              </div>
              <div className="space-y-1">
                <div className="text-white font-medium">Structure</div>
                <div className="text-xs text-muted">over discretion</div>
              </div>
              <div className="space-y-1">
                <div className="text-white font-medium">Regimes</div>
                <div className="text-xs text-muted">over narratives</div>
              </div>
              <div className="space-y-1">
                <div className="text-white font-medium">Consistency</div>
                <div className="text-xs text-muted">over optimization</div>
              </div>
            </div>
            <p className="text-muted pt-2 border-t border-white/5">
              Every page, tool, and signal is evaluated against these principles. <br />
              <span className="text-white/90">If something increases reactivity, it doesn’t ship.</span>
            </p>
          </CardContent>
        </Card>

        {/* Card 5: Engineering */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white/90">Engineering foundation</div>
              <div className="text-xs text-muted">Production-grade</div>
            </div>
            <Badge className="bg-white/5 text-muted hover:bg-white/10">Tech</Badge>
          </CardHeader>
          <CardContent className="text-sm text-white/80 space-y-2">
            <p>SecondOrder is built using modern, production-grade tooling:</p>
            <ul className="list-disc pl-5 space-y-1 text-muted">
              <li>Next.js (App Router), TypeScript, Tailwind</li>
              <li>Modular UI tokens and systemized layouts</li>
              <li>Architecture ready for authentication, persistence, and subscriptions</li>
            </ul>
            <p className="text-white/90 pt-1">
              Technology serves the system — not the other way around.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <div className="pt-4 border-t border-white/5">
          <div className="text-sm font-medium text-white/90 mb-1">Contact</div>
          <div className="text-sm text-muted">
            Questions, feedback, or collaboration inquiries: <br />
            <a className="text-white/80 underline decoration-white/20 hover:decoration-white/50" href="mailto:hello@secondorder.finance">hello@secondorder.finance</a>
          </div>
        </div>

        <div className="pt-2 text-xs text-muted/50 italic">
          SecondOrder is designed to support disciplined decision-making, not to replace professional financial advice.
        </div>
      </div>
    </div>
  );
}
