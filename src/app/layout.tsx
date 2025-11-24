import type { Metadata } from "next";
import { Inter, Playfair_Display, Roboto, Lato, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProviderWrapper } from "@/components/theme-provider-wrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair-display" });
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-roboto" });
const lato = Lato({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-lato" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "ollo - Work AI Assistant",
  description: "Work AI Assistant for Fast Growing Teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${roboto.variable} ${lato.variable} ${montserrat.variable}`}
      style={{
        "--font-stack-sans-headline": "Stack Sans Headline, system-ui, sans-serif",
        "--font-stack-sans-notch": "Stack Sans Notch, system-ui, sans-serif",
        "--font-sf-pro-display": "-apple-system, BlinkMacSystemFont, SF Pro Display, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        "--font-sf-pro-text": "-apple-system, BlinkMacSystemFont, SF Pro Text, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      } as React.CSSProperties}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Stack+Sans+Headline:wght@400;700&family=Stack+Sans+Notch:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className="antialiased font-body"
      >
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
