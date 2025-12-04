const advantages = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1"/>
        <rect width="7" height="7" x="14" y="3" rx="1"/>
        <rect width="7" height="7" x="14" y="14" rx="1"/>
        <rect width="7" height="7" x="3" y="14" rx="1"/>
      </svg>
    ),
    title: "Več portalov hkrati",
    description: "Spremlja več nepremičninskih portalov naenkrat – ne zamudite oglasa, ker ste gledali napačno stran.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
    ),
    title: "Filtrira nepopolne oglase",
    description: "Izloči oglase brez cene ali kvadrature – prejmete samo uporabne informacije, brez šuma.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z"/>
        <path d="M22 2 11 13"/>
      </svg>
    ),
    title: "Takojšnja obvestila",
    description: "Telegram ali e-poštna obvestila, prilagojena vašim preferencam – bodite obveščeni v trenutku.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    title: "Nikoli ne zamudite priložnosti",
    description: "Bodite med prvimi, ki izveste za nove oglase – pred konkurenco in drugimi iskalci.",
  },
];

export const WhyScoutSection = () => {
  return (
    <section className="py-28 bg-background">
      <div className="container px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            </svg>
            Prednosti
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Zakaj izbrati Skavta
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ključne prednosti, ki vas ločijo od množice iskalcev nepremičnin
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl border-2 border-border bg-secondary/30 hover:bg-secondary/50 hover:border-accent/40 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                  {advantage.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
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
