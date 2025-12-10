import { Button } from "@/components/ui/button";
import { ArrowRight, UserPlus, ClipboardList } from "lucide-react";

const steps = [
  {
    step: "1",
    text: "Izpolnite svoj e-poštni naslov in želje",
  },
  {
    step: "2",
    text: "Potrdite prijavo in nastavite kriterije",
  },
  {
    step: "3",
    text: "Prejmite prva obvestila o novih oglasih v nekaj minutah",
  },
];

export const TryItNowSection = () => {
  const scrollToSignup = () => {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="try-it-now" className="py-28 bg-gradient-hero">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <UserPlus className="w-4 h-4" />
              Registrirajte se zdaj
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
              Začnite v 30 sekundah
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Ustvarite račun, nastavite kriterije in začnite prejemati prilagojena obvestila o novih oglasih.
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
              onClick={scrollToSignup}
              className="group min-w-[280px]"
            >
              <ClipboardList className="w-5 h-5" />
              Prijavi se na obvestila
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <div className="mt-4 flex flex-col items-center gap-3">
              <div className="text-sm text-muted-foreground">ali</div>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 min-w-[240px]"
              >
                <a href="/auth/google" aria-label="Registracija z Google računom">
                  <span className="flex items-center gap-2 justify-center">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-white rounded-sm">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3.5 h-3.5">
                        <path
                          fill="#EA4335"
                          d="M12 10.2v3.6h5.1c-.2 1.2-.8 2.2-1.7 2.9l2.7 2.1c1.6-1.5 2.6-3.7 2.6-6.3 0-.6-.1-1.2-.2-1.8H12z"
                        />
                        <path
                          fill="#34A853"
                          d="M6.6 14.3l-.9.7-2.1 1.6C5.4 19.9 8.5 22 12 22c2.4 0 4.4-.8 5.9-2.2l-2.7-2.1c-.7.5-1.6.8-2.7.8-2 0-3.8-1.3-4.4-3.1z"
                        />
                        <path
                          fill="#4A90E2"
                          d="M3.6 7.4 6.3 9.6c.6-1.8 2.4-3.1 4.4-3.1 1.3 0 2.5.4 3.4 1.3l2.6-2.6C15.9 3.3 14 2.6 12 2.6c-3.5 0-6.6 2.1-8.1 5z"
                        />
                        <path
                          fill="#FBBC05"
                          d="m12 10.2 2.8-2.2c-.4-.3-1-.6-1.7-.6-2 0-3.8 1.3-4.4 3.1l-2.7-2.2c-.3.6-.5 1.3-.5 2 0 .7.2 1.4.5 2l2.7-2.2c.6-1.8 2.4-3.1 4.4-3.1.7 0 1.3.2 1.7.6z"
                        />
                      </svg>
                    </span>
                    Registracija z Google
                  </span>
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Popolnoma brezplačno • Brezplačen dostop v beta fazi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
