import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { WhoItsForSection } from "@/components/landing/WhoItsForSection";
import { WhyScoutSection } from "@/components/landing/WhyScoutSection";
import { TryItNowSection } from "@/components/landing/TryItNowSection";
import { OffersSection } from "@/components/landing/OffersSection";
import { RoadmapSection } from "@/components/landing/RoadmapSection";
import { BetaSignupSection } from "@/components/landing/BetaSignupSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <HowItWorksSection />
      <WhoItsForSection />
      <WhyScoutSection />
      <TryItNowSection />
      <OffersSection />
      <RoadmapSection />
      <BetaSignupSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
