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
    <section className="py-28 bg-gradient-hero">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Idealno za
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
              Za koga je Skavt
            </h2>
            <p className="text-lg text-muted-foreground">
              Idealen za vse, ki cenijo svoj čas in želijo prednost pred drugimi iskalci
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {audiences.map((audience, index) => (
              <div 
                key={index}
                className="flex items-start gap-5 p-6 rounded-2xl bg-background border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  {audience.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {audience.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
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
