// Next.js API route to fetch Google Fonts and Fontshare Fonts (server-side to avoid CORS)
import type { NextRequest } from "next/server";
import { getFontshareFonts } from "@/lib/googleFonts";

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
    const googleFonts = data.familyMetadataList.map((font: any) => {
      // Extract all styles (weights + italics) from font keys
      // Keys are like "400", "400i", "700", "700i" etc.
      const styles: Array<{ weight: string; italic: boolean }> = [];
      
      if (font.fonts) {
        Object.keys(font.fonts).forEach((key: string) => {
          const isItalic = key.endsWith("i");
          const weight = key.replace(/[^0-9]/g, ""); // Extract numeric weight
          if (weight) {
            // Check if this style already exists
            const exists = styles.some(s => s.weight === weight && s.italic === isItalic);
            if (!exists) {
              styles.push({ weight, italic: isItalic });
            }
          }
        });
      } else {
        // Default styles if no font data
        styles.push({ weight: "400", italic: false }, { weight: "700", italic: false });
      }

      // Legacy variants (just weights, no italics) for backward compatibility
      const variants = [...new Set(styles.map(s => s.weight))];

      return {
        family: font.family,
        variants, // Legacy support
        styles, // New: actual styles
        subsets: font.subsets || ["latin"],
        category: font.category || "sans-serif",
        source: "google" as const,
      };
    });

    // Get Fontshare fonts
    const fontshareFonts = getFontshareFonts();

    // Combine all fonts
    const allFonts = [...fontshareFonts, ...googleFonts];

    // Cache the result
    cachedFonts = allFonts;
    cacheTimestamp = Date.now();

    return new Response(JSON.stringify(allFonts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching fonts:", error);
    
    // Return fallback fonts with Fontshare fonts
    const fontshareFonts = getFontshareFonts();
    const defaultStyles = [{ weight: "400", italic: false }, { weight: "700", italic: false }];
    const fallbackGoogleFonts = [
      { family: "Inter", variants: ["400", "700"], styles: defaultStyles, subsets: ["latin"], category: "sans-serif", source: "google" as const },
      { family: "Roboto", variants: ["400", "700"], styles: defaultStyles, subsets: ["latin"], category: "sans-serif", source: "google" as const },
      { family: "Open Sans", variants: ["400", "700"], styles: defaultStyles, subsets: ["latin"], category: "sans-serif", source: "google" as const },
      { family: "Lato", variants: ["400", "700"], styles: defaultStyles, subsets: ["latin"], category: "sans-serif", source: "google" as const },
      { family: "Montserrat", variants: ["400", "700"], styles: defaultStyles, subsets: ["latin"], category: "sans-serif", source: "google" as const },
      { family: "Playfair Display", variants: ["400", "700"], styles: defaultStyles, subsets: ["latin"], category: "serif", source: "google" as const },
      { family: "Poppins", variants: ["400", "700"], styles: defaultStyles, subsets: ["latin"], category: "sans-serif", source: "google" as const },
      { family: "Raleway", variants: ["400", "700"], styles: defaultStyles, subsets: ["latin"], category: "sans-serif", source: "google" as const },
      { family: "Oswald", variants: ["400", "700"], styles: defaultStyles, subsets: ["latin"], category: "sans-serif", source: "google" as const },
      { family: "Merriweather", variants: ["400", "700"], styles: defaultStyles, subsets: ["latin"], category: "serif", source: "google" as const },
      { family: "Source Sans Pro", variants: ["400", "700"], styles: defaultStyles, subsets: ["latin"], category: "sans-serif", source: "google" as const },
      { family: "Nunito", variants: ["400", "700"], styles: defaultStyles, subsets: ["latin"], category: "sans-serif", source: "google" as const },
      { family: "Ubuntu", variants: ["400", "700"], styles: defaultStyles, subsets: ["latin"], category: "sans-serif", source: "google" as const },
      { family: "Crimson Text", variants: ["400", "700"], styles: defaultStyles, subsets: ["latin"], category: "serif", source: "google" as const },
      { family: "Lora", variants: ["400", "700"], styles: defaultStyles, subsets: ["latin"], category: "serif", source: "google" as const },
    ];

    const allFonts = [...fontshareFonts, ...fallbackGoogleFonts];

    return new Response(JSON.stringify(allFonts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}

