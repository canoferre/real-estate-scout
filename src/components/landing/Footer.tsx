import { Search } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 bg-primary">
      <div className="container px-6">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 text-primary-foreground">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <Search className="w-4 h-4 text-accent" />
            </div>
            <span className="font-bold">Slovenski Nepremičninski Skavt</span>
          </div>
          
          {/* Copyright */}
          <p className="text-sm text-primary-foreground/60">
            © Slovenski Nepremičninski Skavt – 2025
          </p>
        </div>
      </div>
    </footer>
  );
};
