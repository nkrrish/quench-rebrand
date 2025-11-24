// src/app/api/themes/route.ts
// Next.js App Router API route for persisting theme data on the server.
// Uses a simple JSON file (themes.json) stored at the project root.

import { promises as fs } from "fs";
import path from "path";
import type { NextRequest } from "next/server";
import type { SavedTheme } from "@/lib/themeAPI";

// Resolve the path to the JSON file in the project root.
const themesFilePath = path.resolve(process.cwd(), "themes.json");

/** Ensure the file exists; if not, create an empty array. */
async function ensureFile() {
    try {
        await fs.access(themesFilePath);
    } catch (_) {
        await fs.writeFile(themesFilePath, JSON.stringify([], null, 2), "utf8");
    }
}

/** Read all themes from the file. */
async function readThemes(): Promise<SavedTheme[]> {
    await ensureFile();
    const data = await fs.readFile(themesFilePath, "utf8");
    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

/** Write the full array of themes back to the file. */
async function writeThemes(themes: SavedTheme[]): Promise<void> {
    await fs.writeFile(themesFilePath, JSON.stringify(themes, null, 2), "utf8");
}

export async function GET(_req: NextRequest) {
    const themes = await readThemes();
    return new Response(JSON.stringify(themes), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function POST(req: NextRequest) {
    const incoming: SavedTheme = await req.json();
    const themes = await readThemes();
    const index = themes.findIndex((t) => t.id === incoming.id);
    if (index >= 0) {
        themes[index] = incoming;
    } else {
        themes.push(incoming);
    }
    await writeThemes(themes);
    return new Response(null, { status: 200 });
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
        return new Response("Missing id", { status: 400 });
    }
    const themes = await readThemes();
    const filtered = themes.filter((t) => t.id !== id);
    await writeThemes(filtered);
    return new Response(null, { status: 200 });
}
