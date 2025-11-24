"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useThemeStore } from "@/lib/store";

export function TestimonialsSection() {
    const { isGradient, gradientColors, gradientDirection, accentColor, mode } = useThemeStore();

    const testimonials = [
        {
            quote: "With ollo, what used to take 15–20 minutes now takes seconds.",
            author: "Sarah Chen",
            role: "Head of Operations",
            company: "TechCorp"
        },
        {
            quote: "ollo is like an AI librarian that picks out the right book and points you to the right page, paragraph and sentence – every single time.",
            author: "Michael Rodriguez",
            role: "Engineering Manager",
            company: "DataFlow"
        },
        {
            quote: "What sets ollo apart is how seamlessly it integrates into our ecosystem. It's been a huge boost to both our productivity.",
            author: "Emily Watson",
            role: "VP of Customer Success",
            company: "GrowthLabs"
        }
    ];

    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                        Don't take our{" "}
                        <span
                            className={isGradient ? "bg-clip-text text-transparent" : "text-primary"}
                            style={isGradient ? {
                                backgroundImage: `linear-gradient(${gradientDirection}, ${gradientColors.join(", ")})`
                            } : undefined}
                        >
                            word for it
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground font-body">
                        See how fast-growing teams find answers 2x faster
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card 
                            key={index} 
                            className="bg-background border hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 group"
                            style={{
                                animationDelay: `${index * 150}ms`,
                                ...(accentColor ? {
                                    borderColor: `${accentColor}20`
                                } : {})
                            }}
                        >
                            <CardContent className="pt-6">
                                <div className="mb-6">
                                    <svg 
                                        className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" 
                                        style={accentColor ? {
                                            fill: accentColor,
                                            opacity: 0.25
                                        } : mode === 'dark' ? {
                                            fill: 'white',
                                            opacity: 0.1
                                        } : {
                                            fill: 'currentColor',
                                            opacity: 0.2
                                        }}
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                </div>
                                <p className="text-foreground mb-6 font-body leading-relaxed">
                                    "{testimonial.quote}"
                                </p>
                                <div 
                                    className="border-t pt-4"
                                    style={accentColor ? {
                                        borderTopColor: `${accentColor}30`
                                    } : undefined}
                                >
                                    <p className="font-semibold font-heading">{testimonial.author}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {testimonial.role} at {testimonial.company}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
