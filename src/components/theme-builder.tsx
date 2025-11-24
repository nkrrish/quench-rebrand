"use client";

import * as React from "react";
import { Paintbrush, Moon, Sun, Save, Trash, Check, Plus, X } from "lucide-react";
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
import { cn } from "@/lib/utils";

const FONTS = [
    { name: "Inter", value: "Inter" },
    { name: "Playfair Display", value: "Playfair Display" },
    { name: "Roboto", value: "Roboto" },
    { name: "Lato", value: "Lato" },
    { name: "Montserrat", value: "Montserrat" },
    { name: "Stack Sans Headline", value: "Stack Sans Headline" }, // Mapped to Inter/System
    { name: "Stack Sans Notch", value: "Stack Sans Notch" }, // Mapped to Inter/System
    { name: "SF Pro Display", value: "SF Pro Display" },
    { name: "SF Pro Text", value: "SF Pro Text" },
];

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
    { name: "Right", value: "to right" },
    { name: "Bottom", value: "to bottom" },
    { name: "Bottom Right", value: "to bottom right" },
    { name: "Top Right", value: "to top right" },
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
        savedThemes,
        setFontHeading,
        setFontBody,
        setPrimaryColor,
        setIsGradient,
        setGradientColors,
        setGradientDirection,
        setRadius,
        setMode,
        saveTheme,
        deleteTheme,
        loadTheme,
    } = useThemeStore();

    const [isOpen, setIsOpen] = React.useState(false);
    const [themeName, setThemeName] = React.useState("");

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
                <PopoverContent className="w-96 p-0 mr-4 mb-2" side="left" align="end">
                    <Card className="border-0 shadow-none max-h-[80vh] overflow-y-auto">
                        <CardHeader className="pb-3">
                            <CardTitle>Theme Builder</CardTitle>
                            <CardDescription>Customize your brand look.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="customize">
                                <TabsList className="grid w-full grid-cols-2 mb-4">
                                    <TabsTrigger value="customize">Customize</TabsTrigger>
                                    <TabsTrigger value="saved">Saved Themes</TabsTrigger>
                                </TabsList>

                                <TabsContent value="customize" className="space-y-6">
                                    {/* Fonts */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium leading-none">Typography</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-xs">Heading Font</Label>
                                                <Select value={fontHeading} onValueChange={setFontHeading}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {FONTS.map((f) => (
                                                            <SelectItem key={f.value} value={f.value}>
                                                                {f.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs">Body Font</Label>
                                                <Select value={fontBody} onValueChange={setFontBody}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {FONTS.map((f) => (
                                                            <SelectItem key={f.value} value={f.value}>
                                                                {f.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Colors */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-medium leading-none">Colors</h4>
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
                                            <div className="space-y-3">
                                                <Label className="text-xs">Primary Color</Label>
                                                <div className="flex flex-wrap gap-2">
                                                    {PRESET_COLORS.map((color) => (
                                                        <button
                                                            key={color}
                                                            className={cn(
                                                                "h-8 w-8 rounded-full border border-muted transition-all",
                                                                primaryColor === color && "ring-2 ring-offset-2 ring-primary"
                                                            )}
                                                            style={{ backgroundColor: color }}
                                                            onClick={() => setPrimaryColor(color)}
                                                        />
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="relative">
                                                        <Input
                                                            type="color"
                                                            value={primaryColor}
                                                            onChange={(e) => setPrimaryColor(e.target.value)}
                                                            className="h-9 w-9 p-0 border-0 rounded-md overflow-hidden"
                                                        />
                                                    </div>
                                                    <Input
                                                        value={primaryColor}
                                                        onChange={(e) => setPrimaryColor(e.target.value)}
                                                        className="font-mono uppercase"
                                                        maxLength={7}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label className="text-xs">Direction</Label>
                                                    <Select value={gradientDirection} onValueChange={setGradientDirection}>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {GRADIENT_DIRECTIONS.map((d) => (
                                                                <SelectItem key={d.value} value={d.value}>{d.name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label className="text-xs">Gradient Colors (2-5)</Label>
                                                    <div className="space-y-2">
                                                        {gradientColors.map((color, index) => (
                                                            <div key={index} className="flex items-center gap-2">
                                                                <Input
                                                                    type="color"
                                                                    value={color}
                                                                    onChange={(e) => updateGradientColor(index, e.target.value)}
                                                                    className="h-8 w-8 p-0 border-0 rounded-md overflow-hidden shrink-0"
                                                                />
                                                                <Input
                                                                    value={color}
                                                                    onChange={(e) => updateGradientColor(index, e.target.value)}
                                                                    className="font-mono uppercase h-8 text-xs"
                                                                    maxLength={7}
                                                                />
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 shrink-0"
                                                                    onClick={() => removeGradientColor(index)}
                                                                    disabled={gradientColors.length <= 2}
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {gradientColors.length < 5 && (
                                                        <Button variant="outline" size="sm" className="w-full" onClick={addGradientColor}>
                                                            <Plus className="h-3 w-3 mr-2" /> Add Color
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Radius & Mode */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium leading-none">Appearance</h4>
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
                                            <div className="space-y-3 flex flex-col items-start">
                                                <Label className="text-xs mb-2">Theme Mode</Label>
                                                <div className="flex items-center space-x-2 bg-muted p-1 rounded-lg w-full">
                                                    <Button
                                                        variant={mode === "light" ? "default" : "ghost"}
                                                        size="sm"
                                                        onClick={() => setMode("light")}
                                                        className="flex-1 h-7 px-2"
                                                    >
                                                        <Sun className="h-4 w-4 mr-1" /> Light
                                                    </Button>
                                                    <Button
                                                        variant={mode === "dark" ? "default" : "ghost"}
                                                        size="sm"
                                                        onClick={() => setMode("dark")}
                                                        className="flex-1 h-7 px-2"
                                                    >
                                                        <Moon className="h-4 w-4 mr-1" /> Dark
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Save */}
                                    <div className="pt-4 border-t">
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Theme Name (e.g. Modern Blue)"
                                                value={themeName}
                                                onChange={(e) => setThemeName(e.target.value)}
                                            />
                                            <Button onClick={handleSave} disabled={!themeName.trim()}>
                                                <Save className="h-4 w-4 mr-2" /> Save
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="saved" className="space-y-4">
                                    {savedThemes.length === 0 ? (
                                        <div className="text-center py-8 text-muted-foreground text-sm">
                                            No saved themes yet.
                                        </div>
                                    ) : (
                                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                                            {savedThemes.map((theme) => (
                                                <div
                                                    key={theme.id}
                                                    className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="h-6 w-6 rounded-full border"
                                                            style={{ backgroundColor: theme.primaryColor }}
                                                        />
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-sm">{theme.name}</span>
                                                            <span className="text-xs text-muted-foreground">
                                                                {theme.fontHeading} / {theme.mode}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={() => loadTheme(theme)}
                                                        >
                                                            <Check className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-destructive hover:text-destructive"
                                                            onClick={() => deleteTheme(theme.id)}
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </PopoverContent>
            </Popover>
        </div>
    );
}
