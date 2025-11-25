"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { fetchGoogleFonts, loadGoogleFont, GoogleFont } from "@/lib/googleFonts";

interface FontSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function FontSelector({ value, onValueChange, placeholder = "Select font..." }: FontSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [fonts, setFonts] = React.useState<GoogleFont[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [systemFonts] = React.useState([
    { family: "Stack Sans Headline", category: "sans-serif" },
    { family: "Stack Sans Notch", category: "sans-serif" },
    { family: "SF Pro Display", category: "sans-serif" },
    { family: "SF Pro Text", category: "sans-serif" },
  ]);

  // Fetch fonts on mount
  React.useEffect(() => {
    fetchGoogleFonts()
      .then((fetchedFonts) => {
        setFonts(fetchedFonts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load fonts:", error);
        setLoading(false);
      });
  }, []);

  // Load font when selected
  React.useEffect(() => {
    if (value) {
      loadGoogleFont(value);
    }
  }, [value]);

  // Filter fonts based on search query and deduplicate
  const filteredFonts = React.useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    // Get system font names for deduplication
    const systemFontNames = new Set(systemFonts.map(f => f.family.toLowerCase()));
    
    // Filter Google Fonts to exclude duplicates with system fonts
    const uniqueGoogleFonts = fonts.filter(font => 
      !systemFontNames.has(font.family.toLowerCase())
    );
    
    // Add source identifier to each font for unique keys
    const systemFontsWithSource = systemFonts.map(font => ({ ...font, source: 'system' }));
    const googleFontsWithSource = uniqueGoogleFonts.map(font => ({ ...font, source: 'google' }));
    
    if (!query) {
      return [...systemFontsWithSource, ...googleFontsWithSource];
    }

    const systemMatches = systemFontsWithSource.filter((font) =>
      font.family.toLowerCase().includes(query)
    );
    const googleMatches = googleFontsWithSource.filter((font) =>
      font.family.toLowerCase().includes(query)
    );

    return [...systemMatches, ...googleMatches];
  }, [searchQuery, fonts, systemFonts]);

  const selectedFont = React.useMemo(() => {
    // Check system fonts first, then Google fonts
    const systemMatch = systemFonts.find((f) => f.family === value);
    if (systemMatch) return systemMatch;
    return fonts.find((f) => f.family === value);
  }, [value, fonts, systemFonts]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-9"
        >
          <span className="truncate">
            {selectedFont ? selectedFont.family : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[300px] p-0" 
        align="start"
        style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
      >
        <div className="flex items-center border-b relative">
          <Input
            placeholder="Search fonts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-9 pr-8 w-full rounded-t-md rounded-b-none px-3"
          />
          <Search className="absolute right-5 h-4 w-4 shrink-0 opacity-50 pointer-events-none" />
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {loading ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Loading fonts...
            </div>
          ) : filteredFonts.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No fonts found.
            </div>
          ) : (
            <div className="p-1">
              {filteredFonts.map((font) => (
                <button
                  key={`${font.source}-${font.family}`}
                  onClick={() => {
                    onValueChange(font.family);
                    setOpen(false);
                    setSearchQuery("");
                  }}
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                    value === font.family && "bg-accent text-accent-foreground"
                  )}
                >
                  <span className="flex-1 truncate text-left">{font.family}</span>
                  {font.category && (
                    <span className="ml-2 text-xs text-muted-foreground shrink-0">
                      {font.category}
                    </span>
                  )}
                  <Check
                    className={cn(
                      "ml-2 h-4 w-4 shrink-0",
                      value === font.family ? "opacity-100" : "opacity-0"
                    )}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

