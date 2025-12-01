"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search, Type, FileText, Heading, PenTool, Code, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAllFonts, loadFont, GoogleFont, FontSource, checkFontLoaded } from "@/lib/googleFonts";

interface FontSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

// Font category mapping with icons
const CATEGORY_CONFIG: Record<string, { icon: React.ComponentType<{ className?: string }>; label: string }> = {
  "sans-serif": { icon: Type, label: "Sans" },
  "serif": { icon: FileText, label: "Serif" },
  "display": { icon: Heading, label: "Display" },
  "handwriting": { icon: PenTool, label: "Handwriting" },
  "monospace": { icon: Code, label: "Monospace" },
};

const ALL_CATEGORIES = ["all", "sans-serif", "serif", "display", "handwriting", "monospace"];

export function FontSelector({ value, onValueChange, placeholder = "Select font..." }: FontSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [fonts, setFonts] = React.useState<GoogleFont[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sourceFilter, setSourceFilter] = React.useState<FontSource | "all">("all");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);
  const listRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [fontErrors, setFontErrors] = React.useState<Set<string>>(new Set());
  const [systemFonts] = React.useState([
    { family: "Stack Sans Headline", category: "sans-serif", source: "system" as FontSource },
    { family: "Stack Sans Notch", category: "sans-serif", source: "system" as FontSource },
    { family: "SF Pro Display", category: "sans-serif", source: "system" as FontSource },
    { family: "SF Pro Text", category: "sans-serif", source: "system" as FontSource },
  ]);

  // Fetch fonts on mount
  React.useEffect(() => {
    fetchAllFonts()
      .then((fetchedFonts) => {
        setFonts(fetchedFonts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load fonts:", error);
        setLoading(false);
      });
  }, []);

  // Load font when selected and validate it loaded correctly
  React.useEffect(() => {
    if (value) {
      // Find the font to determine its source
      const font = fonts.find(f => f.family === value) || 
                   systemFonts.find(f => f.family === value);
      const source = font?.source || "google";
      
      // Load font and check if it loaded successfully
      loadFont(value, source).then((loaded) => {
        if (!loaded) {
          // Font failed to load, add to error set
          setFontErrors((prev) => new Set(prev).add(value));
          console.warn(`Font "${value}" failed to load properly`);
        } else {
          // Font loaded successfully, remove from error set
          setFontErrors((prev) => {
            const next = new Set(prev);
            next.delete(value);
            return next;
          });
        }
      });
    }
  }, [value, fonts, systemFonts]);

  // Filter fonts based on search query, source filter, category filter, and deduplicate
  const filteredFonts = React.useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    // Get system font names for deduplication
    const systemFontNames = new Set(systemFonts.map(f => f.family.toLowerCase()));
    
    // Filter fonts to exclude duplicates with system fonts
    const uniqueFonts = fonts.filter(font => 
      !systemFontNames.has(font.family.toLowerCase())
    );
    
    // Combine all fonts with their sources
    const allFonts = [
      ...systemFonts.map(font => ({ ...font, source: font.source || 'system' as FontSource })),
      ...uniqueFonts.map(font => ({ ...font, source: font.source || 'google' as FontSource }))
    ];
    
    // Apply source filter
    let filteredFonts = allFonts;
    if (sourceFilter !== "all") {
      filteredFonts = filteredFonts.filter(font => font.source === sourceFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      filteredFonts = filteredFonts.filter(font => {
        const fontCategory = font.category?.toLowerCase() || "sans-serif";
        return fontCategory === categoryFilter.toLowerCase();
      });
    }
    
    // Apply search query filter
    if (!query) {
      return filteredFonts;
    }

    return filteredFonts.filter((font) =>
      font.family.toLowerCase().includes(query)
    );
  }, [searchQuery, fonts, systemFonts, sourceFilter, categoryFilter]);

  const selectedFont = React.useMemo(() => {
    // Check system fonts first, then other fonts
    const systemMatch = systemFonts.find((f) => f.family === value);
    if (systemMatch) return systemMatch;
    return fonts.find((f) => f.family === value);
  }, [value, fonts, systemFonts]);

  // Reset highlighted index when filters change or popover opens
  React.useEffect(() => {
    if (open) {
      // Find current selection index
      const currentIndex = filteredFonts.findIndex(f => f.family === value);
      setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
    } else {
      setHighlightedIndex(-1);
    }
  }, [open, filteredFonts, value]);

  // Add global keyboard listener to prevent default scroll behavior
  React.useEffect(() => {
    if (!open) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Only handle if the popover is open
      if (filteredFonts.length === 0) {
        if (e.key === 'Escape') {
          e.preventDefault();
          setOpen(false);
        }
        return;
      }
      
      // Check if the event target is within our popover or input
      const target = e.target as HTMLElement;
      const isInPopover = target.closest('[role="dialog"]') || 
                         target.closest('[data-radix-portal]') ||
                         target.closest('[data-radix-popover-content]') ||
                         listRef.current?.contains(target) ||
                         target.tagName === 'INPUT';

      if (!isInPopover) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopImmediatePropagation();
        
        if (e.key === 'ArrowDown') {
          setHighlightedIndex((prev) => {
            if (prev < 0) return 0;
            const next = prev < filteredFonts.length - 1 ? prev + 1 : 0;
            return next;
          });
        } else if (e.key === 'ArrowUp') {
          setHighlightedIndex((prev) => {
            if (prev < 0) return filteredFonts.length - 1;
            const next = prev > 0 ? prev - 1 : filteredFonts.length - 1;
            return next;
          });
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        e.stopImmediatePropagation();
        const indexToUse = highlightedIndex >= 0 ? highlightedIndex : 0;
        if (indexToUse < filteredFonts.length) {
          const selectedFont = filteredFonts[indexToUse];
          onValueChange(selectedFont.family);
          setOpen(false);
          setSearchQuery("");
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        setOpen(false);
      }
    };

    // Use capture phase to catch events early, before they cause scrolling
    window.addEventListener('keydown', handleGlobalKeyDown, { capture: true, passive: false });
    
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown, { capture: true });
    };
  }, [open, filteredFonts, highlightedIndex, onValueChange]);

  // Scroll highlighted item into view
  React.useEffect(() => {
    if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [highlightedIndex]);

  // Handle keyboard navigation
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
    if (!open) {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
      }
      return;
    }

    if (filteredFonts.length === 0) {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
      }
      return;
    }

    // Handle arrow keys - prevent default scroll behavior
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      
      if (e.key === 'ArrowDown') {
        setHighlightedIndex((prev) => {
          if (prev < 0) return 0;
          const next = prev < filteredFonts.length - 1 ? prev + 1 : 0;
          return next;
        });
      } else if (e.key === 'ArrowUp') {
        setHighlightedIndex((prev) => {
          if (prev < 0) return filteredFonts.length - 1;
          const next = prev > 0 ? prev - 1 : filteredFonts.length - 1;
          return next;
        });
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      const indexToUse = highlightedIndex >= 0 ? highlightedIndex : 0;
      if (indexToUse < filteredFonts.length) {
        const selectedFont = filteredFonts[indexToUse];
        onValueChange(selectedFont.family);
        setOpen(false);
        setSearchQuery("");
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      setOpen(false);
      return;
    }
  }, [open, filteredFonts, highlightedIndex, onValueChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-9"
          onKeyDown={(e) => {
            // Prevent arrow keys from opening the popover
            // Arrow keys should only navigate when popover is already open
            if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
              e.preventDefault();
              e.stopPropagation();
              // Don't open on arrow keys - user must click or use Enter/Space
            }
          }}
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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              // Reset highlighted index when searching
              setHighlightedIndex(0);
            }}
            onKeyDown={(e) => {
              // Handle arrow keys and Enter for navigation
              if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === 'Escape') {
                handleKeyDown(e);
              }
            }}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-9 pr-8 w-full rounded-t-md rounded-b-none px-3"
            autoFocus
          />
          <Search className="absolute right-5 h-4 w-4 shrink-0 opacity-50 pointer-events-none" />
        </div>
        <div className="border-b space-y-2 px-3 py-2">
          <Tabs value={sourceFilter} onValueChange={(v) => setSourceFilter(v as FontSource | "all")} className="w-full">
            <TabsList className="w-full grid grid-cols-4 h-8">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="fontshare" className="text-xs">Fontshare</TabsTrigger>
              <TabsTrigger value="google" className="text-xs">Google</TabsTrigger>
              <TabsTrigger value="system" className="text-xs">Other</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="w-full overflow-x-auto scrollbar-hide">
            <Tabs value={categoryFilter} onValueChange={setCategoryFilter} className="w-full">
              <TabsList className="inline-flex h-8 w-auto">
                <TabsTrigger 
                  value="all" 
                  className="text-xs whitespace-nowrap flex-shrink-0 px-2"
                  title="All Categories"
                >
                  All
                </TabsTrigger>
                {ALL_CATEGORIES.filter(c => c !== "all").map((category) => {
                  const config = CATEGORY_CONFIG[category];
                  const Icon = config?.icon || Type;
                  return (
                    <TabsTrigger 
                      key={category} 
                      value={category} 
                      className="text-xs whitespace-nowrap flex-shrink-0 px-2"
                      title={config?.label || category}
                    >
                      <Icon className="h-4 w-4" />
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div 
          ref={listRef}
          className="max-h-[300px] overflow-y-auto"
          tabIndex={-1}
          onKeyDown={(e) => {
            // Handle keyboard events on the list container as well
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === 'Escape') {
              handleKeyDown(e);
            }
          }}
          onWheel={(e) => {
            // Allow normal scrolling with mouse wheel
          }}
        >
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
              {filteredFonts.map((font, index) => (
                <button
                  key={`${font.source}-${font.family}`}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  onClick={() => {
                    onValueChange(font.family);
                    setOpen(false);
                    setSearchQuery("");
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                    value === font.family && "bg-accent text-accent-foreground",
                    highlightedIndex === index && "bg-accent text-accent-foreground"
                  )}
                >
                  <span className="flex-1 truncate text-left">{font.family}</span>
                  {fontErrors.has(font.family) && (
                    <AlertCircle 
                      className="ml-2 h-4 w-4 shrink-0 text-destructive" 
                      title="Font failed to load - using fallback font"
                    />
                  )}
                  {font.source && font.source !== "system" && (
                    <span className="ml-2 text-xs text-muted-foreground shrink-0 capitalize">
                      {font.source}
                    </span>
                  )}
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

