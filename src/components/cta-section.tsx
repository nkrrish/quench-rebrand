"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useThemeStore } from "@/lib/store";

// Helper function to convert hex to rgba
function hexToRgba(hex: string, opacity: number): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return `rgba(0, 0, 0, ${opacity})`;
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function CTASection() {
    const { isGradient, gradientColors, gradientDirection, primaryColor, accentColor } = useThemeStore();

    // Get the primary color or first gradient color for background
    const bgColor = isGradient ? gradientColors[0] : primaryColor;
    
    // Create gradient mask: transparent at top (0% opacity) to primary color with 5% opacity at bottom
    // If accent color is available, blend it in
    const maskGradient = accentColor && !isGradient
        ? `linear-gradient(to bottom, transparent 0%, ${hexToRgba(primaryColor, 0.03)} 50%, ${hexToRgba(accentColor, 0.05)} 100%)`
        : isGradient 
        ? `linear-gradient(to bottom, transparent 0%, ${hexToRgba(gradientColors[0], 0.05)} 100%)`
        : `linear-gradient(to bottom, transparent 0%, ${hexToRgba(primaryColor, 0.05)} 100%)`;

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Base background matching the previous section */}
            <div className="absolute inset-0 bg-muted/30"></div>
            {/* Gradient mask layer on top */}
            <div
                className="absolute inset-0"
                style={{
                    background: maskGradient
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
                        <Button size="lg" className="h-12 px-8 text-base hover:scale-105 active:scale-95 transition-transform duration-200 group">
                            Get started free <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 px-8 text-base hover:scale-105 active:scale-95 transition-transform duration-200">
                            Schedule a demo
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
