import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, Sparkles } from "lucide-react";

export const BetaSignupSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    propertyType: "",
    inviteCode: "",
  });

  const googleAuthUrl = import.meta.env.VITE_GOOGLE_AUTH_URL || "/api/auth/google";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Zahteva za povabilo poslana! 🎉",
      description: "Hvala za interes. Povabilo boste prejeli na e-pošto, če izpolnjujete pogoje beta programa.",
    });

    setFormData({ name: "", email: "", location: "", propertyType: "", inviteCode: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="signup" className="py-28 bg-primary">
      <div className="container px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Zaprta beta (povabila)</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-5">
              Pridružite se beta programu
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Registracija je možna samo z vabilom. Prvih <span className="font-bold text-accent">30 uporabnikov</span> z vabilom dobi popoln dostop popolnoma brezplačno.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-primary-foreground/5 p-8 rounded-3xl border border-primary-foreground/10">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full border-2 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <a href={googleAuthUrl} aria-label="Prijava v beta program z Google računom">
                <span className="flex items-center gap-3 justify-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-white rounded-sm">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4">
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
                  Nadaljuj z Google
                </span>
              </a>
            </Button>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-primary-foreground font-medium">
                  Ime in priimek
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Vaše ime"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent h-12 rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary-foreground font-medium">
                  E-poštni naslov
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="vas@email.si"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent h-12 rounded-xl"
                />
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-primary-foreground font-medium">
                  Želena lokacija
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="npr. Ljubljana, Maribor..."
                  value={formData.location}
                  onChange={handleChange}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent h-12 rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="propertyType" className="text-primary-foreground font-medium">
                  Tip nepremičnine / proračun
                </Label>
                <Input
                  id="propertyType"
                  name="propertyType"
                  placeholder="npr. 2-sobno, do 200k €"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent h-12 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inviteCode" className="text-primary-foreground font-medium">
                Koda povabila
              </Label>
              <Input
                id="inviteCode"
                name="inviteCode"
                placeholder="npr. INVITE-123"
                value={formData.inviteCode}
                onChange={handleChange}
                required
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent h-12 rounded-xl"
              />
            </div>

            <Button
              type="submit"
              variant="accent"
              size="xl" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Pošiljam prijavo..."
              ) : (
                <>
                  Prijavi se na beta
                  <Send className="w-5 h-5" />
                </>
              )}
            </Button>

            <p className="text-center text-primary-foreground/60 text-sm">
              Registracija je možna samo s kodo povabila. S prijavo se strinjate z obdelavo vaših podatkov za namen beta programa.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
