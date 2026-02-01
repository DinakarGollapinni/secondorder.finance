import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Legal() {
    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <header className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-white/90">Legal</h1>
            </header>

            <Card>
                <CardHeader>
                    <div className="text-sm font-medium text-white/90">Disclaimer</div>
                </CardHeader>
                <CardContent className="text-sm text-white/80 space-y-6 leading-relaxed">
                    <p>
                        SecondOrder is a decision-support platform designed to help investors think systematically about long-term allocation, risk, and behavior across market cycles.
                    </p>

                    <div className="space-y-2">
                        <h3 className="font-medium text-white/90">No Investment Advice</h3>
                        <p>
                            SecondOrder does not provide personalized financial advice, investment recommendations, or trade instructions. The information presented on this site is general in nature and is not intended to be a substitute for professional financial advice.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-medium text-white/90">Risk Disclosure</h3>
                        <p>
                            All investment decisions involve risk, including the potential loss of capital.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-medium text-white/90">No Guarantees</h3>
                        <p>
                            Past performance, historical analysis, or modeled scenarios do not guarantee future results.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-medium text-white/90">User Responsibility</h3>
                        <p>
                            Users are responsible for their own investment decisions. SecondOrder is intended to support process and discipline, not to predict markets or optimize short-term outcomes.
                        </p>
                    </div>

                    <p className="pt-2 border-t border-white/5">
                        If you require personalized advice, consult a qualified financial professional.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
