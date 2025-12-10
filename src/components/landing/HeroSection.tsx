import { Button } from "@/components/ui/button";
import { ArrowRight, UserPlus, MapPin, ShieldCheck, Sparkles, BadgeEuro, LogIn } from "lucide-react";

export const HeroSection = () => {
  const scrollToSignup = () => {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { label: "Obveščeni v", value: "< 60 sekund" },
    { label: "Spremljanih portalov", value: "7" },
    { label: "Aktivnih filtrov", value: "250+" },
  ];

  const featuredListings = [
    {
      title: "Moderno stanovanje s teraso",
      price: "389.000 €",
      location: "Ljubljana - Vič",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop",
      tag: "Novo na trgu",
    },
    {
      title: "Hiša z vrtom in garažo",
      price: "520.000 €",
      location: "Maribor - Studenci",
      image:
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1600&auto=format&fit=crop",
      tag: "Ekskluzivno",
    },
    {
      title: "Svetlo 2-sobno stanovanje",
      price: "265.000 €",
      location: "Koper - Center",
      image:
        "https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=1600&auto=format&fit=crop",
      tag: "Obalno",
    },
  ];

  const stats = [
    { label: "Obveščeni v", value: "< 60 sekund" },
    { label: "Spremljanih portalov", value: "7" },
    { label: "Aktivnih filtrov", value: "250+" },
  ];

  const featuredListings = [
    {
      title: "Moderno stanovanje s teraso",
      price: "389.000 €",
      location: "Ljubljana - Vič",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop",
      tag: "Novo na trgu",
    },
    {
      title: "Hiša z vrtom in garažo",
      price: "520.000 €",
      location: "Maribor - Studenci",
      image:
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1600&auto=format&fit=crop",
      tag: "Ekskluzivno",
    },
    {
      title: "Svetlo 2-sobno stanovanje",
      price: "265.000 €",
      location: "Koper - Center",
      image:
        "https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=1600&auto=format&fit=crop",
      tag: "Obalno",
    },
  ];

  return (
    <>
      <div className="absolute top-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl z-10" />
      <div className="absolute bottom-10 right-16 w-[28rem] h-[28rem] bg-primary/10 rounded-full blur-3xl z-10" />

      <div className="container relative z-20 px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 bg-background/70 backdrop-blur-sm border border-border/70 rounded-3xl p-8 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Nova generacija nepremičninskega skavta</span>
            </div>

            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.25em] text-accent font-semibold">Realnočasovno iskanje</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
                Poiščite nepremičnino, še preden dobi konkurenco
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Skavt spremlja slovenski trg 24/7, filtrira nepopolne oglase in vas v trenutku obvesti, ko se pojavi prava priložnost. Zgrajen za ljudi, ki ne želijo zamuditi naslednjega doma ali investicije.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 rounded-2xl bg-secondary/40 border border-border px-4 py-3">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Preverjeni viri</p>
                  <p className="font-semibold">Brez šuma in lažnih oglasov</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-secondary/40 border border-border px-4 py-3">
                <MapPin className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Personalizirani filtri</p>
                  <p className="font-semibold">Lokacija, cena, tip, kvadratura</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                variant="hero"
                size="xl"
                onClick={scrollToSignup}
                className="group min-w-[220px] shadow-lg shadow-accent/30"
              >
                <UserPlus className="w-5 h-5" />
                Ustvari račun (beta)
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={scrollToSignup}
                className="group min-w-[220px] border-2 bg-background/70 backdrop-blur-sm hover:bg-background/90"
              >
                Prijavi se
                <LogIn className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/70 border border-border">
                <BadgeEuro className="w-4 h-4 text-accent" />
                Brezplačno v beta fazi
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/70 border border-border">
                <Sparkles className="w-4 h-4 text-accent" />
                Obvestila v slovenščini
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/70 border border-border">
                <ShieldCheck className="w-4 h-4 text-accent" />
                Varno in zasebno
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border/70 bg-background/80 backdrop-blur-sm shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/80 bg-gradient-to-r from-primary/10 via-background to-accent/5">
                <div>
                  <p className="text-sm text-muted-foreground">Trenutno spremljanje</p>
                  <p className="text-2xl font-bold">Najbolj iskane regije</p>
                </div>
                <div className="flex gap-3 text-sm">
                  <span className="px-3 py-1 rounded-full bg-secondary/80 border border-border text-muted-foreground">Ljubljana</span>
                  <span className="px-3 py-1 rounded-full bg-secondary/80 border border-border text-muted-foreground">Obala</span>
                  <span className="px-3 py-1 rounded-full bg-secondary/80 border border-border text-muted-foreground">Gorenjska</span>
                </div>
              </div>

              <div className="grid gap-4 p-6">
                {featuredListings.map((listing, index) => (
                  <div
                    key={listing.title}
                    className={`group rounded-2xl overflow-hidden border border-border/80 bg-secondary/40 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 ${
                      index === 0 ? "lg:col-span-2" : ""
                    }`}
                  >
                    <div className="relative h-52 sm:h-60">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute left-4 top-4 inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        <Sparkles className="w-4 h-4" /> {listing.tag}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-start justify-between gap-3">
                        <div className="space-y-1 text-background">
                          <p className="text-xs uppercase tracking-[0.2em] text-white/70">{listing.location}</p>
                          <p className="text-xl font-bold leading-tight">{listing.title}</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-sm font-semibold text-foreground shadow-sm">
                          <BadgeEuro className="w-4 h-4" />
                          {listing.price}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-secondary/60 border border-border/70 p-4 text-center shadow-lg"
                >
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
