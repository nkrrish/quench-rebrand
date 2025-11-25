"use client";

import * as React from "react";
import { useThemeStore, loadAllThemes } from "@/lib/store";
import { loadGoogleFont, fontFamilyToVariable } from "@/lib/googleFonts";

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
        mode,
        accentColor
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
        // For gradients, use the first gradient color for --primary to ensure hover states work
        const primaryColorValue = isGradient && gradientColors.length > 0 ? gradientColors[0] : primaryColor;
        root.style.setProperty("--primary", primaryColorValue);
        root.style.setProperty("--ring", primaryColorValue);

        if (isGradient && gradientColors.length > 0) {
            const gradient = `linear-gradient(${gradientDirection}, ${gradientColors.join(", ")})`;
            root.style.setProperty("--primary-gradient", gradient);
        } else {
            root.style.setProperty("--primary-gradient", primaryColor);
        }

        // Apply Fonts
        // Load Google Fonts dynamically if needed
        loadGoogleFont(fontHeading);
        loadGoogleFont(fontBody);

        // System fonts that are already defined in layout.tsx
        const systemFonts = ["Stack Sans Headline", "Stack Sans Notch", "SF Pro Display", "SF Pro Text"];
        
        // For system fonts, use the CSS variable from layout.tsx
        // For Google Fonts, use the font family name directly
        const getFontValue = (fontFamily: string) => {
            if (systemFonts.includes(fontFamily)) {
                const varName = fontFamilyToVariable(fontFamily);
                return `var(--font-${varName})`;
            }
            // For Google Fonts, use the font family name directly
            return `"${fontFamily}", sans-serif`;
        };

        const headingFont = getFontValue(fontHeading);
        const bodyFont = getFontValue(fontBody);

        // Set CSS variables for dynamic fonts
        root.style.setProperty("--font-heading-dynamic", headingFont);
        root.style.setProperty("--font-body-dynamic", bodyFont);

        // Apply Accent Color - use primary color as fallback if not set
        // For gradients, use the first gradient color for accent to ensure hover states work
        if (accentColor) {
            root.style.setProperty("--accent", accentColor);
        } else {
            // Fallback to primary color (or first gradient color) when accent is not set
            root.style.setProperty("--accent", primaryColorValue);
        }

    }, [fontHeading, fontBody, primaryColor, isGradient, gradientColors, gradientDirection, radius, mode, accentColor]);

    // Load themes once on component mount
    React.useEffect(() => {
        loadAllThemes();
    }, []);

    return <>{children}</>;
}
