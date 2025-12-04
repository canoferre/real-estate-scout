const roadmapItems = [
  {
    status: "soon",
    title: "Več iskalnih profilov",
    description: "Ustvarite ločene iskalne profile za različne vrste nepremičnin ali lokacije.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <line x1="19" x2="19" y1="8" y2="14"/>
        <line x1="22" x2="16" y1="11" y2="11"/>
      </svg>
    ),
  },
  {
    status: "planned",
    title: "Analiza cen",
    description: "Primerjava cen podobnih nepremičnin in trendi na trgu za boljše odločitve.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" x2="12" y1="20" y2="10"/>
        <line x1="18" x2="18" y1="20" y2="4"/>
        <line x1="6" x2="6" y1="20" y2="16"/>
      </svg>
    ),
  },
  {
    status: "planned",
    title: "Mobilna aplikacija",
    description: "Nativna aplikacija za iOS in Android z vsemi funkcionalnostmi.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
        <line x1="12" x2="12.01" y1="18" y2="18"/>
      </svg>
    ),
  },
  {
    status: "future",
    title: "AI priporočila",
    description: "Pametna priporočila na podlagi vaših preferenc in obnašanja na trgu.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      </svg>
    ),
  },
  {
    status: "future",
    title: "Opozorila o padcih cen",
    description: "Avtomatska obvestila, ko se cena nepremičnine, ki vas zanima, zniža.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m3 16 4 4 4-4"/>
        <path d="M7 20V4"/>
        <path d="M11 4h10"/>
        <path d="M11 8h7"/>
        <path d="M11 12h4"/>
      </svg>
    ),
  },
];

const statusColors = {
  soon: "bg-accent text-accent-foreground",
  planned: "bg-primary/10 text-primary",
  future: "bg-muted text-muted-foreground",
};

const statusLabels = {
  soon: "Kmalu",
  planned: "V načrtu",
  future: "Prihodnost",
};

export const RoadmapSection = () => {
  return (
    <section className="py-28 bg-background">
      <div className="container px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 22h14"/>
              <path d="M5 2h14"/>
              <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/>
              <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
            </svg>
            Načrt razvoja
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Kaj prihaja kmalu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Neprestano izboljšujemo Skavta – tukaj je nekaj funkcij, ki jih načrtujemo
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {roadmapItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-6 p-6 rounded-2xl bg-secondary/30 border border-border hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
              <span className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[item.status as keyof typeof statusColors]}`}>
                {statusLabels[item.status as keyof typeof statusLabels]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
