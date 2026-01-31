import Link from "next/link";
import { playbookIndex } from "@/content/playbook/index";
import { Card, CardContent } from "@/components/ui/card";

export default function PlaybookIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight">Playbook</h1>
        <p className="mt-3 text-white/70">
          Systems-level thinking across asset classes. Not advice — frameworks.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {playbookIndex.map((a) => (
          <Link key={a.slug} href={`/playbook/${a.slug}`} className="block">
            <Card className="h-full transition hover:border-white/20">
              <CardContent className="p-6">
                <div className="text-xs uppercase tracking-wider text-white/50">
                  {a.category}
                </div>
                <div className="mt-2 text-lg font-semibold">{a.title}</div>
                <div className="mt-2 text-white/70">{a.description}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
