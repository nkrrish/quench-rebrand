"use client";

import * as React from "react";
import { Paintbrush, Moon, Sun, Save, Trash, Check, Plus, X, ArrowRight, ArrowDown, ArrowDownRight, ArrowUpRight, Sparkles, Settings } from "lucide-react";
import { useThemeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn, getComplementaryColor } from "@/lib/utils";
import { FontSelector } from "@/components/font-selector";

const PRESET_COLORS = [
    "#3b82f6", // Blue
    "#ef4444", // Red
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#8b5cf6", // Violet
    "#ec4899", // Pink
    "#000000", // Black
];

const GRADIENT_DIRECTIONS = [
    { name: "Right", value: "to right", icon: ArrowRight },
    { name: "Bottom", value: "to bottom", icon: ArrowDown },
    { name: "Bottom Right", value: "to bottom right", icon: ArrowDownRight },
    { name: "Top Right", value: "to top right", icon: ArrowUpRight },
];

// Default preset theme IDs (non-deletable)
const DEFAULT_THEME_IDS = [
    "94536ea6-c185-42f5-9d58-8c5781545e48", // Pink Orange
    "7c910b1c-4d2a-4ba3-b736-95dd3488bff5", // Green + Teal
    "8597e8f2-a756-440e-97f1-fbdbd7a01b36", // Mint Green
    "3318719b-d0e9-44b3-8556-5a03a539d950", // Orange
];

