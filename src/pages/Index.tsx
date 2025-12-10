import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const heroImages = [
  "https://images.unsplash.com/photo-1600596542815-e32c265a3111?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
];

const Index = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full h-full"
            >
              <CarouselContent className="h-full ml-0">
                {heroImages.map((image, index) => (
                  <CarouselItem key={index} className="pl-0 h-full">
                    <div className="w-full h-full relative">
                      <img
                        src={image}
                        alt={`Hero background ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-background/85 backdrop-blur-[1px]" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <HeroSection />
        </section>
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
    </>
  );
};

export default Index;
