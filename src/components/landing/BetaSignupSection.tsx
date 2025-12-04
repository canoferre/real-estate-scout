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
    <section id="signup" className="py-24 bg-primary">
      <div className="container px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Zaprta beta</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Prijavite se na beta
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Trenutno v zaprti beta fazi – prvih 30 uporabnikov dobi popoln dostop brezplačno.
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-primary-foreground font-medium">
                  Ime
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Vaše ime"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary-foreground font-medium">
                  E-pošta
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="vas@email.si"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent"
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
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent"
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
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              variant="accent" 
              size="lg" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Pošiljam..."
              ) : (
                <>
                  Prijavi se na beta
                  <Send className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
