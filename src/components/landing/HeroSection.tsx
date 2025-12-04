import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";

export const HeroSection = () => {
  const scrollToSignup = () => {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
      
      <div className="container relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center stagger-children">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-8">
            <Search className="w-4 h-4" />
            <span className="text-sm font-medium">Avtomatizirano iskanje nepremičnin</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
            Slovenski Nepremičninski Skavt
            <span className="block text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground mt-4">
              – nekdo, ki namesto vas pregleduje oglase
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Skavt avtomatsko spremlja oglase po Sloveniji in vam pošilja samo tiste, ki ustrezajo vašim kriterijem.
          </p>
          
          {/* CTA */}
          <div className="flex flex-col items-center gap-4">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={scrollToSignup}
              className="group"
            >
              Pridruži se beti
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-sm text-muted-foreground">
              Brezplačno v času beta faze.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
