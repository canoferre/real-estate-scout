import { Check } from "lucide-react";

const audiences = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    ),
    title: "Pari in družine",
    text: "Ki aktivno iščete stanovanje ali hišo in želite biti prvi pri dobrih oglasih.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: "Iskalci v mestih",
    text: "V Ljubljani, Mariboru ali drugih večjih mestih, kjer dobri oglasi hitro izginejo.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Zaposleni brez časa",
    text: "Vsi, ki želite manj, a bolj relevantnih oglasov brez stalnega ročnega preverjanja.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: "Investitorji",
    text: "Ki spremljate trg in iščete dobre priložnosti za nakup nepremičnin.",
  },
];

export const WhoItsForSection = () => {
  return (
    <section className="py-28 bg-gradient-to-b from-secondary/30 via-background to-background">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4 border border-border/70">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Idealno za
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Za koga je Skavt
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Od prvih kupcev do zahtevnih investitorjev – Skavt prilagodi obveščanje vašim ciljem in tempiranju nakupa.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {audiences.map((audience, index) => (
              <div
                key={index}
                className="group h-full rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-5 shadow-lg shadow-black/5 hover:-translate-y-1 hover:border-accent/60 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                    {audience.icon}
                  </div>
                  <Check className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{audience.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{audience.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
