"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { useThemeStore } from "@/lib/store";

export function FeatureSection() {
    const { isGradient, gradientColors, gradientDirection, accentColor } = useThemeStore();

    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading mb-4">
                        LLMs don't have your company context
                    </h2>
                    <p className="text-lg text-muted-foreground font-body">
                        Generic AI models give generic advice. ollo connects to your internal knowledge base to provide accurate, verified answers.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="bg-background border shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <CardHeader>
                            <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                            </div>
                            <CardTitle className="font-heading">The Problem</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-1">✕</span>
                                    Generic advice instead of policies
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-1">✕</span>
                                    Puts company information at risk
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-1">✕</span>
                                    Forces switching between apps
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-center md:col-span-1 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center justify-center p-4 rounded-full bg-muted mb-2 hover:scale-110 transition-transform duration-300 group">
                                <Zap className="h-8 w-8 text-foreground group-hover:rotate-12 transition-transform duration-300" />
                            </div>
                            <h3 className="text-xl font-heading">The ollo Solution</h3>
                            <p className="text-muted-foreground">
                                Connected to your tools. <br />
                                Secure by design. <br />
                                Always up to date.
                            </p>
                        </div>
                    </div>

                    <Card
                        className="bg-background border shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400"
                    >
                        <div
                            className={`absolute top-0 right-0 p-3 text-xs font-bold rounded-bl-xl ${!isGradient && !accentColor && 'bg-primary text-primary-foreground'}`}
                            style={accentColor ? {
                                backgroundColor: accentColor,
                                color: 'white'
                            } : isGradient ? {
                                background: `linear-gradient(${gradientDirection}, ${gradientColors.join(", ")})`,
                                color: 'white'
                            } : undefined}
                        >
                            RECOMMENDED
                        </div>
                        <CardHeader>
                            <div
                                className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${!isGradient && 'bg-primary/10'}`}
                                style={isGradient ? {
                                    background: `linear-gradient(${gradientDirection}, ${gradientColors.map(c => `${c}1A`).join(", ")})`
                                } : undefined}
                            >
                                <ShieldCheck
                                    className="h-6 w-6"
                                    style={isGradient ? {
                                        stroke: `url(#icon-gradient-shield)`
                                    } : undefined}
                                />
                                {isGradient && (
                                    <svg width="0" height="0" style={{ position: 'absolute' }}>
                                        <defs>
                                            <linearGradient id="icon-gradient-shield" x1="0%" y1="0%" x2={gradientDirection.includes('right') ? '100%' : '0%'} y2={gradientDirection.includes('bottom') ? '100%' : '0%'}>
                                                {gradientColors.map((color, index) => (
                                                    <stop key={index} offset={`${(index / (gradientColors.length - 1)) * 100}%`} stopColor={color} />
                                                ))}
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                )}
                            </div>
                            <CardTitle className="font-heading">With ollo</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            {isGradient && (
                                <svg width="0" height="0" style={{ position: 'absolute' }}>
                                    <defs>
                                        <linearGradient id="icon-gradient-check" x1="0%" y1="0%" x2={gradientDirection.includes('right') ? '100%' : '0%'} y2={gradientDirection.includes('bottom') ? '100%' : '0%'}>
                                            {gradientColors.map((color, index) => (
                                                <stop key={index} offset={`${(index / (gradientColors.length - 1)) * 100}%`} stopColor={color} />
                                            ))}
                                        </linearGradient>
                                    </defs>
                                </svg>
                            )}
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2
                                        className="h-5 w-5 shrink-0"
                                        style={isGradient ? {
                                            stroke: `url(#icon-gradient-check)`
                                        } : undefined}
                                    />
                                    <span>Instant answers from Slack & Notion</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2
                                        className="h-5 w-5 shrink-0"
                                        style={isGradient ? {
                                            stroke: `url(#icon-gradient-check)`
                                        } : undefined}
                                    />
                                    <span>SOC II Type 2 Certified Security</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2
                                        className="h-5 w-5 shrink-0"
                                        style={isGradient ? {
                                            stroke: `url(#icon-gradient-check)`
                                        } : undefined}
                                    />
                                    <span>References original sources</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
