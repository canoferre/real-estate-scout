import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Send } from "lucide-react";
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

export const HeroSection = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [api]);

  const scrollToSignup = () => {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  };

  const openTelegram = () => {
    window.open("https://t.me/nepremicninskiskavt_bot", "_blank");
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
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

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/8 rounded-full blur-3xl z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/8 rounded-full blur-3xl z-10" />

      <div className="container relative z-20 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center stagger-children">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 mb-8 backdrop-blur-sm bg-background/50">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span className="text-sm font-semibold">Avtomatizirano iskanje nepremičnin</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
            Slovenski Nepremičninski Skavt
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-4">
            – nekdo, ki namesto vas pregleduje oglase
          </p>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Skavt avtomatsko spremlja oglase po Sloveniji in vam pošilja samo tiste, ki ustrezajo vašim kriterijem. Nehajte izgubljati čas z brskanjem – prepustite to nam.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Button
              variant="hero"
              size="xl"
              onClick={openTelegram}
              className="group min-w-[220px]"
            >
              <Send className="w-5 h-5" />
              Zaženi Telegram bota
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={scrollToSignup}
              className="group min-w-[220px] border-2 bg-background/60 backdrop-blur-sm hover:bg-background/80"
            >
              Prijavi se v beta
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Brezplačno v času beta faze • Brez skritih stroškov
          </p>
        </div>
      </div>
    </section>
  );
};
