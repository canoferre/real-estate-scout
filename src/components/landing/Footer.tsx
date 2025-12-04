import { Send, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-16 bg-primary">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          {/* Logo and Description */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <span className="text-xl font-bold text-primary-foreground">Slovenski Nepremičninski Skavt</span>
            </div>
            <p className="text-primary-foreground/70 max-w-md">
              Avtomatizirano iskanje nepremičnin po Sloveniji. Prihranite čas, bodite prvi.
            </p>
          </div>
          
          {/* Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            <a 
              href="mailto:info@nepremicninskiskavt.si" 
              className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4" />
              info@nepremicninskiskavt.si
            </a>
            <a 
              href="https://t.me/nepremicninskiskavt_bot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors"
            >
              <Send className="w-4 h-4" />
              @nepremicninskiskavt_bot
            </a>
          </div>
          
          {/* Divider */}
          <div className="border-t border-primary-foreground/10 pt-8">
            <p className="text-center text-sm text-primary-foreground/50">
              © {new Date().getFullYear()} Slovenski Nepremičninski Skavt. Vse pravice pridržane.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
