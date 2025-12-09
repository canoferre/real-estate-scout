import { useEffect, useState } from "react";
import { fetchOffers, getBestOffers, calculatePricePerM2, type Offer } from "@/lib/api";
import { ExternalLink, MapPin, Home, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const OffersSection = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const data = await fetchOffers();
        setOffers(data);
      } catch (err) {
        setError("Napaka pri nalaganju oglasov. Poskusite znova.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOffers();
  }, []);

  if (loading) {
    return (
      <section id="oglasi" className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="oglasi" className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-destructive">{error}</p>
        </div>
      </section>
    );
  }

  const latestOffers = offers.slice(0, 6);
  // TODO: zamenjaj z /api/offers/best, ko bo baza pripravljena
  const bestOffers = getBestOffers(offers, 3);

  return (
    <section id="oglasi" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Najboljše priložnosti */}
        <div className="mb-16">
          <div className="flex items-center gap-3 justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Najboljše priložnosti
            </h2>
          </div>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Oglasi z najnižjo ceno na kvadratni meter – idealni za vlagatelje in iskane nepremičnine.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {bestOffers.map((offer, index) => (
              <div
                key={offer.id}
                className="bg-background border-2 border-accent/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-3 py-1 text-sm font-semibold rounded-bl-xl">
                  #{index + 1} TOP
                </div>
                
                <div className="flex items-start gap-3 mb-4 mt-4">
                  <Home className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <h3 className="font-semibold text-foreground text-lg leading-tight">
                    {offer.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{offer.city}, {offer.district}</span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cena:</span>
                    <span className="font-bold text-foreground">
                      {offer.price.toLocaleString('sl-SI')} €
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Površina:</span>
                    <span className="font-semibold text-foreground">{offer.area_m2} m²</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <span className="text-muted-foreground">Cena/m²:</span>
                    <span className="font-bold text-accent">
                      {calculatePricePerM2(offer.price, offer.area_m2).toLocaleString('sl-SI')} €/m²
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded capitalize">
                    {offer.source}
                  </span>
                  <Button variant="ghost" size="sm" asChild className="text-accent hover:text-accent">
                    <a href={offer.url} target="_blank" rel="noopener noreferrer">
                      Poglej <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zadnji oglasi */}
        <div>
          <div className="flex items-center gap-3 justify-center mb-4">
            <Clock className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Zadnji oglasi
            </h2>
          </div>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Najnovejši oglasi, ki jih je Skavt odkril na različnih portalih.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {latestOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-background border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Home className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-foreground leading-tight">
                    {offer.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{offer.city}, {offer.district}</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-lg text-foreground">
                    {offer.price.toLocaleString('sl-SI')} €
                  </span>
                  <span className="text-muted-foreground">{offer.area_m2} m²</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded capitalize">
                    {offer.source}
                  </span>
                  <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary">
                    <a href={offer.url} target="_blank" rel="noopener noreferrer">
                      Poglej <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
