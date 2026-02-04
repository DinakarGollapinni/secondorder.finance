import Link from "next/link";
import type { TocItem } from "@/lib/toc";
import type { ArticleMeta } from "@/lib/playbook";

const PLAYBOOK_CATEGORIES = ["metals", "equity", "crypto", "reits"] as const;

export default function PlaybookShell({
  title,
  summary,
  currentSlug,
  allArticles,
  toc,
  children,
}: {
  title: string;
  summary?: string;
  currentSlug: string;
  allArticles: ArticleMeta[];
  toc: TocItem[];
  children: React.ReactNode;
}) {
  const currentItem = allArticles.find((x) => x.slug === currentSlug);
  const currentCategory = currentItem?.asset;

  // Filter items for the sidebar list (current asset only)
  const filteredItems = currentCategory
    ? allArticles.filter((item) => item.asset === currentCategory)
    : allArticles;

  // Next/Prev within the same category
  const categoryIndex = filteredItems.findIndex((x) => x.slug === currentSlug);
  const prev = categoryIndex > 0 ? filteredItems[categoryIndex - 1] : null;
  const next =
    categoryIndex >= 0 && categoryIndex < filteredItems.length - 1
      ? filteredItems[categoryIndex + 1]
      : null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr_280px]">
        {/* Left nav */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wider text-white/50">
                Playbook
              </div>

              {/* Asset Switcher */}
              <div className="flex flex-wrap gap-1 rounded-xl bg-white/5 p-1">
                {PLAYBOOK_CATEGORIES.map((cat) => {
                  const firstOfCat = allArticles.find((i) => i.asset === cat);
                  const active = cat === currentCategory;
                  return (
                    <Link
                      key={cat}
                      href={firstOfCat ? `/playbook/${firstOfCat.asset}/${firstOfCat.slug}` : "#"}
                      className={[
                        "flex-1 rounded-lg px-2 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider transition",
                        active
                          ? "bg-white/10 text-white shadow-sm"
                          : "text-white/40 hover:text-white/60",
                      ].join(" ")}
                    >
                      {cat}
                    </Link>
                  );
                })}
              </div>
            </div>

            <nav className="space-y-1">
              {filteredItems.map((item) => {
                const active = item.slug === currentSlug;
                return (
                  <Link
                    key={item.slug}
                    href={`/playbook/${item.asset}/${item.slug}`}
                    className={[
                      "block rounded-lg px-3 py-2 text-sm transition",
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white",
                    ].join(" ")}
                  >
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-white/40">{item.asset}</div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main */}
        <main>
          <header className="mb-8">
            <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
            {summary ? (
              <p className="mt-3 max-w-2xl text-white/70">{summary}</p>
            ) : null}
            <div className="mt-3 text-sm italic text-white/40">
              This framework describes long-term portfolio behavior, not tactical trading.
            </div>
          </header>

          <div className="prose prose-invert max-w-none">{children}</div>

          <div className="mt-12 flex items-center justify-between gap-6 border-t border-white/10 pt-8">
            {prev ? (
              <Link
                href={`/playbook/${prev.asset}/${prev.slug}`}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:bg-white/10"
              >
                ← {prev.title}
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/playbook/${next.asset}/${next.slug}`}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:bg-white/10"
              >
                {next.title} →
              </Link>
            ) : (
              <div />
            )}
          </div>
        </main>

        {/* Right rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-wider text-white/50">
                On this page
              </div>
              <div className="mt-3 space-y-2 text-sm">
                {toc.length === 0 ? (
                  <div className="text-white/50">No sections.</div>
                ) : (
                  toc.map((t) => (
                    <a
                      key={t.id}
                      href={`#${t.id}`}
                      className={[
                        "block rounded-md px-2 py-1 text-white/70 hover:bg-white/5 hover:text-white",
                        t.level === 3 ? "ml-3 text-white/60" : "",
                      ].join(" ")}
                    >
                      {t.text}
                    </a>
                  ))
                )}
              </div>
            </div>

            {/* Pro CTA placeholder (we’ll replace with AdSlot later) */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-5">
              <div className="text-sm font-medium">SecondOrder Pro</div>
              <div className="mt-2 text-sm text-white/70">
                Backtests, portfolio signals, and automation-ready checklists.
              </div>
              <Link
                href="/pro"
                className="mt-4 inline-flex rounded-lg bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90"
              >
                Explore Pro
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
