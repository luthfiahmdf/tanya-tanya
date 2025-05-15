import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/landing-section/hero-section";
import { FeatureSection } from "@/components/landing-section/feature-section";
import { HowItsWorksSection } from "@/components/landing-section/how-its-work";
import { CtaSection } from "@/components/landing-section/cta-section";
import { FAQSection } from "@/components/landing-section/faq-section";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFAF0] flex flex-col">
      <Navbar />
      <main>
        {/* Hero Section */}
        <HeroSection />
        {/* Stats Section */}
        {/* Features Section */}
        <FeatureSection />
        {/* How It Works */}
        <HowItsWorksSection />
        {/* CTA Section */}
        <CtaSection />
        {/* FAQ Section */}
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
