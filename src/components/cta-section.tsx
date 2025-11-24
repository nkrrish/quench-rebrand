"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useThemeStore } from "@/lib/store";

export function CTASection() {
    const { isGradient, gradientColors, gradientDirection, primaryColor } = useThemeStore();

    // Get the primary color or first gradient color for background
    const bgColor = isGradient ? gradientColors[0] : primaryColor;

    return (
        <section className="py-24 relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-5"
                style={isGradient ? {
                    background: `linear-gradient(${gradientDirection}, ${gradientColors.join(", ")})`
                } : {
                    backgroundColor: bgColor
                }}
            ></div>

            <div className="container mx-auto relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
                        Ready to transform your{" "}
                        <span
                            className={isGradient ? "bg-clip-text text-transparent" : "text-primary"}
                            style={isGradient ? {
                                backgroundImage: `linear-gradient(${gradientDirection}, ${gradientColors.join(", ")})`
                            } : undefined}
                        >
                            team's workflow?
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground mb-10 font-body">
                        Join hundreds of teams already using ollo to streamline their operations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="h-12 px-8 text-base">
                            Get started free <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                            Schedule a demo
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
