import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SavedTheme {
    id: string;
    name: string;
    fontHeading: string;
    fontBody: string;
    primaryColor: string;
    isGradient: boolean;
    gradientColors: string[];
    gradientDirection: string;
    radius: number;
    mode: 'light' | 'dark';
}

export interface ThemeState {
    fontHeading: string;
    fontBody: string;
    primaryColor: string;
    isGradient: boolean;
    gradientColors: string[];
    gradientDirection: string;
    radius: number;
    mode: 'light' | 'dark';
    savedThemes: SavedTheme[];
    setFontHeading: (font: string) => void;
    setFontBody: (font: string) => void;
    setPrimaryColor: (color: string) => void;
    setIsGradient: (isGradient: boolean) => void;
    setGradientColors: (colors: string[]) => void;
    setGradientDirection: (direction: string) => void;
    setRadius: (radius: number) => void;
    setMode: (mode: 'light' | 'dark') => void;
    saveTheme: (name: string) => void;
    deleteTheme: (id: string) => void;
    loadTheme: (theme: SavedTheme) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            fontHeading: 'Inter',
            fontBody: 'Inter',
            primaryColor: '#3b82f6', // Default blue
            isGradient: false,
            gradientColors: ['#3b82f6', '#8b5cf6'],
            gradientDirection: 'to right',
            radius: 0.5,
            mode: 'light',
            savedThemes: [],
            setFontHeading: (font) => set({ fontHeading: font }),
            setFontBody: (font) => set({ fontBody: font }),
            setPrimaryColor: (color) => set({ primaryColor: color }),
            setIsGradient: (isGradient) => set({ isGradient }),
            setGradientColors: (gradientColors) => set({ gradientColors }),
            setGradientDirection: (gradientDirection) => set({ gradientDirection }),
            setRadius: (radius) => set({ radius }),
            setMode: (mode) => set({ mode }),
            saveTheme: (name) => {
                const { fontHeading, fontBody, primaryColor, isGradient, gradientColors, gradientDirection, radius, mode, savedThemes } = get();
                const newTheme: SavedTheme = {
                    id: crypto.randomUUID(),
                    name,
                    fontHeading,
                    fontBody,
                    primaryColor,
                    isGradient,
                    gradientColors,
                    gradientDirection,
                    radius,
                    mode,
                };
                set({ savedThemes: [...savedThemes, newTheme] });
            },
            deleteTheme: (id) => {
                set({ savedThemes: get().savedThemes.filter((t) => t.id !== id) });
            },
            loadTheme: (theme) => {
                set({
                    fontHeading: theme.fontHeading,
                    fontBody: theme.fontBody,
                    primaryColor: theme.primaryColor,
                    isGradient: theme.isGradient || false,
                    gradientColors: theme.gradientColors || ['#3b82f6', '#8b5cf6'],
                    gradientDirection: theme.gradientDirection || 'to right',
                    radius: theme.radius,
                    mode: theme.mode,
                });
            },
        }),
        {
            name: 'quench-theme-storage',
        }
    )
);
