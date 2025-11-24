import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DynamicLogo } from "@/components/dynamic-logo";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <DynamicLogo className="pb-[2px]" />
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <Link href="#" className="hover:text-foreground transition-colors">Product</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Solutions</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Customers</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Pricing</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden sm:block">
                        Log in
                    </Link>
                    <Button>Get Started</Button>
                </div>
            </div>
        </header>
    );
}
