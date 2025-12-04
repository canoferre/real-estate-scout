const steps = [
  {
    number: "01",
    title: "Povejte, kaj iščete",
    description: "Lokacija, cena, velikost, tip nepremičnine – Skavt si zapomni vaše preference in išče točno to, kar potrebujete.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Skavt spremlja portale",
    description: "Neprekinjeno zbira in čisti podatke z več nepremičninskih portalov v Sloveniji – vi le čakate na rezultate.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34"/>
        <path d="M4 6h.01"/>
        <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35"/>
        <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67"/>
        <path d="M12 18h.01"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Prejmete samo relevantne zadetke",
    description: "Brez šuma, brez neskončnega brskanja – samo oglasi, ki ustrezajo vašim kriterijem, direktno na vaš telefon.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
      </svg>
    ),
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-28 bg-background">
      <div className="container px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Preprosto in učinkovito
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Kako deluje
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tri preprosti koraki do vaše sanjske nepremičnine
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-secondary/50 border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Step number */}
              <span className="absolute top-6 right-6 text-7xl font-black text-accent/10 group-hover:text-accent/20 transition-colors">
                {step.number}
              </span>
              
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground text-accent transition-all duration-300">
                {step.icon}
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
