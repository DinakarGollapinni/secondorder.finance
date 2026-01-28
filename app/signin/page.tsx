import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SignIn() {
  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <div className="text-sm font-medium text-white/90">Sign in</div>
          <div className="text-xs text-muted">Auth will be added in v2 (Clerk/Supabase)</div>
        </CardHeader>
        <CardContent className="text-sm text-white/80 space-y-3">
          <p>This is a placeholder page so the site feels like a product. Next we’ll integrate Stripe + authentication.</p>
          <div className="flex gap-3">
            <Link href="/pro" className="btn btn-primary">See Pro</Link>
            <Link href="/" className="btn btn-ghost">Home</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
