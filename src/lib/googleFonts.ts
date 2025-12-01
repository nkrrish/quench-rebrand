// Utility to fetch and manage Google Fonts and Fontshare Fonts

export type FontSource = "google" | "fontshare" | "system" | "other";

export interface FontStyle {
  weight: string; // e.g., "400", "500", "700"
  italic: boolean;
}

export interface GoogleFont {
  family: string;
  variants: string[]; // Legacy: weight numbers only
  styles?: FontStyle[]; // New: actual styles with weight and italic
  subsets: string[];
  category: string;
  source?: FontSource;
}

let cachedFonts: GoogleFont[] | null = null;

/**
 * Fetches all available fonts (Google Fonts, Fontshare, etc.) from our API route
 */
export async function fetchAllFonts(): Promise<GoogleFont[]> {
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
      throw new Error("Failed to fetch fonts");
    }
    
    const fonts: GoogleFont[] = await response.json();
    
    cachedFonts = fonts;
    return fonts;
  } catch (error) {
    console.error("Error fetching fonts:", error);
    // Fallback to a curated list of popular fonts
    return getFallbackFonts();
  }
}

/**
 * @deprecated Use fetchAllFonts instead
 * Fetches all available Google Fonts from our API route (server-side to avoid CORS)
 */
export async function fetchGoogleFonts(): Promise<GoogleFont[]> {
  return fetchAllFonts();
}

/**
 * Fallback list of popular Google Fonts if API fails
 */
