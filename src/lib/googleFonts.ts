// Utility to fetch and manage Google Fonts

export interface GoogleFont {
  family: string;
  variants: string[];
  subsets: string[];
  category: string;
}

let cachedFonts: GoogleFont[] | null = null;

/**
 * Fetches all available Google Fonts from our API route (server-side to avoid CORS)
 */
export async function fetchGoogleFonts(): Promise<GoogleFont[]> {
  if (cachedFonts) {
    return cachedFonts;
  }

  try {
    // Fetch from our Next.js API route (server-side, no CORS issues)
    const response = await fetch("/api/fonts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch Google Fonts");
    }
    
    const fonts: GoogleFont[] = await response.json();
    
    cachedFonts = fonts;
    return fonts;
  } catch (error) {
    console.error("Error fetching Google Fonts:", error);
    // Fallback to a curated list of popular fonts
    return getFallbackFonts();
  }
}

/**
 * Fallback list of popular Google Fonts if API fails
 */
function getFallbackFonts(): GoogleFont[] {
  return [
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
}

/**
 * Loads a Google Font dynamically by adding a link tag to the document head
 */
export function loadGoogleFont(fontFamily: string): void {
  if (typeof window === "undefined") return;
  
  // Check if font is already loaded
  const fontId = `google-font-${fontFamily.toLowerCase().replace(/\s+/g, "-")}`;
  if (document.getElementById(fontId)) {
    return;
  }

  // Skip system fonts
  const systemFonts = ["Stack Sans Headline", "Stack Sans Notch", "SF Pro Display", "SF Pro Text"];
  if (systemFonts.includes(fontFamily)) {
    return;
  }

  // Create link element
  const link = document.createElement("link");
  link.id = fontId;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    fontFamily
  )}:wght@400;700&display=swap`;
  
  document.head.appendChild(link);
}

/**
 * Converts font family name to CSS variable format
 */
export function fontFamilyToVariable(fontFamily: string): string {
  return fontFamily.toLowerCase().replace(/\s+/g, "-");
}

