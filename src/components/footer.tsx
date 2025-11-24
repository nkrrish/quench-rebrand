"use client";

import { DynamicLogo } from "@/components/dynamic-logo";
import Link from "next/link";
import { useThemeStore } from "@/lib/store";

export function Footer() {
    const { isGradient, gradientColors } = useThemeStore();

    return (
        <footer className="border-t bg-muted/20">
            <div className="container mx-auto py-8 md:py-12">
                {/* Large logo showcase at top */}
                <div className="flex items-center justify-center mb-8 md:mb-12">
                    <div className="relative group">
                        <div className="flex items-center justify-center transition-opacity duration-500">
                            <DynamicLogo className="w-[200px] h-[96px] md:w-[300px] md:h-[144px] opacity-10 hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        {isGradient && (
                            <div 
                                className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(circle at center, transparent 0%, transparent 50%, ${gradientColors[0]}08 100%)`
                                }}
                            />
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="mb-4">
                            <DynamicLogo />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            The AI assistant that knows your company.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block">Features</Link></li>
                            <li><Link href="#" className="hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block">Integrations</Link></li>
                            <li><Link href="#" className="hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block">Security</Link></li>
                            <li><Link href="#" className="hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block">Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block">About</Link></li>
                            <li><Link href="#" className="hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block">Blog</Link></li>
                            <li><Link href="#" className="hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block">Careers</Link></li>
                            <li><Link href="#" className="hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} ollo. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
