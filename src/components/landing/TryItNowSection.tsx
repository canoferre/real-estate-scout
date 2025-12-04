import { Button } from "@/components/ui/button";
import { Send, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "1",
    text: "Odprite Telegram in poiščite @nepremicninskiskavt_bot",
  },
  {
    step: "2",
    text: "Sledite preprostim navodilom in nastavite svoje kriterije",
  },
  {
    step: "3",
    text: "Prejmite prva obvestila o novih oglasih v nekaj minutah",
  },
];

export const TryItNowSection = () => {
  const openTelegram = () => {
    window.open("https://t.me/nepremicninskiskavt_bot", "_blank");
  };

  return (
    <section className="py-28 bg-gradient-hero">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Send className="w-4 h-4" />
              Preizkusite zdaj
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
              Začnite v 30 sekundah
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Brez registracije, brez čakanja – takoj začnite prejemati obvestila o novih oglasih
            </p>
          </div>
          
          {/* Steps */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12">
            {steps.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center text-lg">
                    {item.step}
                  </div>
                  <p className="text-foreground font-medium max-w-[200px]">
                    {item.text}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block w-6 h-6 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
          
          {/* CTA */}
          <div className="text-center">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={openTelegram}
              className="group min-w-[280px]"
            >
              <Send className="w-5 h-5" />
              Odpri Telegram bota
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Popolnoma brezplačno • Telegram račun potreben
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
