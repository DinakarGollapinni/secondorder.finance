
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMarketSignal } from "@/lib/market-data";
import { SignalsDashboard } from "./SignalsDashboard";

export async function EquityPurchasingPowerCard() {
    const signal = await getMarketSignal();

    if (!signal) {
        return (
            <Card className="overflow-hidden accent-glow">
                <CardHeader className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium text-white/90">SecondOrder Signals</div>
                        <div className="text-xs text-muted">Snapshot</div>
                    </div>
                    <Badge className="border-red-500/50 text-red-400">Data Unavailable</Badge>
                </CardHeader>
                <CardContent>
                    <div className="h-32 flex items-center justify-center text-sm text-muted">
                        Unable to fetch market data.
                    </div>
                </CardContent>
            </Card>
        );
    }

    return <SignalsDashboard signal={signal} />;
}
