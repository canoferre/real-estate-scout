import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";

export const ContactSection = () => {
  return (
    <section className="py-28 bg-background">
      <div className="container px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Mail className="w-4 h-4" />
            Kontakt
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Imate vprašanje?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Smo vam na voljo za vsa vprašanja, predloge ali povratne informacije. Pišite nam!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:info@nepremicninskiskavt.si">
              <Button variant="outline" size="lg" className="min-w-[200px] border-2">
                <Mail className="w-5 h-5" />
                info@nepremicninskiskavt.si
              </Button>
            </a>
            <a href="https://t.me/nepremicninskiskavt" target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="lg" className="min-w-[200px]">
                <Send className="w-5 h-5" />
                Telegram podpora
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
