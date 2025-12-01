import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchThemes, saveThemeAPI, deleteThemeAPI } from './themeAPI';

export interface SavedTheme {
    id: string;
    name: string;
    fontHeading: string;
    fontHeadingWeight?: string;
    fontBody: string;
    primaryColor: string;
    isGradient: boolean;
    gradientColors: string[];
    gradientDirection: string;
    radius: number;
    mode: 'light' | 'dark';
    accentColor?: string | null;
}

export interface ThemeState {
    fontHeading: string;
    fontHeadingWeight: string;
    fontBody: string;
    primaryColor: string;
    isGradient: boolean;
    gradientColors: string[];
    gradientDirection: string;
    radius: number;
    mode: 'light' | 'dark';
    accentColor: string | null;
    savedThemes: SavedTheme[];
    setFontHeading: (font: string) => void;
    setFontHeadingWeight: (weight: string) => void;
    setFontBody: (font: string) => void;
    setPrimaryColor: (color: string) => void;
    setIsGradient: (isGradient: boolean) => void;
    setGradientColors: (colors: string[]) => void;
    setGradientDirection: (direction: string) => void;
    setRadius: (radius: number) => void;
    setMode: (mode: 'light' | 'dark') => void;
    setAccentColor: (color: string | null) => void;
    saveTheme: (name: string) => Promise<void>;
    deleteTheme: (id: string) => Promise<void>;
    loadTheme: (theme: SavedTheme) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            fontHeading: 'Stack Sans Headline',
            fontHeadingWeight: '500', // Use numeric value for consistency
            fontBody: 'SF Pro Display',
            primaryColor: '#FF3E8B', // Pink Orange theme default
            isGradient: true,
            gradientColors: ['#FF7A32', '#FF3E8B'],
            gradientDirection: 'to bottom',
            radius: 1.8,
            mode: 'light',
            accentColor: '#00b9a6',
            savedThemes: [],
            setFontHeading: (font) => set({ fontHeading: font }),
            setFontHeadingWeight: (weight) => set({ fontHeadingWeight: weight }),
            setFontBody: (font) => set({ fontBody: font }),
            setPrimaryColor: (color) => set({ primaryColor: color }),
            setIsGradient: (isGradient) => set({ isGradient }),
            setGradientColors: (gradientColors) => set({ gradientColors }),
            setGradientDirection: (gradientDirection) => set({ gradientDirection }),
            setRadius: (radius) => set({ radius }),
            setMode: (mode) => set({ mode }),
            setAccentColor: (color) => set({ accentColor: color }),
            saveTheme: async (name) => {
                const { fontHeading, fontHeadingWeight, fontBody, primaryColor, isGradient, gradientColors, gradientDirection, radius, accentColor, savedThemes } = get();
                const newTheme: SavedTheme = {
                    id: crypto.randomUUID(),
                    name,
                    fontHeading,
                    fontHeadingWeight,
                    fontBody,
                    primaryColor,
                    isGradient,
                    gradientColors,
                    gradientDirection,
                    radius,
                    mode: 'light', // Default mode for saved themes (not used as global setting)
                    accentColor: accentColor || null,
                };
                const updated = [...savedThemes, newTheme];
                set({ savedThemes: updated });
                // Persist to backend via API
                await saveThemeAPI(newTheme);
            },
            deleteTheme: async (id) => {
                const filtered = get().savedThemes.filter((t) => t.id !== id);
                set({ savedThemes: filtered });
                await deleteThemeAPI(id);
            },
            loadTheme: (theme) => {
                set({
                    fontHeading: theme.fontHeading,
                    fontHeadingWeight: theme.fontHeadingWeight || '500', // Default to Medium (500)
                    fontBody: theme.fontBody,
                    primaryColor: theme.primaryColor,
                    isGradient: theme.isGradient || false,
                    gradientColors: theme.gradientColors || ['#3b82f6', '#8b5cf6'],
                    gradientDirection: theme.gradientDirection || 'to right',
                    radius: theme.radius,
                    accentColor: theme.accentColor || null,
                    // Don't change mode when loading theme - it's a global setting
                });
            },
        }),
        {
            name: 'quench-theme-storage',
        }
    )
);

// Load all themes from file on initialization (optional helper)
export const loadAllThemes = async () => {
    const themes = await fetchThemes();
    useThemeStore.setState({ savedThemes: themes });
};
