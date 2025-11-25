"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useThemeStore } from "@/lib/store";
import { DynamicLogo } from "@/components/dynamic-logo";
import * as React from "react";

// Helper function to convert hex to rgba
function hexToRgba(hex: string, opacity: number): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return `rgba(0, 0, 0, ${opacity})`;
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Interactive logo component with mouse movement animation
function LogoWithAnimation({ 
    isGradient, 
    gradientColors, 
    className 
}: { 
    isGradient: boolean; 
    gradientColors: string[]; 
    className?: string;
}) {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);
    const logoRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!logoRef.current || !isHovered) return;
            
            const rect = logoRef.current.getBoundingClientRect();
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

    const rotateX = mousePosition.y * 15; // Max 15 degrees tilt
    const rotateY = mousePosition.x * 15;
    const scale = isHovered ? 1.05 : 1;

    return (
        <div 
            className={`flex items-center justify-center mt-12 mb-0 relative ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setMousePosition({ x: 0, y: 0 });
            }}
        >
            <div 
                ref={logoRef}
                className="relative group transition-all duration-300 ease-out"
                style={{
                    transform: `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
                    transformStyle: 'preserve-3d',
                }}
            >
                <div className="flex items-center justify-center transition-opacity duration-500">
                    <DynamicLogo className="w-[400px] h-[192px] md:w-[600px] md:h-[288px] opacity-10 hover:opacity-100 transition-opacity duration-500" />
                </div>
                {isGradient && (
                    <div 
                        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `radial-gradient(circle at center, transparent 0%, transparent 50%, ${gradientColors[0]}08 100%)`
                        }}
                    />
                )}
            </div>
        </div>
    );
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
        <section className="pt-24 pb-0 relative overflow-hidden">
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
                        <Button size="lg" variant="outline" className="h-12 px-8 text-base hover:scale-105 active:scale-95 transition-transform duration-200 hover:bg-background hover:text-foreground dark:hover:bg-input/50">
                            Schedule a demo
                        </Button>
                    </div>
                    {/* Logo with bottom 30% extending into footer */}
                    <LogoWithAnimation 
                        isGradient={isGradient} 
                        gradientColors={gradientColors}
                        className="-mb-[58px] md:-mb-[86px]"
                    />
                </div>
            </div>
        </section>
    );
}
