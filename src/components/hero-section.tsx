"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useThemeStore } from "@/lib/store";
import Image from "next/image";
import { LogoScroller } from "@/components/logo-scroller";
import * as React from "react";

export function HeroSection() {
    const { isGradient, gradientColors, gradientDirection, primaryColor, accentColor: storeAccentColor } = useThemeStore();
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);
    const iconsContainerRef = React.useRef<HTMLDivElement>(null);

    // Get the primary color or first gradient color for background spots
    const accentColor = isGradient ? gradientColors[0] : primaryColor;
    // Use store accentColor if available, otherwise fall back to gradient second color or primary
    const secondaryColor = storeAccentColor || (isGradient && gradientColors.length > 1 ? gradientColors[1] : primaryColor);

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!iconsContainerRef.current || !isHovered) return;
            
            const rect = iconsContainerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const x = (e.clientX - centerX) / (rect.width / 2);
            const y = (e.clientY - centerY) / (rect.height / 2);
            
            setMousePosition({ x, y });
        };

        if (isHovered) {
            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [isHovered]);

    const rotateX = mousePosition.y * 5; // Max 5 degrees tilt for icons (more subtle)
    const rotateY = mousePosition.x * 5;
    const scale = isHovered ? 1.01 : 1;

    return (
        <section className="relative pt-20 pb-0 overflow-hidden">
            <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium bg-muted mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="flex h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                    <span>New: Integration with</span>
                    <span className="inline-flex items-center gap-1 hover:scale-105 transition-transform duration-200">
                        <Image
                            src="/notion-logo.png"
                            alt="Notion"
                            width={16}
                            height={16}
                            className="object-contain border border-black/5 dark:border-transparent rounded"
                        />
                        <span>Notion</span>
                    </span>
                    <span>&</span>
                    <span className="inline-flex items-center gap-1 hover:scale-105 transition-transform duration-200">
                        <Image
                            src="/slack-logo.png"
                            alt="Slack"
                            width={16}
                            height={16}
                            className="object-contain border border-black/5 dark:border-transparent rounded"
                        />
                        <span>Slack</span>
                    </span>
                </div>

                {/* Text content with floating icons */}
                <div className="relative max-w-4xl mb-10">
                    {/* Floating Icons - only around text */}
                    <div 
                        ref={iconsContainerRef}
                        className="absolute inset-0 z-20 transition-all duration-500 ease-out"
                        style={{
                            transform: `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
                            transformStyle: 'preserve-3d',
                            pointerEvents: 'auto',
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => {
                            setIsHovered(false);
                            setMousePosition({ x: 0, y: 0 });
                        }}
                    >
                        {/* Notion - top left */}
                        <div className="absolute -top-4 -left-24 w-10 h-10 rounded-lg bg-white dark:bg-white/10 border border-black/5 dark:border-transparent flex items-center justify-center transition-transform duration-300 animate-in fade-in slide-in-from-top-4 duration-1000 delay-100">
                            <Image
                                src="/icon-5.png"
                                alt=""
                                width={40}
                                height={40}
                                className="opacity-100"
                            />
                        </div>
                        {/* WhatsApp - upper left */}
                        <div className="absolute top-[15%] -left-28 w-10 h-10 rounded-lg bg-white dark:bg-white/10 border border-black/5 dark:border-transparent flex items-center justify-center transition-transform duration-300 animate-in fade-in slide-in-from-left-4 duration-1000 delay-200">
                            <Image
                                src="/icon-8.png"
                                alt=""
                                width={40}
                                height={40}
                                className="opacity-100"
                            />
                        </div>
                        {/* Asana - left middle */}
                        <div className="absolute top-[45%] -left-32 w-10 h-10 rounded-lg bg-white dark:bg-white/10 border border-black/5 dark:border-transparent flex items-center justify-center transition-transform duration-300 animate-in fade-in slide-in-from-left-4 duration-1000 delay-300">
                            <Image
                                src="/icon-3.png"
                                alt=""
                                width={40}
                                height={40}
                                className="opacity-100"
                            />
                        </div>
                        {/* Confluence - lower left */}
                        <div className="absolute bottom-[10%] -left-28 w-10 h-10 rounded-lg bg-white dark:bg-white/10 border border-black/5 dark:border-transparent flex items-center justify-center transition-transform duration-300 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
                            <Image
                                src="/icon-2.png"
                                alt=""
                                width={40}
                                height={40}
                                className="opacity-100"
                            />
                        </div>
                        {/* Google Calendar - top right */}
                        <div className="absolute -top-4 -right-24 w-10 h-10 rounded-lg bg-white dark:bg-white/10 border border-black/5 dark:border-transparent flex items-center justify-center transition-transform duration-300 animate-in fade-in slide-in-from-top-4 duration-1000 delay-100">
                            <Image
                                src="/icon-1.png"
                                alt=""
                                width={40}
                                height={40}
                                className="opacity-100"
                            />
                        </div>
                        {/* Salesforce - middle right */}
                        <div className="absolute top-[25%] -right-28 w-10 h-10 rounded-lg bg-white dark:bg-white/10 border border-black/5 dark:border-transparent flex items-center justify-center transition-transform duration-300 animate-in fade-in slide-in-from-right-4 duration-1000 delay-200">
                            <Image
                                src="/icon-7.png"
                                alt=""
                                width={40}
                                height={40}
                                className="opacity-100"
                            />
                        </div>
                        {/* Slack - lower middle right */}
                        <div className="absolute top-[50%] -right-32 w-10 h-10 rounded-lg bg-white dark:bg-white/10 border border-black/5 dark:border-transparent flex items-center justify-center transition-transform duration-300 animate-in fade-in slide-in-from-right-4 duration-1000 delay-300">
                            <Image
                                src="/icon-6.png"
                                alt=""
                                width={40}
                                height={40}
                                className="opacity-100"
                            />
                        </div>
                        {/* Gmail - bottom right */}
                        <div className="absolute bottom-[5%] -right-28 w-10 h-10 rounded-lg bg-white dark:bg-white/10 border border-black/5 dark:border-transparent flex items-center justify-center transition-transform duration-300 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
                            <Image
                                src="/icon-4.png"
                                alt=""
                                width={40}
                                height={40}
                                className="opacity-100"
                            />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
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

                    <p className="text-xl text-muted-foreground font-body leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                        Search and get verified answers from your internal tools. Centralize resources, reduce onboarding time and keep teams aligned.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000" style={{ animationDelay: '700ms' }}>
                    <Button size="lg" className="h-12 px-8 text-base hover:scale-105 active:scale-95 transition-transform duration-200 group">
                        Start for free <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                        <Button size="lg" variant="outline" className="h-12 px-8 text-base hover:scale-105 active:scale-95 transition-transform duration-200 hover:bg-background hover:text-foreground dark:hover:bg-input/50">
                            Book a demo
                        </Button>
                </div>

                {/* Logo Scroller */}
                <LogoScroller />

                {/* Hero Image */}
                <div className="relative w-full max-w-7xl aspect-[21/9] rounded-t-xl border border-b-0 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-900">
                    <Image
                        src="/hero-product.png"
                        alt="Ollo Product Interface"
                        fill
                        className="object-cover object-top bg-muted/50 hover:scale-[1.02] transition-transform duration-700"
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
