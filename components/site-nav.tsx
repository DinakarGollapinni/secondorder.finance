"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/playbook", label: "Playbook" },
  { href: "/toolkit", label: "Toolkit" },
  { href: "/pro", label: "Pro" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b hairline bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl glass shadow-soft flex items-center justify-center">
            <span className="font-semibold tracking-tight">SO</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white/90">SecondOrder</div>
            <div className="text-xs text-muted">Portfolio OS</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          {items.map((it) => {
            const active = pathname === it.href || (it.href !== "/" && pathname?.startsWith(it.href));
            return (
              <Link
                key={it.href}
                href={it.href}
                className={[
                  "rounded-xl px-3 py-2 text-sm transition",
                  active ? "glass" : "text-white/80 hover:text-white hover:bg-white/5",
                ].join(" ")}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/pro" className="btn btn-primary">
            Early Access
          </Link>
        </div>
      </div>
    </header>
  );
}