export function ThemeBuilder() {
    const {
        fontHeading,
        fontBody,
        primaryColor,
        isGradient,
        gradientColors,
        gradientDirection,
        radius,
        mode,
        accentColor,
        savedThemes,
        setFontHeading,
        setFontBody,
        setPrimaryColor: setPrimaryColorStore,
        setIsGradient,
        setGradientColors,
        setGradientDirection,
        setRadius,
        setMode,
        setAccentColor,
        saveTheme,
        deleteTheme,
        loadTheme,
    } = useThemeStore();

    // Wrapper to reset lastGeneratedColor when primary color changes
    const setPrimaryColor = (color: string) => {
        setPrimaryColorStore(color);
        setLastGeneratedColor(null);
    };

    const [isOpen, setIsOpen] = React.useState(false);
    const [themeName, setThemeName] = React.useState("");
    const [width, setWidth] = React.useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme-builder-width');
            return saved ? parseInt(saved, 10) : 384; // 384px = w-96
        }
        return 384;
    });
    const [activeTab, setActiveTab] = React.useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme-builder-tab');
            return saved || 'saved';
        }
        return 'saved';
    });
    const [isResizing, setIsResizing] = React.useState(false);
    const [showResizeHandle, setShowResizeHandle] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [colorMode, setColorMode] = React.useState<'contrast' | 'similar'>('contrast');
    const [lastGeneratedColor, setLastGeneratedColor] = React.useState<string | null>(null);
    const [settingsOpen, setSettingsOpen] = React.useState(false);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme-builder-width', width.toString());
        }
    }, [width]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current || isResizing) return;
        const rect = containerRef.current.getBoundingClientRect();
        const distanceFromLeft = e.clientX - rect.left;
        // Show handle when within 20px of left edge
        setShowResizeHandle(distanceFromLeft <= 20);
    };

    const handleMouseLeave = () => {
        if (!isResizing) {
            setShowResizeHandle(false);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
    };

    React.useEffect(() => {
        if (!isResizing) return;

        const handleMouseMove = (e: MouseEvent) => {
            // Calculate width from right edge (popover is right-aligned)
            const rightEdge = window.innerWidth - 16; // 16px for mr-4 margin
            const newWidth = rightEdge - e.clientX;
            const minWidth = 320;
            const maxWidth = 600;
            setWidth(Math.max(minWidth, Math.min(maxWidth, newWidth)));
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            setShowResizeHandle(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    const handleSave = () => {
        if (themeName.trim()) {
            saveTheme(themeName);
            setThemeName("");
        }
    };

    const addGradientColor = () => {
        if (gradientColors.length < 5) {
            setGradientColors([...gradientColors, "#ffffff"]);
        }
    };

    const removeGradientColor = (index: number) => {
        if (gradientColors.length > 2) {
            const newColors = [...gradientColors];
            newColors.splice(index, 1);
            setGradientColors(newColors);
        }
    };

    const updateGradientColor = (index: number, color: string) => {
        const newColors = [...gradientColors];
        newColors[index] = color;
        setGradientColors(newColors);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        size="icon"
                        className="h-14 w-14 rounded-full shadow-xl bg-primary text-primary-foreground hover:scale-105 transition-transform"
                        style={{ background: isGradient ? `linear-gradient(${gradientDirection}, ${gradientColors.join(", ")})` : primaryColor }}
                    >
                        <Paintbrush className="h-6 w-6" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent 
                    className="p-0 mr-4 mb-2" 
                    side="left" 
                    align="end"
                    style={{ 
                        width: `${width}px`,
                        '--primary': isGradient && gradientColors.length > 0 ? gradientColors[0] : primaryColor,
                        '--accent': accentColor || (isGradient && gradientColors.length > 0 ? gradientColors[0] : primaryColor),
                    } as React.CSSProperties & { '--primary': string; '--accent': string }}
                >
                    <div 
                        ref={containerRef}
                        className="relative"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Resize handle - only visible near left edge or when resizing */}
                        {(showResizeHandle || isResizing) && (
                            <div
                                onMouseDown={handleMouseDown}
                                className={cn(
                                    "absolute -left-1 top-0 bottom-0 w-2 cursor-ew-resize z-10 rounded-l transition-all",
                                    "bg-primary/30 hover:bg-primary/50",
                                    isResizing && "bg-primary/70"
                                )}
                            />
                        )}
                        <Card className="border-0 shadow-lg max-h-[80vh] overflow-y-auto font-sans" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                        <CardHeader className="pt-2 pb-1 border-b">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Theme Builder</CardTitle>
                                    <CardDescription>Customize your brand look.</CardDescription>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Sun className={cn("h-4 w-4", mode === "light" ? "text-foreground" : "text-muted-foreground")} />
                                    <Switch
                                        checked={mode === "dark"}
                                        onCheckedChange={(checked) => setMode(checked ? "dark" : "light")}
                                    />
                                    <Moon className={cn("h-4 w-4", mode === "dark" ? "text-foreground" : "text-muted-foreground")} />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="px-6 pt-0 pb-0">
                            <Tabs defaultValue="saved">
                                <TabsList className="grid w-full grid-cols-2 mb-4">
                                    <TabsTrigger value="saved">Saved Themes</TabsTrigger>
                                    <TabsTrigger value="customize">Customize</TabsTrigger>
                                </TabsList>

                                <TabsContent value="customize" className="space-y-6">
                                    {/* Fonts */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-semibold leading-none text-foreground">Typography</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-xs">Heading Font</Label>
                                                <FontSelector
                                                    value={fontHeading}
                                                    onValueChange={setFontHeading}
                                                    placeholder="Select heading font..."
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs">Body Font</Label>
                                                <FontSelector
                                                    value={fontBody}
                                                    onValueChange={setFontBody}
                                                    placeholder="Select body font..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Colors */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-semibold leading-none text-foreground">Color</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-xs">Primary Color</Label>
                                                <div className="flex items-center space-x-2">
                                                    <Label htmlFor="gradient-mode" className="text-xs">Gradient</Label>
                                                    <Switch
                                                        id="gradient-mode"
                                                        checked={isGradient}
                                                        onCheckedChange={setIsGradient}
                                                    />
                                                </div>
                                            </div>

                                            {!isGradient ? (
                                                <>
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="relative h-10 w-10">
                                                            <Input
                                                                type="color"
                                                                value={primaryColor}
                                                                onChange={(e) => setPrimaryColor(e.target.value)}
                                                                className="h-full w-full p-0 border-2 border-muted rounded-lg overflow-hidden cursor-pointer hover:border-muted-foreground/50 transition-colors appearance-none"
                                                                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                                                            />
                                                        </div>
                                                        <Input
                                                            value={primaryColor}
                                                            onChange={(e) => setPrimaryColor(e.target.value)}
                                                            className="font-mono uppercase h-10 flex-1"
                                                            maxLength={7}
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label className="text-xs">Direction</Label>
                                                        <div className="flex gap-2 flex-wrap">
                                                            {GRADIENT_DIRECTIONS.map((d) => {
                                                                const Icon = d.icon;
                                                                const isSelected = gradientDirection === d.value;
                                                                return (
                                                                    <button
                                                                        key={d.value}
                                                                        onClick={() => setGradientDirection(d.value)}
                                                                        className={cn(
                                                                            "flex items-center justify-center gap-1.5 h-9 px-3 rounded-md border-2 transition-all",
                                                                            isSelected
                                                                                ? "border-primary bg-primary/10 text-primary shadow-sm"
                                                                                : "border-border bg-background hover:bg-muted hover:border-muted-foreground/50 text-muted-foreground"
                                                                        )}
                                                                        title={d.name}
                                                                    >
                                                                        <Icon className="h-4 w-4 shrink-0" />
                                                                        <span className="text-xs font-medium hidden sm:inline">{d.name}</span>
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label className="text-xs">Gradient Colors (2-5)</Label>
                                                        <div className="space-y-2.5">
                                                            {gradientColors.map((color, index) => (
                                                                <div key={index} className="flex items-center gap-2.5">
                                                                    <div className="relative h-10 w-10 shrink-0">
                                                                        <Input
                                                                            type="color"
                                                                            value={color}
                                                                            onChange={(e) => updateGradientColor(index, e.target.value)}
                                                                            className="h-full w-full p-0 border-2 border-muted rounded-lg overflow-hidden cursor-pointer hover:border-muted-foreground/50 transition-colors appearance-none"
                                                                            style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                                                                        />
                                                                    </div>
                                                                    <Input
                                                                        value={color}
                                                                        onChange={(e) => updateGradientColor(index, e.target.value)}
                                                                        className="font-mono uppercase h-10 text-xs flex-1"
                                                                        maxLength={7}
                                                                    />
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-10 w-10 shrink-0 hover:bg-destructive/10 hover:text-destructive"
                                                                        onClick={() => removeGradientColor(index)}
                                                                        disabled={gradientColors.length <= 2}
                                                                        title="Remove color"
                                                                    >
                                                                        <X className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {gradientColors.length < 5 && (
                                                            <Button variant="outline" size="sm" className="w-full mt-2" onClick={addGradientColor}>
                                                                <Plus className="h-3.5 w-3.5 mr-2" /> Add Color
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Accent Color Section - Available for both solid and gradient */}
                                    <div className="space-y-3 pt-4 border-t border-border/50">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-xs">Accent Color (Optional)</Label>
                                            {accentColor && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-6 px-2 text-xs"
                                                    onClick={() => setAccentColor(null)}
                                                >
                                                    Clear
                                                </Button>
                                            )}
                                        </div>
                                        {accentColor ? (
                                            <>
                                                <div className="flex items-center gap-2.5">
                                                    <div className="relative h-10 w-10">
                                                        <Input
                                                            type="color"
                                                            value={accentColor}
                                                            onChange={(e) => {
                                                                setAccentColor(e.target.value);
                                                                setLastGeneratedColor(null);
                                                            }}
                                                            className="h-full w-full p-0 border-2 border-muted rounded-lg overflow-hidden cursor-pointer hover:border-muted-foreground/50 transition-colors appearance-none"
                                                            style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                                                        />
                                                    </div>
                                                    <div className="relative flex-1">
                                                        <Input
                                                            value={accentColor}
                                                            onChange={(e) => {
                                                                setAccentColor(e.target.value);
                                                                setLastGeneratedColor(null);
                                                            }}
                                                            className="font-mono uppercase h-10 pr-20"
                                                            maxLength={7}
                                                        />
                                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const baseColor = isGradient && gradientColors.length > 0 
                                                                        ? gradientColors[0] 
                                                                        : primaryColor;
                                                                    const newColor = getComplementaryColor(baseColor, colorMode, accentColor);
                                                                    setAccentColor(newColor);
                                                                    setLastGeneratedColor(newColor);
                                                                }}
                                                                className="p-1.5 rounded hover:bg-muted transition-colors"
                                                                title="Generate new color suggestion"
                                                            >
                                                                <Sparkles className="h-4 w-4 text-primary" />
                                                            </button>
                                                            <Popover open={settingsOpen} onOpenChange={setSettingsOpen}>
                                                                <PopoverTrigger asChild>
                                                                    <button
                                                                        type="button"
                                                                        className="p-1.5 rounded hover:bg-muted transition-colors"
                                                                        title="Color suggestion settings"
                                                                    >
                                                                        <Settings className="h-4 w-4 text-muted-foreground" />
                                                                    </button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-56 p-2" align="end">
                                                                    <div className="space-y-1">
                                                                        <button
                                                                            onClick={() => {
                                                                                setColorMode('contrast');
                                                                                setSettingsOpen(false);
                                                                            }}
                                                                            className={cn(
                                                                                "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                                                                                colorMode === 'contrast' 
                                                                                    ? "bg-primary/10 text-primary font-medium" 
                                                                                    : "hover:bg-muted"
                                                                            )}
                                                                        >
                                                                            Contrast Colors
                                                                        </button>
                                                                        <button
                                                                            onClick={() => {
                                                                                setColorMode('similar');
                                                                                setSettingsOpen(false);
                                                                            }}
                                                                            className={cn(
                                                                                "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                                                                                colorMode === 'similar' 
                                                                                    ? "bg-primary/10 text-primary font-medium" 
                                                                                    : "hover:bg-muted"
                                                                            )}
                                                                        >
                                                                            Similar Colors
                                                                        </button>
                                                                    </div>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => {
                                                        // Use first gradient color if gradient, otherwise primary color
                                                        const baseColor = isGradient && gradientColors.length > 0 
                                                            ? gradientColors[0] 
                                                            : primaryColor;
                                                        const newColor = getComplementaryColor(baseColor, colorMode, lastGeneratedColor);
                                                        setAccentColor(newColor);
                                                        setLastGeneratedColor(newColor);
                                                    }}
                                                >
                                                    <Sparkles className="h-3.5 w-3.5 mr-2" /> Suggest Color
                                                </Button>
                                                <Popover open={settingsOpen} onOpenChange={setSettingsOpen}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="px-3"
                                                            title="Color suggestion settings"
                                                        >
                                                            <Settings className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-56 p-2" align="end">
                                                        <div className="space-y-1">
                                                            <button
                                                                onClick={() => {
                                                                    setColorMode('contrast');
                                                                    setSettingsOpen(false);
                                                                }}
                                                                className={cn(
                                                                    "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                                                                    colorMode === 'contrast' 
                                                                        ? "bg-primary/10 text-primary font-medium" 
                                                                        : "hover:bg-muted"
                                                                )}
                                                            >
                                                                Contrast Colors
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setColorMode('similar');
                                                                    setSettingsOpen(false);
                                                                }}
                                                                className={cn(
                                                                    "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                                                                    colorMode === 'similar' 
                                                                        ? "bg-primary/10 text-primary font-medium" 
                                                                        : "hover:bg-muted"
                                                                )}
                                                            >
                                                                Similar Colors
                                                            </button>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        )}
                                    </div>

                                    {/* Radius */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-semibold leading-none text-foreground">Appearance</h4>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="space-y-3">
                                                <Label className="text-xs">Corner Radius: {radius}rem</Label>
                                                <Slider
                                                    value={[radius]}
                                                    min={0}
                                                    max={5}
                                                    step={0.1}
                                                    onValueChange={([val]) => setRadius(val)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Save */}
                                    <div className="pt-4 border-t border-border/50">
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Theme Name (e.g. Modern Blue)"
                                                value={themeName}
                                                onChange={(e) => setThemeName(e.target.value)}
                                                className="flex-1"
                                            />
                                            <Button onClick={handleSave} disabled={!themeName.trim()} className="shrink-0 gap-1">
                                                <Save className="h-4 w-4" /> Save
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="saved" className="space-y-4 mt-4">
                                    {(() => {
                                        // Separate default themes from user-created themes
                                        const defaultThemes = savedThemes.filter(theme => DEFAULT_THEME_IDS.includes(theme.id));
                                        const userThemes = savedThemes.filter(theme => !DEFAULT_THEME_IDS.includes(theme.id));

                                        // Sort default themes in specific order: Pink Orange, Green + Teal, Orange, Mint Green
                                        const themeOrder = [
                                            "94536ea6-c185-42f5-9d58-8c5781545e48", // Pink Orange
                                            "7c910b1c-4d2a-4ba3-b736-95dd3488bff5", // Green + Teal
                                            "3318719b-d0e9-44b3-8556-5a03a539d950", // Orange
                                            "8597e8f2-a756-440e-97f1-fbdbd7a01b36", // Mint Green
                                        ];
                                        const sortedDefaultThemes = defaultThemes.sort((a, b) => {
                                            const indexA = themeOrder.indexOf(a.id);
                                            const indexB = themeOrder.indexOf(b.id);
                                            return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
                                        });

                                        return (
                                            <div className="space-y-4">
                                                {/* Default Preset Themes - Non-deletable */}
                                                {sortedDefaultThemes.length > 0 && (
                                                    <div className="space-y-2">
                                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Preset Themes</h4>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {sortedDefaultThemes.map((theme) => (
                                                                <div
                                                                    key={theme.id}
                                                                    onClick={() => loadTheme(theme)}
                                                                    className="flex items-center gap-3 p-4 border-2 rounded-lg bg-card hover:bg-muted hover:border-muted-foreground/50 transition-all cursor-pointer group"
                                                                >
                                                                    <div
                                                                        className="h-10 w-10 rounded-full border-2 border-muted shadow-sm group-hover:shadow-md transition-shadow shrink-0"
                                                                        style={theme.isGradient && theme.gradientColors?.length 
                                                                            ? {
                                                                                backgroundImage: `linear-gradient(${theme.gradientDirection || "to right"}, ${theme.gradientColors.join(", ")})`
                                                                            }
                                                                            : {
                                                                                backgroundColor: theme.primaryColor
                                                                            }
                                                                        }
                                                                    />
                                                                    <div className="flex flex-col min-w-0 flex-1">
                                                                        <span className="font-semibold text-sm text-foreground truncate">{theme.name}</span>
                                                                        <span className="text-xs text-muted-foreground mt-0.5 truncate">
                                                                            {theme.fontHeading} / {theme.fontBody}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* User Created Themes - Deletable */}
                                                {userThemes.length > 0 && (
                                                    <div className="space-y-2">
                                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Your Themes</h4>
                                                        <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-2">
                                                            {userThemes.map((theme) => (
                                                                <div
                                                                    key={theme.id}
                                                                    className="flex items-center justify-between p-4 border-2 rounded-lg bg-card hover:bg-muted hover:border-muted-foreground/50 transition-all cursor-pointer group"
                                                                >
                                                                    <div 
                                                                        className="flex items-center gap-3 flex-1"
                                                                        onClick={() => loadTheme(theme)}
                                                                    >
                                                                        <div
                                                                            className="h-10 w-10 rounded-full border-2 border-muted shadow-sm group-hover:shadow-md transition-shadow shrink-0"
                                                                            style={theme.isGradient && theme.gradientColors?.length 
                                                                                ? {
                                                                                    backgroundImage: `linear-gradient(${theme.gradientDirection || "to right"}, ${theme.gradientColors.join(", ")})`
                                                                                }
                                                                                : {
                                                                                    backgroundColor: theme.primaryColor
                                                                                }
                                                                            }
                                                                        />
                                                                        <div className="flex flex-col min-w-0">
                                                                            <span className="font-semibold text-sm text-foreground truncate">{theme.name}</span>
                                                                            <span className="text-xs text-muted-foreground mt-0.5 truncate">
                                                                                {theme.fontHeading} / {theme.fontBody}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-1.5 shrink-0">
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                                            onClick={() => deleteTheme(theme.id)}
                                                                            title="Delete theme"
                                                                        >
                                                                            <Trash className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Empty state */}
                                                {sortedDefaultThemes.length === 0 && userThemes.length === 0 && (
                                                    <div className="text-center py-12 text-muted-foreground text-sm">
                                                        <Paintbrush className="h-8 w-8 mx-auto mb-3 opacity-50" />
                                                        <p>No saved themes yet.</p>
                                                        <p className="text-xs mt-1">Create and save your first theme!</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })()}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
