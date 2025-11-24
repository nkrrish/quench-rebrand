"use client";

import { useThemeStore } from "@/lib/store";

export function StatsSection() {
    const { isGradient, gradientColors, gradientDirection } = useThemeStore();

    const stats = [
        { value: "10k+", label: "Active Users" },
        { value: "500+", label: "Companies" },
        { value: "99.9%", label: "Uptime" },
        { value: "60%", label: "Time Saved" }
    ];

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div
                                className={`text-4xl md:text-5xl font-heading font-bold mb-2 ${!isGradient && 'text-primary'}`}
                                style={isGradient ? {
                                    backgroundImage: `linear-gradient(${gradientDirection}, ${gradientColors.join(", ")})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                } : undefined}
                            >
                                {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground font-body">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
