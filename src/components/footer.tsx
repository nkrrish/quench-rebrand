"use client";

import { DynamicLogo } from "@/components/dynamic-logo";
import Link from "next/link";
import { useThemeStore } from "@/lib/store";

export function Footer() {
    const { isGradient, gradientColors } = useThemeStore();

    return (
        <footer className="border-t bg-muted/20 relative z-10">
            <div className="container mx-auto py-8 md:py-12">
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
