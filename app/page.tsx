import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/landing-section/hero-section";
import { FeatureSection } from "@/components/landing-section/feature-section";
import { CtaSection } from "@/components/landing-section/cta-section";
import { FAQSection } from "@/components/landing-section/faq-section";
import { Footer } from "@/components/footer";
import { HowItWorksSection } from "@/components/landing-section/how-its-work";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFAF0] flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureSection />
        <HowItWorksSection />
        <CtaSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
