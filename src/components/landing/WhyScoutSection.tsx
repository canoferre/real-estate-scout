import { Layers, Filter, Zap, Target } from "lucide-react";

const advantages = [
  {
    icon: Layers,
    title: "Več portalov hkrati",
    description: "Ne spremlja le enega, ampak več nepremičninskih portalov naenkrat.",
  },
  {
    icon: Filter,
    title: "Filtrira nepopolne oglase",
    description: "Izloči oglase brez cene ali kvadrature – prejmete samo uporabne informacije.",
  },
  {
    icon: Zap,
    title: "Takojšnja obvestila",
    description: "Telegram ali e-poštna obvestila, prilagojena vašim preferencam.",
  },
  {
    icon: Target,
    title: "Ne zamudite priložnosti",
    description: "Budite med prvimi, ki izveste za nove oglase – pred konkurenco.",
  },
];

export const WhyScoutSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Zakaj izbrati Skavta
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ključne prednosti, ki vas ločijo od množice iskalcev
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/50 hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <advantage.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
