"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useThemeStore } from "@/lib/store";
import Image from "next/image";

export function HeroSection() {
    const { isGradient, gradientColors, gradientDirection, primaryColor } = useThemeStore();

    // Get the primary color or first gradient color for background spots
    const accentColor = isGradient ? gradientColors[0] : primaryColor;
    const secondaryColor = isGradient && gradientColors.length > 1 ? gradientColors[1] : primaryColor;

    return (
        <section className="relative pt-20 pb-0 overflow-hidden">
            <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-muted mb-8">
                    <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    New: Integration with Notion & Slack
                </div>

                {/* Text content with floating icons */}
                <div className="relative max-w-4xl mb-10">
                    {/* Floating Icons - only around text */}
                    <div className="absolute inset-0 pointer-events-none z-20">
                        {/* Notion - top left */}
                        <div className="absolute -top-4 -left-24 w-10 h-10 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center">
                            <Image
                                src="/icon-5.png"
                                alt=""
                                width={40}
                                height={40}
                                className="opacity-60"
                            />
                        </div>
                        {/* WhatsApp - upper left */}
                        <div className="absolute top-[15%] -left-28 w-10 h-10 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center">
                            <Image
                                src="/icon-8.png"
                                alt=""
                                width={40}
                                height={40}
                                className="opacity-60"
                            />
                        </div>
                        {/* Asana - left middle */}
                        <div className="absolute top-[45%] -left-32 w-10 h-10 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center">
                            <Image
                                src="/icon-3.png"
                                alt=""
                                width={40}
                                height={40}
                                className="opacity-60"
                            />
                        </div>
                        {/* Confluence - lower left */}
                        <div className="absolute bottom-[10%] -left-28 w-10 h-10 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center">
                            <Image
                                src="/icon-2.png"
                                alt=""
                                width={40}
                                height={40}
                                className="opacity-60"
                            />
                        </div>
                        {/* Google Calendar - top right */}
                        <div className="absolute -top-4 -right-24 w-10 h-10 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center">
                            <Image
                                src="/icon-1.png"
                                alt=""
                                width={40}
                                height={40}
                                className="opacity-60"
                            />
                        </div>
                        {/* Salesforce - middle right */}
                        <div className="absolute top-[25%] -right-28 w-10 h-10 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center">
                            <Image
                                src="/icon-7.png"
                                alt=""
                                width={40}
                                height={40}
                                className="opacity-60"
                            />
                        </div>
                        {/* Slack - lower middle right */}
                        <div className="absolute top-[50%] -right-32 w-10 h-10 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center">
                            <Image
                                src="/icon-6.png"
                                alt=""
                                width={40}
                                height={40}
                                className="opacity-60"
                            />
                        </div>
                        {/* Gmail - bottom right */}
                        <div className="absolute bottom-[5%] -right-28 w-10 h-10 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center">
                            <Image
                                src="/icon-4.png"
                                alt=""
                                width={40}
                                height={40}
                                className="opacity-60"
                            />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-6">
                        Powering organizations to{" "}
                        <span
                            className={isGradient ? "bg-clip-text text-transparent" : "text-primary"}
                            style={isGradient ? {
                                backgroundImage: `linear-gradient(${gradientDirection}, ${gradientColors.join(", ")})`
                            } : undefined}
                        >
                            leverage AI
                        </span>
                        {" "}without surrendering control
                    </h1>

                    <p className="text-xl text-muted-foreground font-body leading-relaxed">
                        Search and get verified answers from your internal tools. Centralize resources, reduce onboarding time and keep teams aligned.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-20 justify-center">
                    <Button size="lg" className="h-12 px-8 text-base">
                        Start for free <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                        Book a demo
                    </Button>
                </div>

                {/* Hero Image */}
                <div className="relative w-full max-w-7xl aspect-[21/9] rounded-t-xl border border-b-0 overflow-hidden shadow-2xl">
                    <Image
                        src="/hero-product.png"
                        alt="Ollo Product Interface"
                        fill
                        className="object-cover object-top bg-muted/50"
                        quality={100}
                        unoptimized
                        priority
                    />
                </div>
            </div>

            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
                <div
                    className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen"
                    style={{ backgroundColor: `${accentColor}1A` }}
                ></div>
                <div
                    className="absolute top-40 right-10 w-72 h-72 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen"
                    style={{ backgroundColor: `${secondaryColor}1A` }}
                ></div>
            </div>
        </section>
    );
}
