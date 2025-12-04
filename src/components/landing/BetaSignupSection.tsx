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
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Prijava uspešna! 🎉",
      description: "Hvala za interes. Kmalu vas bomo kontaktirali.",
    });
    
    setFormData({ name: "", email: "", location: "", propertyType: "" });
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
              <span className="text-sm font-semibold">Zaprta beta</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-5">
              Pridružite se beta programu
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Trenutno v zaprti beta fazi – prvih <span className="font-bold text-accent">30 uporabnikov</span> dobi popoln dostop popolnoma brezplačno.
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-primary-foreground/5 p-8 rounded-3xl border border-primary-foreground/10">
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
              S prijavo se strinjate z obdelavo vaših podatkov za namen beta programa.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
