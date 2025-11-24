import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { StatsSection } from "@/components/stats-section";
import { FeatureSection } from "@/components/feature-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { BenefitsSection } from "@/components/benefits-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { ThemeBuilder } from "@/components/theme-builder";

export default function Home() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <HeroSection />
      <StatsSection />
      <FeatureSection />
      <HowItWorksSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <ThemeBuilder />
    </main>
  );
}
