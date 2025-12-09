import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  fetchOffers,
  getBestOffers,
  formatPrice,
  calculatePricePerM2,
  Offer,
  loadSavedOffers,
  saveOffer,
  removeSavedOffer,
  getOfferInsight,
} from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';

type OfferCardProps = {
  offer: Offer;
  isSaved: boolean;
  onToggleSave: (offer: Offer) => void;
  insight?: string;
  isEvaluating?: boolean;
  onEvaluate: (offer: Offer) => void;
};

function OfferCard({ offer, isSaved, insight, isEvaluating, onToggleSave, onEvaluate }: OfferCardProps) {
  const pricePerM2 = calculatePricePerM2(offer.price, offer.area_m2);

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-accent/50 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground line-clamp-2">{offer.title}</h3>
          <span className="text-xs inline-flex mt-1 px-2 py-1 rounded-full bg-muted text-muted-foreground capitalize shrink-0">
            {offer.source}
          </span>
        </div>
        <Button
          variant={isSaved ? 'default' : 'ghost'}
          size="icon"
          className={`shrink-0 ${isSaved ? 'bg-accent text-accent-foreground' : ''}`}
          onClick={() => onToggleSave(offer)}
          aria-label={isSaved ? 'Odstrani iz shranjenih' : 'Shrani nepremičnino'}
        >
          {isSaved ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M5 4a2 2 0 00-2 2v15l9-4 9 4V6a2 2 0 00-2-2H5z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 00-2 2v13l9-4 9 4V7a2 2 0 00-2-2H5z" />
            </svg>
          )}
        </Button>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-muted-foreground">
            {offer.city}{offer.district ? `, ${offer.district}` : ''}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-accent">{formatPrice(offer.price)}</span>
            <span className="text-sm text-muted-foreground">{offer.area_m2} m²</span>
          </div>
          {pricePerM2 > 0 && (
            <span className="text-xs text-muted-foreground">{formatPrice(pricePerM2)}/m²</span>
          )}
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3l1.902 5.858H20l-4.951 3.596L16.951 18 12 14.82 7.049 18l1.902-5.546L4 8.858h6.098L12 3z"
                />
              </svg>
              <span>AI ocena posla</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary"
              onClick={() => onEvaluate(offer)}
              disabled={isEvaluating}
              aria-label="Pridobi AI oceno"
            >
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-gradient-to-br from-primary/10 via-background to-background text-[11px] font-semibold uppercase tracking-wide ${
                  isEvaluating ? 'opacity-70' : ''
                }`}
              >
                {isEvaluating ? (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                    <path className="opacity-75" d="M4 12a8 8 0 018-8" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                ) : (
                  'AI'
                )}
              </span>
            </Button>
          </div>

          {insight && (
            <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-background to-background p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
                  AI
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary/70">AI ocena posla</p>
                  <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{insight}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => window.open(offer.url, '_blank')}
      >
        Odpri oglas
        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </Button>
    </div>
  );
}

export default function Dashboard() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [savedOfferIds, setSavedOfferIds] = useState<number[]>([]);
  const [insights, setInsights] = useState<Record<number, string>>({});
  const [insightLoading, setInsightLoading] = useState<Record<number, boolean>>({});
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Zaščita strani
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/prijava');
    }
  }, [isAuthenticated, navigate]);

  // Naloži oglase
  useEffect(() => {
    async function loadOffers() {
      try {
        const data = await fetchOffers();
        setOffers(data);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Napaka pri nalaganju oglasov';
        setError(message);
        toast({
          title: "Napaka",
          description: message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    if (isAuthenticated) {
      loadOffers();
      setSavedOfferIds(loadSavedOffers());
    }
  }, [isAuthenticated, toast]);

  const handleToggleSave = (offer: Offer) => {
    setSavedOfferIds((current) => {
      const isAlreadySaved = current.includes(offer.id);
      const updated = isAlreadySaved ? removeSavedOffer(offer.id) : saveOffer(offer.id);

      toast({
        title: isAlreadySaved ? 'Odstranjeno iz shranjenih' : 'Shranjeno',
        description: isAlreadySaved
          ? 'Oglas je bil odstranjen iz shranjenih.'
          : 'Oglas je shranjen med priljubljene.',
      });

      return updated;
    });
  };

  const handleEvaluateOffer = async (offer: Offer) => {
    setInsightLoading((prev) => ({ ...prev, [offer.id]: true }));

    try {
      const summary = await getOfferInsight(offer);
      setInsights((prev) => ({ ...prev, [offer.id]: summary }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'AI ocena ni uspela';
      toast({
        title: 'AI ocena ni uspela',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setInsightLoading((prev) => ({ ...prev, [offer.id]: false }));
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredOffers = normalizedSearch
    ? offers.filter((offer) => {
        const haystack = `${offer.title} ${offer.city} ${offer.district} ${offer.source}`.toLowerCase();
        return haystack.includes(normalizedSearch);
      })
    : offers;

  const bestOffers = getBestOffers(filteredOffers, 3);
  const latestOffers = filteredOffers.slice(0, 6);
  const savedOffers = offers.filter((offer) => savedOfferIds.includes(offer.id));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-10 space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  Trenutne ponudbe
                </h1>
                <p className="text-muted-foreground text-lg">
                  Preglejte najnovejše nepremičninske oglase, ki ustrezajo vašim kriterijem.
                </p>
              </div>
              <div className="md:w-96">
                <label className="text-sm text-muted-foreground mb-1 block" htmlFor="offer-search">
                  Išči po naslovu, mestu ali viru
                </label>
                <div className="relative">
                  <svg
                    className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.25 5.25a7.5 7.5 0 0011.4 11.4z" />
                  </svg>
                  <Input
                    id="offer-search"
                    placeholder="Vnesi iskalni niz"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <svg className="animate-spin h-10 w-10 text-accent mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-muted-foreground">Nalagam oglase...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6 text-center">
              <svg className="w-12 h-12 text-destructive mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-destructive font-medium">{error}</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Poskusi znova
              </Button>
            </div>
          ) : offers.length === 0 ? (
            <div className="bg-muted/50 border border-border rounded-xl p-12 text-center">
              <svg className="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-xl font-semibold text-foreground mb-2">Ni oglasov</h3>
              <p className="text-muted-foreground">
                Trenutno ni na voljo nobenih oglasov. Preverite kasneje.
              </p>
            </div>
          ) : filteredOffers.length === 0 ? (
            <div className="bg-muted/50 border border-border rounded-xl p-12 text-center">
              <svg className="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.803 5.803a7.5 7.5 0 0010 10z" />
              </svg>
              <h3 className="text-xl font-semibold text-foreground mb-2">Ni zadetkov</h3>
              <p className="text-muted-foreground">
                Spremenite iskalni niz ali izbrišite polje, da se prikažejo vse ponudbe.
              </p>
            </div>
          ) : (
            <>
              {savedOffers.length > 0 && (
                <section className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-secondary/30 flex items-center justify-center">
                      <svg className="w-5 h-5 text-secondary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 00-2 2v13l9-4 9 4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Shranjene nepremičnine</h2>
                      <p className="text-sm text-muted-foreground">Vaši izbrani oglasi</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {savedOffers.map((offer) => (
                      <OfferCard
                        key={`saved-${offer.id}`}
                        offer={offer}
                        isSaved
                        onToggleSave={handleToggleSave}
                        insight={insights[offer.id]}
                        isEvaluating={insightLoading[offer.id]}
                        onEvaluate={handleEvaluateOffer}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Najboljše priložnosti */}
              {bestOffers.length > 0 && (
                <section className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Najboljše priložnosti</h2>
                      <p className="text-sm text-muted-foreground">Najnižja cena na m²</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {bestOffers.map((offer) => (
                      <OfferCard
                        key={`best-${offer.id}`}
                        offer={offer}
                        isSaved={savedOfferIds.includes(offer.id)}
                        onToggleSave={handleToggleSave}
                        insight={insights[offer.id]}
                        isEvaluating={insightLoading[offer.id]}
                        onEvaluate={handleEvaluateOffer}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Zadnji oglasi */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Zadnji oglasi</h2>
                    <p className="text-sm text-muted-foreground">Najnovejše objave</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {latestOffers.map((offer) => (
                    <OfferCard
                      key={`latest-${offer.id}`}
                      offer={offer}
                      isSaved={savedOfferIds.includes(offer.id)}
                      onToggleSave={handleToggleSave}
                      insight={insights[offer.id]}
                      isEvaluating={insightLoading[offer.id]}
                      onEvaluate={handleEvaluateOffer}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
}
