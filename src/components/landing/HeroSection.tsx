import { Button } from "@/components/ui/button";
import { ArrowRight, Send } from "lucide-react";

export const HeroSection = () => {
  const scrollToSignup = () => {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  };

  const openTelegram = () => {
    window.open("https://t.me/nepremicninskiskavt_bot", "_blank");
  };

  return (
    <>
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/8 rounded-full blur-3xl z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/8 rounded-full blur-3xl z-10" />

      <div className="container relative z-20 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center stagger-children">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 mb-8 backdrop-blur-sm bg-background/50">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span className="text-sm font-semibold">Avtomatizirano iskanje nepremičnin</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
            Slovenski Nepremičninski Skavt
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-4">
            – nekdo, ki namesto vas pregleduje oglase
          </p>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Skavt avtomatsko spremlja oglase po Sloveniji in vam pošilja samo tiste, ki ustrezajo vašim kriterijem. Nehajte izgubljati čas z brskanjem – prepustite to nam.
          </p>

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
    </>
  );
};
