// src/lib/themeStore.ts
// Simple file‑based storage for theme settings.
// This module provides async functions to read and write a JSON file
// that persists the selected theme across server restarts.

import { promises as fs } from "fs";
import path from "path";

// Resolve the path to the JSON file in the project root.
const themeFilePath = path.resolve(process.cwd(), "theme.json");

/**
 * Ensure the theme file exists. If it does not, create it with a default theme.
 */
async function ensureFile() {
  try {
    await fs.access(themeFilePath);
  } catch (_) {
    // File does not exist – create with a default empty object.
    await fs.writeFile(themeFilePath, JSON.stringify({ theme: "light" }, null, 2), "utf8");
  }
}

/**
 * Read the stored theme configuration.
 * @returns An object containing the theme (e.g., { theme: "dark" }).
 */
export async function readTheme(): Promise<{ theme: string }> {
  await ensureFile();
  const data = await fs.readFile(themeFilePath, "utf8");
  try {
    return JSON.parse(data);
  } catch {
    // If parsing fails, reset to default.
    return { theme: "light" };
  }
}

/**
 * Persist a new theme configuration.
 * @param newTheme - The theme name to store (e.g., "dark" or "light").
 */
export async function writeTheme(newTheme: string): Promise<void> {
  await ensureFile();
  const payload = { theme: newTheme };
  await fs.writeFile(themeFilePath, JSON.stringify(payload, null, 2), "utf8");
}

// Export the path for debugging or external use if needed.
export const themeFile = themeFilePath;
