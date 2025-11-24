// src/lib/themeDB.ts
// Simple file‑based “database” for persisting theme objects across server restarts.
// The file is stored at the project root as `themes.json`.
// It provides async helpers to read, add, update, and delete themes.

import { promises as fs } from "fs";
import path from "path";
import type { SavedTheme } from "./store";

// Resolve the path to the JSON file in the project root.
const themesFilePath = path.resolve(process.cwd(), "themes.json");

/** Ensure the themes file exists; if not, create an empty array. */
async function ensureFile() {
    try {
        await fs.access(themesFilePath);
    } catch (_) {
        await fs.writeFile(themesFilePath, JSON.stringify([], null, 2), "utf8");
    }
}

/** Read all stored themes from the file. */
export async function getThemes(): Promise<SavedTheme[]> {
    await ensureFile();
    const data = await fs.readFile(themesFilePath, "utf8");
    try {
        const parsed = JSON.parse(data);
        // Guard against malformed data.
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

/** Persist the full array of themes to the file. */
async function writeAll(themes: SavedTheme[]): Promise<void> {
    await fs.writeFile(themesFilePath, JSON.stringify(themes, null, 2), "utf8");
}

/** Add a new theme (or replace if same id exists). */
export async function addOrUpdateTheme(theme: SavedTheme): Promise<void> {
    const themes = await getThemes();
    const index = themes.findIndex((t) => t.id === theme.id);
    if (index >= 0) {
        themes[index] = theme;
    } else {
        themes.push(theme);
    }
    await writeAll(themes);
}

/** Delete a theme by its id. */
export async function deleteThemeById(id: string): Promise<void> {
    const themes = await getThemes();
    const filtered = themes.filter((t) => t.id !== id);
    await writeAll(filtered);
}

/** Export the path for debugging if needed. */
export const themesFile = themesFilePath;
