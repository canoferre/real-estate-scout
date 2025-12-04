import { Settings, Radar, Bell } from "lucide-react";

const steps = [
  {
    icon: Settings,
    number: "01",
    title: "Poveste mu, kaj iščete",
    description: "Lokacija, cena, velikost, tip nepremičnine – Skavt si zapomni vaše preference.",
  },
  {
    icon: Radar,
    number: "02",
    title: "Skavt spremlja portale",
    description: "Neprekinjeno zbira in čisti podatke z več nepremičninskih portalov.",
  },
  {
    icon: Bell,
    number: "03",
    title: "Prejmete samo relevantne zadetke",
    description: "Brez šuma, brez neskončnega brskanja – samo oglasi, ki ustrezajo vam.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Kako deluje
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tri preprosti koraki do vaše sanjske nepremičnine
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-secondary/50 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Step number */}
              <span className="absolute top-6 right-6 text-6xl font-extrabold text-accent/10 group-hover:text-accent/20 transition-colors">
                {step.number}
              </span>
              
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <step.icon className="w-7 h-7 text-accent" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
