import "./globals.css";
import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "SecondOrder — an operating system for long-term investors",
  description: "Signals, ladders, calculators, and playbooks — built for tech-driven investors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <SiteNav />
          <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8">{children}</main>
          <footer className="mx-auto w-full max-w-6xl px-4 pb-10">
            <div className="hairline border-t pt-8 text-sm text-muted flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-medium text-white/90">SecondOrder</span>{" "}
                <span className="text-muted">— calm systems for long-term investors.</span>
              </div>
              <div className="text-muted">
                Contact:{" "}
                <a className="underline decoration-white/20 hover:decoration-white/50" href="mailto:hello@secondorder.finance">
                  hello@secondorder.finance
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
