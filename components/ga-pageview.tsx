"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

function GaPageViewInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!window.gtag) return;

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
        window.gtag("event", "page_view", {
            page_location: window.location.href,
            page_path: url,
        });
    }, [pathname, searchParams]);

    return null;
}

export function GaPageView({ gaId }: { gaId: string }) {
    return (
        <Suspense fallback={null}>
            <GaPageViewInner />
        </Suspense>
    );
}
