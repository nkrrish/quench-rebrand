"use client";

export function LogoScroller() {
    // Fake logos with different font styles to look like different brands
    const logos = [
        {
            name: "TechCorp",
            fontFamily: "'Arial Black', 'Arial Bold', Arial, sans-serif",
            fontWeight: "900",
            letterSpacing: "-0.02em",
            textTransform: "none" as const,
        },
        {
            name: "DataFlow",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: "700",
            letterSpacing: "0.05em",
            textTransform: "uppercase" as const,
        },
        {
            name: "CloudSync",
            fontFamily: "'Courier New', Courier, monospace",
            fontWeight: "600",
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
        },
        {
            name: "NextGen",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "300",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
        },
        {
            name: "Innovate",
            fontFamily: "'Trebuchet MS', 'Lucida Grande', sans-serif",
            fontWeight: "700",
            letterSpacing: "0.03em",
            textTransform: "none" as const,
        },
        {
            name: "SwiftScale",
            fontFamily: "Verdana, Geneva, sans-serif",
            fontWeight: "600",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
        },
        {
            name: "MetaForge",
            fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
            fontWeight: "700",
            letterSpacing: "0.04em",
            textTransform: "none" as const,
        },
        {
            name: "Quantum",
            fontFamily: "'Lucida Console', 'Monaco', monospace",
            fontWeight: "500",
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
        },
        {
            name: "Nexus",
            fontFamily: "Tahoma, Geneva, sans-serif",
            fontWeight: "400",
            letterSpacing: "0.06em",
            textTransform: "none" as const,
        },
        {
            name: "ApexSystems",
            fontFamily: "'Impact', 'Charcoal', sans-serif",
            fontWeight: "400",
            letterSpacing: "0.02em",
            textTransform: "uppercase" as const,
        },
    ];

    // Duplicate logos multiple times for seamless infinite scroll
    // We need enough duplicates so when we loop, it's seamless
    // With 5 logos, duplicating 4 times gives us 20 logos total
    // Animating by 25% (1/4) moves exactly one set, creating perfect loop
    const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

    return (
        <div className="pt-8 pb-4 overflow-hidden relative mb-12">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
            
            {/* Scrolling container */}
            <div className="flex animate-scroll will-change-transform">
                {duplicatedLogos.map((logo, index) => (
                    <div
                        key={`${logo.name}-${index}`}
                        className="flex-shrink-0 mx-8 flex items-center justify-center"
                        style={{ minWidth: '200px' }}
                    >
                        <span 
                            className="text-2xl text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300 whitespace-nowrap"
                            style={{ 
                                fontFamily: logo.fontFamily,
                                fontWeight: logo.fontWeight,
                                letterSpacing: logo.letterSpacing,
                                textTransform: logo.textTransform,
                            }}
                        >
                            {logo.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

