"use client";

import { useState, useEffect, useRef } from "react";
import { useThemeStore } from "@/lib/store";

interface Stat {
    value: string;
    label: string;
    targetValue: number;
    suffix: string;
    isPercentage: boolean;
}

function parseStatValue(value: string): { targetValue: number; suffix: string; isPercentage: boolean } {
    // Handle percentage values
    if (value.includes('%')) {
        const num = parseFloat(value.replace('%', ''));
        return { targetValue: num, suffix: '%', isPercentage: true };
    }
    
    // Handle "k" suffix (e.g., "10k+")
    if (value.toLowerCase().includes('k')) {
        const num = parseFloat(value.replace(/[k+]/gi, ''));
        return { targetValue: num, suffix: 'k+', isPercentage: false };
    }
    
    // Handle "+" suffix (e.g., "500+")
    if (value.includes('+')) {
        const num = parseFloat(value.replace('+', ''));
        return { targetValue: num, suffix: '+', isPercentage: false };
    }
    
    // Default: just a number
    const num = parseFloat(value);
    return { targetValue: num, suffix: '', isPercentage: false };
}

function formatCount(count: number, suffix: string, isPercentage: boolean): string {
    if (isPercentage) {
        return `${count.toFixed(1)}${suffix}`;
    }
    
    if (suffix.includes('k')) {
        return `${count.toFixed(0)}${suffix}`;
    }
    
    return `${Math.floor(count)}${suffix}`;
}

function CountUpStat({ 
    stat, 
    isInView, 
    index,
    isGradient,
    gradientColors,
    gradientDirection 
}: { 
    stat: Stat; 
    isInView: boolean; 
    index: number;
    isGradient: boolean;
    gradientColors: string[];
    gradientDirection: string;
}) {
    const [count, setCount] = useState(0);
    const hasAnimatedRef = useRef(false);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isInView || hasAnimatedRef.current) {
            return;
        }

        hasAnimatedRef.current = true;
        const duration = 2000;
        let startTime: number | null = null;

        const animate = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = easeOutQuart * stat.targetValue;
            
            setCount(currentCount);

            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            } else {
                setCount(stat.targetValue);
                animationFrameRef.current = null;
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
        };
    }, [isInView, stat.targetValue]);

    const displayValue = formatCount(count, stat.suffix, stat.isPercentage);

    return (
        <div 
            className="text-center hover:scale-105 transition-transform duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div
                className={`text-4xl md:text-5xl font-heading font-bold mb-2 ${!isGradient && 'text-primary'}`}
                style={isGradient ? {
                    backgroundImage: `linear-gradient(${gradientDirection}, ${gradientColors.join(", ")})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                } : undefined}
            >
                {displayValue}
            </div>
            <div className="text-sm text-muted-foreground font-body">
                {stat.label}
            </div>
        </div>
    );
}

export function StatsSection() {
    const { isGradient, gradientColors, gradientDirection } = useThemeStore();
    const [isInView, setIsInView] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const element = sectionRef.current;
        if (!element || isInView) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    if (observerRef.current) {
                        observerRef.current.disconnect();
                        observerRef.current = null;
                    }
                }
            },
            { threshold: 0.2 }
        );

        observerRef.current = observer;
        observer.observe(element);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        };
    }, [isInView]);

    const statsData: Stat[] = [
        { value: "10k+", label: "Active Users", ...parseStatValue("10k+") },
        { value: "500+", label: "Companies", ...parseStatValue("500+") },
        { value: "99.9%", label: "Uptime", ...parseStatValue("99.9%") },
        { value: "60%", label: "Time Saved", ...parseStatValue("60%") }
    ];

    return (
        <section ref={sectionRef} className="py-16 bg-muted/30">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {statsData.map((stat, index) => (
                        <CountUpStat
                            key={index}
                            stat={stat}
                            isInView={isInView}
                            index={index}
                            isGradient={isGradient}
                            gradientColors={gradientColors}
                            gradientDirection={gradientDirection}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