function getFallbackFonts(): GoogleFont[] {
  return [
    { family: "Inter", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif", source: "google" },
    { family: "Roboto", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif", source: "google" },
    { family: "Open Sans", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif", source: "google" },
    { family: "Lato", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif", source: "google" },
    { family: "Montserrat", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif", source: "google" },
    { family: "Playfair Display", variants: ["400", "700"], subsets: ["latin"], category: "serif", source: "google" },
    { family: "Poppins", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif", source: "google" },
    { family: "Raleway", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif", source: "google" },
    { family: "Oswald", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif", source: "google" },
    { family: "Merriweather", variants: ["400", "700"], subsets: ["latin"], category: "serif", source: "google" },
    { family: "Source Sans Pro", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif", source: "google" },
    { family: "Nunito", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif", source: "google" },
    { family: "Ubuntu", variants: ["400", "700"], subsets: ["latin"], category: "sans-serif", source: "google" },
    { family: "Crimson Text", variants: ["400", "700"], subsets: ["latin"], category: "serif", source: "google" },
    { family: "Lora", variants: ["400", "700"], subsets: ["latin"], category: "serif", source: "google" },
  ];
}

/**
 * Fontshare font mappings - comprehensive list of all Fontshare fonts
 * Fontshare font IDs are lowercase with hyphens
 * Note: Fontshare fonts are loaded via: https://api.fontshare.com/v2/css?f[]={id}@400,700&display=swap
 */
export const FONTSHARE_FONTS: Record<string, string> = {
  "Satoshi": "satoshi",
  "Clash Display": "clash-display",
  "Clash Grotesk": "clash-grotesk",
  "Cabinet Grotesk": "cabinet-grotesk",
  "General Sans": "general-sans",
  "Switzer": "switzer",
  "Sora": "sora",
  "Manrope": "manrope",
  "Pilcrow Rounded": "pilcrow-rounded",
  "Sentient": "sentient",
  "Stardom": "stardom",
  "Zodiak": "zodiak",
  "Bespoke Stencil": "bespoke-stencil",
  "Bespoke Serif": "bespoke-serif",
  "Ranade": "ranade",
  "Supreme": "supreme",
  "Wanted Sans": "wanted-sans",
  "Fraunces": "fraunces",
  "Cal Sans": "cal-sans",
  "Outfit": "outfit",
  "Plus Jakarta Sans": "plus-jakarta-sans",
  "Auther": "auther",
  "Epilogue": "epilogue",
  "Chillax": "chillax",
  "Panchang": "panchang",
  "Amulya": "amulya",
  "Array": "array",
  "Bricolage Grotesque": "bricolage-grotesque",
  "Comme": "comme",
  "Copernicus": "copernicus",
  "Darker Grotesque": "darker-grotesque",
  "Excon": "excon",
  "Gambetta": "gambetta",
  "Gambetta Serif": "gambetta-serif",
  "Garet": "garet",
  "Geist": "geist",
  "Geist Mono": "geist-mono",
  "Gilda Display": "gilda-display",
  "Gloock": "gloock",
  "Hanken Grotesk": "hanken-grotesk",
  "Instrument Serif": "instrument-serif",
  "Instrument Sans": "instrument-sans",
  "JetBrains Mono": "jetbrains-mono",
  "Khand": "khand",
  "Kodchasan": "kodchasan",
  "Krona One": "krona-one",
  "Lexend": "lexend",
  "Lexend Deca": "lexend-deca",
  "Lexend Exa": "lexend-exa",
  "Lexend Giga": "lexend-giga",
  "Lexend Mega": "lexend-mega",
  "Lexend Peta": "lexend-peta",
  "Lexend Tera": "lexend-tera",
  "Lexend Zetta": "lexend-zetta",
  "Lilita One": "lilita-one",
  "Mada": "mada",
  "Maven Pro": "maven-pro",
  "Orbitron": "orbitron",
  "Overpass": "overpass",
  "Overpass Mono": "overpass-mono",
  "Palanquin": "palanquin",
  "Palanquin Dark": "palanquin-dark",
  "Quicksand": "quicksand",
  "Rajdhani": "rajdhani",
  "Red Hat Display": "red-hat-display",
  "Red Hat Mono": "red-hat-mono",
  "Red Hat Text": "red-hat-text",
  "Rubik": "rubik",
  "Rubik Mono One": "rubik-mono-one",
  "Saira": "saira",
  "Saira Condensed": "saira-condensed",
  "Saira Extra Condensed": "saira-extra-condensed",
  "Saira Semi Condensed": "saira-semi-condensed",
  "Sarabun": "sarabun",
  "Space Grotesk": "space-grotesk",
  "Space Mono": "space-mono",
  "Syne": "syne",
  "Tajawal": "tajawal",
  "Teko": "teko",
  "Titillium Web": "titillium-web",
  "Truculenta": "truculenta",
  "Varela": "varela",
  "Varela Round": "varela-round",
  "Work Sans": "work-sans",
  "Yantramanav": "yantramanav",
};

/**
 * Get Fontshare font list with metadata
 * Fontshare fonts are typically variable fonts supporting all weights
 */
export function getFontshareFonts(): GoogleFont[] {
  // Fontshare fonts are variable, so they support all weights (100-900) and can be italic
  const allWeights = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];
  const styles: FontStyle[] = [
    ...allWeights.map(w => ({ weight: w, italic: false })),
    ...allWeights.map(w => ({ weight: w, italic: true })),
  ];

  return Object.keys(FONTSHARE_FONTS).map((family) => ({
    family,
    variants: allWeights, // Legacy support
    styles, // All weights + italics for variable fonts
    subsets: ["latin"],
    category: "sans-serif", // Most Fontshare fonts are sans-serif, adjust as needed
    source: "fontshare" as FontSource,
  }));
}

/**
 * Loads a Fontshare font dynamically with specific weight and italic style
 */
export function loadFontshareFont(fontFamily: string, weight?: string, italic?: boolean): void {
  if (typeof window === "undefined") return;
  
  const fontshareId = FONTSHARE_FONTS[fontFamily];
  if (!fontshareId) return;
  
  // Parse weight
  let fontWeight = weight || "400";
  let isItalic = italic || false;
  
  if (weight) {
    if (weight.endsWith("i")) {
      fontWeight = weight.slice(0, -1);
      isItalic = true;
    } else {
      fontWeight = weight;
    }
  }

  // Fontshare variable fonts support all weights, load with the specific weight
  // Check if font is already loaded with this specific style
  const styleSuffix = isItalic ? `-${fontWeight}i` : `-${fontWeight}`;
  const fontId = `fontshare-font-${fontshareId}${styleSuffix}`;
  if (document.getElementById(fontId)) {
    return;
  }

  // Create link element for Fontshare
  // Fontshare variable fonts: load with specific weight range
  const link = document.createElement("link");
  link.id = fontId;
  link.rel = "stylesheet";
  // Fontshare uses variable font format, load the weight range
  link.href = `https://api.fontshare.com/v2/css?f[]=${fontshareId}@${fontWeight}${isItalic ? ':1' : ''}&display=swap`;
  
  document.head.appendChild(link);
}

/**
 * Loads a font dynamically by adding a link tag to the document head
 * Supports Google Fonts, Fontshare fonts, and system fonts
 * Returns a promise that resolves to true if font loaded successfully
 */
export function loadFont(fontFamily: string, source?: FontSource, weight?: string, italic?: boolean): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  
  // Skip system fonts
  const systemFonts = ["Stack Sans Headline", "Stack Sans Notch", "SF Pro Display", "SF Pro Text"];
  if (systemFonts.includes(fontFamily)) {
    return Promise.resolve(true);
  }

  // Check if it's a Fontshare font (either by source or by checking the mapping)
  if (source === "fontshare" || FONTSHARE_FONTS[fontFamily]) {
    loadFontshareFont(fontFamily, weight, italic);
    return checkFontLoaded(fontFamily);
  }

  // Default to Google Fonts
  return loadGoogleFont(fontFamily, weight, italic);
}

/**
 * Checks if a font is actually loaded and available
 */
export function checkFontLoaded(fontFamily: string): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  
  return new Promise((resolve) => {
    // Use document.fonts.check() if available (modern browsers)
    if (document.fonts && document.fonts.check) {
      // Try checking with the font family name
      const isLoaded = document.fonts.check(`1em "${fontFamily}"`);
      resolve(isLoaded);
      return;
    }
    
    // Fallback: create a test element and measure
    const testElement = document.createElement("span");
    testElement.style.fontFamily = `"${fontFamily}", monospace`;
    testElement.style.fontSize = "72px";
    testElement.style.position = "absolute";
    testElement.style.left = "-9999px";
    testElement.textContent = "mmmmmmmmmmlli";
    
    const baseline = document.createElement("span");
    baseline.style.fontFamily = "monospace";
    baseline.style.fontSize = "72px";
    baseline.style.position = "absolute";
    baseline.style.left = "-9999px";
    baseline.textContent = "mmmmmmmmmmlli";
    
    document.body.appendChild(testElement);
    document.body.appendChild(baseline);
    
    const testWidth = testElement.offsetWidth;
    const baselineWidth = baseline.offsetWidth;
    
    document.body.removeChild(testElement);
    document.body.removeChild(baseline);
    
    // If widths are different, font is loaded
    resolve(testWidth !== baselineWidth);
  });
}

/**
 * Loads a Google Font dynamically with specific weight and italic style
 */
export function loadGoogleFont(fontFamily: string, weight?: string, italic?: boolean): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  
  // Parse weight from style value (e.g., "400", "500i" -> weight: "500", italic: true)
  let fontWeight = weight || "400";
  let isItalic = italic || false;
  
  if (weight) {
    if (weight.endsWith("i")) {
      fontWeight = weight.slice(0, -1);
      isItalic = true;
    } else {
      fontWeight = weight;
    }
  }

  // Check if font is already loaded with this specific style
  const styleSuffix = isItalic ? `-${fontWeight}i` : `-${fontWeight}`;
  const fontId = `google-font-${fontFamily.toLowerCase().replace(/\s+/g, "-")}${styleSuffix}`;
  if (document.getElementById(fontId)) {
    // Font link exists, check if it's actually loaded
    return checkFontLoaded(fontFamily);
  }

  // Skip system fonts
  const systemFonts = ["Stack Sans Headline", "Stack Sans Notch", "SF Pro Display", "SF Pro Text"];
  if (systemFonts.includes(fontFamily)) {
    return Promise.resolve(true);
  }

  // Check if it's a Fontshare font
  if (FONTSHARE_FONTS[fontFamily]) {
    loadFontshareFont(fontFamily, fontWeight, isItalic);
    return checkFontLoaded(fontFamily);
  }

  // Create link element for Google Fonts
  const link = document.createElement("link");
  link.id = fontId;
  link.rel = "stylesheet";
  
  // Build Google Fonts API URL
  // Google Fonts API format: 
  // Regular: family=Font+Name:wght@400
  // Italic: family=Font+Name:ital,wght@1,400 (1 = italic, 0 = normal)
  const encodedFamily = fontFamily.replace(/\s+/g, "+");
  
  if (isItalic) {
    // Italic format: family=Font+Name:ital,wght@1,400
    link.href = `https://fonts.googleapis.com/css2?family=${encodedFamily}:ital,wght@1,${fontWeight}&display=swap`;
  } else {
    // Regular format: family=Font+Name:wght@400
    link.href = `https://fonts.googleapis.com/css2?family=${encodedFamily}:wght@${fontWeight}&display=swap`;
  }
  
  // Add error handler
  link.onerror = () => {
    console.error(`Failed to load font: ${fontFamily}`);
  };
  
  document.head.appendChild(link);
  
  // Wait for font to load, then check if it's actually available
  return new Promise((resolve) => {
    const checkLoaded = () => {
      // Give the browser a moment to process the font
      setTimeout(() => {
        checkFontLoaded(fontFamily).then(resolve);
      }, 300);
    };
    
    // Check if link loaded successfully
    if (link.sheet || link.href) {
      checkLoaded();
    } else {
      link.onload = checkLoaded;
    }
    
    // Fallback timeout - check after 2 seconds regardless
    setTimeout(() => {
      checkFontLoaded(fontFamily).then(resolve);
    }, 2000);
  });
}

/**
 * Converts font family name to CSS variable format
 */
export function fontFamilyToVariable(fontFamily: string): string {
  return fontFamily.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Weight name to numeric value mapping
 */
export const WEIGHT_MAP: Record<string, string> = {
  'Thin': '100',
  'Extra Light': '200',
  'Light': '300',
  'Regular': '400',
  'Medium': '500',
  'Semi Bold': '600',
  'Bold': '700',
  'Extra Bold': '800',
  'Black': '900',
};

/**
 * Numeric value to weight name mapping
 */
export const NUMERIC_TO_WEIGHT: Record<string, string> = {
  '100': 'Thin',
  '200': 'Extra Light',
  '300': 'Light',
  '400': 'Regular',
  '500': 'Medium',
  '600': 'Semi Bold',
  '700': 'Bold',
  '800': 'Extra Bold',
  '900': 'Black',
};

/**
 * All available weight options
 */
export const ALL_WEIGHTS = [
  { name: 'Thin', value: '100' },
  { name: 'Extra Light', value: '200' },
  { name: 'Light', value: '300' },
  { name: 'Regular', value: '400' },
  { name: 'Medium', value: '500' },
  { name: 'Semi Bold', value: '600' },
  { name: 'Bold', value: '700' },
  { name: 'Extra Bold', value: '800' },
  { name: 'Black', value: '900' },
];

/**
 * System fonts that support all weights
 */
const SYSTEM_FONTS = ["Stack Sans Headline", "Stack Sans Notch", "SF Pro Display", "SF Pro Text"];

/**
 * Check if a font is variable (supports all weights)
 * Variable fonts typically have many weights or specific indicators
 */
function isVariableFont(font: GoogleFont): boolean {
  // If font has 5+ weights, it's likely variable
  if (font.variants && font.variants.length >= 5) {
    return true;
  }
  // Some fonts are known to be variable
  const variableFontNames = [
    'Inter Variable',
    'Roboto Flex',
    'Sora Variable',
    'Satoshi Variable',
  ];
  return variableFontNames.some(name => font.family.includes(name));
}

/**
 * Get available styles for a font
 * Returns styles with weight and italic information
 */
export function getAvailableStyles(fontFamily: string, fonts: GoogleFont[]): Array<{ 
  name: string; 
  value: string; 
  weight: string; 
  italic: boolean;
  displayName: string;
}> {
  // System fonts support all weights (no italics for system fonts typically)
  if (SYSTEM_FONTS.includes(fontFamily)) {
    return ALL_WEIGHTS.map(w => ({
      name: w.name,
      value: w.value,
      weight: w.value,
      italic: false,
      displayName: w.name,
    }));
  }

  // Find the font in the fonts array
  const font = fonts.find(f => f.family === fontFamily);
  
  if (!font) {
    // If font not found, return default weights
    return [
      { name: 'Regular', value: '400', weight: '400', italic: false, displayName: 'Regular' },
      { name: 'Bold', value: '700', weight: '700', italic: false, displayName: 'Bold' },
    ];
  }

  // Use styles if available (new format), otherwise fall back to variants
  if (font.styles && font.styles.length > 0) {
    return font.styles
      .map(style => {
        const weightName = NUMERIC_TO_WEIGHT[style.weight] || `Weight ${style.weight}`;
        const italicSuffix = style.italic ? ' Italic' : '';
        return {
          name: `${weightName}${italicSuffix}`,
          value: `${style.weight}${style.italic ? 'i' : ''}`,
          weight: style.weight,
          italic: style.italic,
          displayName: `${weightName}${italicSuffix}`,
        };
      })
      .sort((a, b) => {
        // Sort by weight first, then by italic (non-italic first)
        const weightDiff = parseInt(a.weight) - parseInt(b.weight);
        if (weightDiff !== 0) return weightDiff;
        return a.italic ? 1 : -1;
      });
  }

  // Fallback to variants (legacy format, no italics)
  if (font.variants && font.variants.length > 0) {
    return font.variants
      .map(variant => {
        const weightName = NUMERIC_TO_WEIGHT[variant] || `Weight ${variant}`;
        return {
          name: weightName,
          value: variant,
          weight: variant,
          italic: false,
          displayName: weightName,
        };
      })
      .sort((a, b) => parseInt(a.weight) - parseInt(b.weight));
  }

  // Default fallback
  return [
    { name: 'Regular', value: '400', weight: '400', italic: false, displayName: 'Regular' },
    { name: 'Bold', value: '700', weight: '700', italic: false, displayName: 'Bold' },
  ];
}

/**
 * @deprecated Use getAvailableStyles instead
 * Get available weights for a font (legacy function, no italics)
 */
export function getAvailableWeights(fontFamily: string, fonts: GoogleFont[]): Array<{ name: string; value: string }> {
  const styles = getAvailableStyles(fontFamily, fonts);
  // Return unique weights (no italics)
  const uniqueWeights = new Map<string, { name: string; value: string }>();
  styles.forEach(style => {
    if (!uniqueWeights.has(style.weight)) {
      uniqueWeights.set(style.weight, {
        name: NUMERIC_TO_WEIGHT[style.weight] || `Weight ${style.weight}`,
        value: style.weight,
      });
    }
  });
  return Array.from(uniqueWeights.values()).sort((a, b) => parseInt(a.value) - parseInt(b.value));
}

