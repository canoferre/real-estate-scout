import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { WhoItsForSection } from "@/components/landing/WhoItsForSection";
import { WhyScoutSection } from "@/components/landing/WhyScoutSection";
import { BetaSignupSection } from "@/components/landing/BetaSignupSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <HowItWorksSection />
      <WhoItsForSection />
      <WhyScoutSection />
      <BetaSignupSection />
      <FAQSection />
      <Footer />
    </main>
  );
};

export default Index;
