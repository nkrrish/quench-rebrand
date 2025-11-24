"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, MessageSquare, CheckCircle2 } from "lucide-react";
import { useThemeStore } from "@/lib/store";

export function HowItWorksSection() {
    const { isGradient, gradientColors, gradientDirection, accentColor } = useThemeStore();

    const steps = [
        {
            icon: Link2,
            title: "Connect your tools",
            description: "Use OAuth to link Slack, Google Workspace, Notion and more in seconds with limited IT support. Only you can access your information."
        },
        {
            icon: MessageSquare,
            title: "Ask natural questions",
            description: "Ask simple prompts like \"What's our refund process?\" or \"Who fixed this bug last time?\" or \"Where's the Q4 plan?\""
        },
        {
            icon: CheckCircle2,
            title: "Get relevant answers",
            description: "Receive complete answers based only on your actual company information with links to the original sources."
        }
    ];

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                        How{" "}
                        <span
                            className={isGradient ? "bg-clip-text text-transparent" : "text-primary"}
                            style={isGradient ? {
                                backgroundImage: `linear-gradient(${gradientDirection}, ${gradientColors.join(", ")})`
                            } : undefined}
                        >
                            it works
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground font-body">
                        Get started in minutes, not days
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="relative animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${index * 150}ms` }}>
                                {index < steps.length - 1 && (
                                    <div 
                                        className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] transition-all duration-500"
                                        style={accentColor ? {
                                            backgroundColor: `${accentColor}30`
                                        } : {
                                            backgroundColor: 'var(--border)'
                                        }}
                                    ></div>
                                )}
                                <Card 
                                    className="bg-background border hover:shadow-lg hover:scale-[1.02] transition-all duration-300 relative z-10 group"
                                    style={accentColor ? {
                                        borderColor: `${accentColor}20`
                                    } : undefined}
                                >
                                    <CardHeader>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div 
                                                className={`h-12 w-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${!accentColor && 'bg-muted'}`}
                                                style={accentColor ? {
                                                    backgroundColor: `${accentColor}15`
                                                } : undefined}
                                            >
                                                <Icon 
                                                    className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" 
                                                    style={accentColor ? {
                                                        color: accentColor
                                                    } : undefined}
                                                />
                                            </div>
                                            <div 
                                                className="text-3xl font-bold text-muted-foreground/30"
                                            >
                                                {index + 1}
                                            </div>
                                        </div>
                                        <CardTitle className="font-heading text-xl">{step.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-muted-foreground font-body">
                                        {step.description}
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
