import { Heart, MapPin, Clock, Check } from "lucide-react";

const audiences = [
  {
    icon: Heart,
    text: "Pari ali družine, ki aktivno iščete stanovanje ali hišo",
  },
  {
    icon: MapPin,
    text: "Ljudje v Ljubljani ali drugih večjih mestih, kjer dobri oglasi hitro izginejo",
  },
  {
    icon: Clock,
    text: "Vsi, ki želite manj, a bolj relevantnih oglasov brez stalnega ročnega preverjanja",
  },
];

export const WhoItsForSection = () => {
  return (
    <section className="py-24 bg-gradient-hero">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Za koga je Skavt
            </h2>
            <p className="text-lg text-muted-foreground">
              Idealen za vse, ki cenijo svoj čas
            </p>
          </div>
          
          <div className="space-y-6">
            {audiences.map((audience, index) => (
              <div 
                key={index}
                className="flex items-start gap-5 p-6 rounded-xl bg-background border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <audience.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-lg text-foreground font-medium leading-relaxed">
                    {audience.text}
                  </p>
                </div>
                <Check className="flex-shrink-0 w-6 h-6 text-accent mt-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
