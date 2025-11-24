"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Clock, Shield, Zap } from "lucide-react";
import { useThemeStore } from "@/lib/store";

export function BenefitsSection() {
    const { isGradient, gradientColors, gradientDirection } = useThemeStore();

    const benefits = [
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Get answers in seconds, not hours. Our AI searches across all your tools instantly."
        },
        {
            icon: Shield,
            title: "Enterprise Security",
            description: "SOC 2 Type II certified. Your data stays secure with enterprise-grade encryption."
        },
        {
            icon: Clock,
            title: "Save Time",
            description: "Reduce onboarding time by 60%. New team members get up to speed faster."
        },
        {
            icon: Sparkles,
            title: "Always Learning",
            description: "Our AI gets smarter over time, learning from your team's knowledge base."
        }
    ];

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                        Why teams choose{" "}
                        <span
                            className={isGradient ? "bg-clip-text text-transparent" : "text-primary"}
                            style={isGradient ? {
                                backgroundImage: `linear-gradient(${gradientDirection}, ${gradientColors.join(", ")})`
                            } : undefined}
                        >
                            ollo
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground font-body">
                        Built for modern teams who need fast, accurate answers without the hassle.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <Card key={index} className="bg-background border hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
                                        <Icon className="h-6 w-6 text-foreground" />
                                    </div>
                                    <CardTitle className="font-heading text-xl">{benefit.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-muted-foreground">
                                    {benefit.description}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
