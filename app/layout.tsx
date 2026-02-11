import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { GaPageView } from "@/components/ga-pageview";

export const metadata: Metadata = {
  title: "SecondOrder — an operating system for long-term investors",
  description: "Signals, ladders, calculators, and playbooks — built for tech-driven investors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaEnabled = process.env.NEXT_PUBLIC_GA_DISABLE !== "true";

  return (
    <html lang="en">
      <head>
        {gaEnabled && (
          <>
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-NHEBM8VYNG"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-NHEBM8VYNG');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <div className="min-h-screen">
          <SiteNav />
          <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8">{children}</main>
          <footer className="mx-auto w-full max-w-6xl px-4 pb-10">
            <div className="hairline border-t pt-8 text-sm text-muted flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-medium text-white/90">SecondOrder</span>{" "}
                <span className="text-muted">— decision systems for long-horizon investors.</span>
              </div>
              <div className="text-muted">
                Contact:{" "}
                <a className="underline decoration-white/20 hover:decoration-white/50" href="mailto:hello@secondorder.finance">
                  hello@secondorder.finance
                </a>
              </div>
            </div>
            <div className="mt-8 text-xs text-muted/40 max-w-xl">
              SecondOrder provides decision-support frameworks and tools — not personalized financial advice. All information is for general informational purposes only.{" "}
              <Link href="/legal" className="underline hover:text-muted/60">Legal</Link>
            </div>
          </footer>
        </div>
        {gaEnabled && <GaPageView gaId="G-NHEBM8VYNG" />}
      </body>
    </html>
  );
}
