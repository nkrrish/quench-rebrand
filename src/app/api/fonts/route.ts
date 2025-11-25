// Next.js API route to fetch Google Fonts (server-side to avoid CORS)
import type { NextRequest } from "next/server";

let cachedFonts: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour cache

export async function GET(_req: NextRequest) {
  // Return cached fonts if available and not expired
  if (cachedFonts && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return new Response(JSON.stringify(cachedFonts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Fetch from Google Fonts metadata API (server-side, no CORS issues)
    const response = await fetch("https://fonts.google.com/metadata/fonts", {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Google Fonts");
    }

    const data = await response.json();

    // Transform the metadata format to our format
    const fonts = data.familyMetadataList.map((font: any) => {
      // Extract weights from font keys (e.g., "400", "400i", "700" -> ["400", "700"])
      const variants = font.fonts
        ? Object.keys(font.fonts)
            .filter((v: string) => !v.endsWith("i")) // Filter out italic variants
            .map((v: string) => v.replace(/[^0-9]/g, "")) // Extract just the number
            .filter((v: string, i: number, arr: string[]) => arr.indexOf(v) === i) // Remove duplicates
        : ["400", "700"];

      return {
        family: font.family,
        variants,
        subsets: font.subsets || ["latin"],
        category: font.category || "sans-serif",
      };
    });

    // Cache the result
    cachedFonts = fonts;
    cacheTimestamp = Date.now();

    return new Response(JSON.stringify(fonts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching Google Fonts:", error);
    
    // Return fallback fonts
    const fallbackFonts = [
      { family: "Inter", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif" },
      { family: "Roboto", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif" },
      { family: "Open Sans", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif" },
      { family: "Lato", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif" },
      { family: "Montserrat", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif" },
      { family: "Playfair Display", variants: ["400", "700"], subsets: ["latin"], category: "serif" },
      { family: "Poppins", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif" },
      { family: "Raleway", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif" },
      { family: "Oswald", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif" },
      { family: "Merriweather", variants: ["400", "700"], subsets: ["latin"], category: "serif" },
      { family: "Source Sans Pro", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif" },
      { family: "Nunito", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif" },
      { family: "Ubuntu", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif" },
      { family: "Crimson Text", variants: ["400", "700"], subsets: ["latin"], category: "serif" },
      { family: "Lora", variants: ["400", "700"], subsets: ["latin"], category: "serif" },
    ];

    return new Response(JSON.stringify(fallbackFonts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}

