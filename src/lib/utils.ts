import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts hex color to HSL
 */
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };
  
  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Converts HSL to hex color
 */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `#${[r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('')}`;
}

/**
 * Generates a harmonious matching color using various color theory approaches
 * Uses complementary, analogous, triadic, split-complementary, or tetradic color schemes
 * @param hex - The base color in hex format
 * @param mode - 'contrast' for high contrast colors, 'similar' for analogous colors
 * @param previousColor - Optional previous color to create variations from
 */
export function getComplementaryColor(hex: string, mode: 'contrast' | 'similar' = 'contrast', previousColor?: string | null): string {
  // If we have a previous color and want to create a variation, use it as base
  let baseHsl = previousColor ? hexToHsl(previousColor) : hexToHsl(hex);
  const originalHsl = hexToHsl(hex);
  
  // If creating variation from previous color, start from that
  if (previousColor && mode === 'similar') {
    // For similar mode variations, make smaller adjustments
    baseHsl = hexToHsl(previousColor);
  }
  
  // Select methods based on mode
  let methods: Array<{ name: string; hueShift: number; weight: number }>;
  
  if (mode === 'contrast') {
    // High contrast methods
    methods = [
      { name: 'complementary', hueShift: 180, weight: 0.4 },
      { name: 'triadic', hueShift: 120, weight: 0.25 },
      { name: 'triadic-alt', hueShift: 240, weight: 0.25 },
      { name: 'split-complementary', hueShift: 150, weight: 0.05 },
      { name: 'split-complementary-alt', hueShift: 210, weight: 0.05 },
    ];
  } else {
    // Similar/analogous methods
    methods = [
      { name: 'analogous', hueShift: 30, weight: 0.5 },
      { name: 'analogous-alt', hueShift: -30, weight: 0.5 },
    ];
  }
  
  // Weighted random selection
  const random = Math.random();
  let cumulative = 0;
  let selectedMethod = methods[0];
  for (const method of methods) {
    cumulative += method.weight;
    if (random <= cumulative) {
      selectedMethod = method;
      break;
    }
  }
  
  // For variations, use smaller hue shifts
  const variationAmount = previousColor ? (Math.random() - 0.5) * 30 : (Math.random() - 0.5) * 20;
  
  // Apply hue shift
  let newHue = (baseHsl.h + selectedMethod.hueShift + variationAmount) % 360;
  if (newHue < 0) newHue += 360;
  
  // Adjust saturation based on method and mode
  let newSaturation = baseHsl.s;
  if (mode === 'similar' || selectedMethod.name.includes('analogous')) {
    // Similar colors: keep similar saturation with small variation
    newSaturation = Math.min(100, Math.max(30, baseHsl.s + (Math.random() - 0.5) * 15));
  } else {
    // Contrast colors: can have higher saturation for contrast
    newSaturation = Math.min(100, Math.max(40, baseHsl.s + 5 + Math.random() * 20));
  }
  
  // Adjust lightness for better contrast and visual appeal
  let newLightness = baseHsl.l;
  if (mode === 'contrast') {
    // High contrast: opposite lightness
    if (selectedMethod.name.includes('complementary')) {
      newLightness = originalHsl.l > 50 
        ? Math.max(20, originalHsl.l - 25 - Math.random() * 10)
        : Math.min(80, originalHsl.l + 25 + Math.random() * 10);
    } else {
      // Triadic: moderate contrast
      const contrast = 20 + Math.random() * 15;
      newLightness = originalHsl.l > 50 
        ? Math.max(25, originalHsl.l - contrast)
        : Math.min(75, originalHsl.l + contrast);
    }
  } else {
    // Similar colors: keep similar lightness with small variation
    newLightness = baseHsl.l + (Math.random() - 0.5) * 10;
    newLightness = Math.max(30, Math.min(80, newLightness));
  }
  
  return hslToHex(newHue, newSaturation, newLightness);
}
