// src/lib/themeAPI.ts
// Client‑side helper that talks to a server‑side API for persisting themes.
// The API lives at /api/themes and uses a file‑based store on the server.
// This module avoids importing Node's "fs" in client bundles.

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
    mode: "light" | "dark";
    accentColor?: string | null;
}

/** Fetch all stored themes from the server */
export async function fetchThemes(): Promise<SavedTheme[]> {
    const res = await fetch("/api/themes", { method: "GET" });
    if (!res.ok) {
        console.error("Failed to fetch themes", res.status);
        return [];
    }
    return (await res.json()) as SavedTheme[];
}

/** Save (add or update) a theme on the server */
export async function saveThemeAPI(theme: SavedTheme): Promise<void> {
    await fetch("/api/themes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(theme),
    });
}

/** Delete a theme by its id on the server */
export async function deleteThemeAPI(id: string): Promise<void> {
    await fetch(`/api/themes?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
    });
}
