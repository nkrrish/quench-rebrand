"use client";

import * as React from "react";
import { useThemeStore } from "@/lib/store";

export function ThemeProviderWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const {
        fontHeading,
        fontBody,
        primaryColor,
        isGradient,
        gradientColors,
        gradientDirection,
        radius,
        mode
    } = useThemeStore();

    React.useEffect(() => {
        const root = window.document.documentElement;

        // Apply Mode
        root.classList.remove("light", "dark");
        root.classList.add(mode);

        // Apply Radius
        root.style.setProperty("--radius", `${radius}rem`);

        // Apply Primary Color & Gradient
        // Tailwind v4 supports hex in variables for opacity modifiers via color-mix
        root.style.setProperty("--primary", primaryColor);
        root.style.setProperty("--ring", primaryColor);

        if (isGradient && gradientColors.length > 0) {
            const gradient = `linear-gradient(${gradientDirection}, ${gradientColors.join(", ")})`;
            root.style.setProperty("--primary-gradient", gradient);
        } else {
            root.style.setProperty("--primary-gradient", primaryColor);
        }

        // Apply Fonts
        // We assume the fonts are loaded in layout.tsx with CSS variables matching their names
        // e.g. --font-inter, --font-playfair
        // We will map the selection to the variable name
        const headingVar = `var(--font-${fontHeading.toLowerCase().replace(/ /g, "-")})`;
        const bodyVar = `var(--font-${fontBody.toLowerCase().replace(/ /g, "-")})`;

        // We can set a global variable that components use
        root.style.setProperty("--font-heading-dynamic", headingVar);
        root.style.setProperty("--font-body-dynamic", bodyVar);

    }, [fontHeading, fontBody, primaryColor, isGradient, gradientColors, gradientDirection, radius, mode]);

    return <>{children}</>;
}
