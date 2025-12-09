const API_URL = import.meta.env.VITE_API_URL || "";

export interface Offer {
  id: number;
  title: string;
  price: number;
  area_m2: number;
  city: string;
  district: string;
  source: string;
  url: string;
}

export interface HealthResponse {
  status: string;
  message: string;
}

export async function fetchOffers(): Promise<Offer[]> {
  const res = await fetch(`${API_URL}/api/offers`);
  if (!res.ok) {
    throw new Error("Napaka pri nalaganju oglasov");
  }
  return res.json();
}

export async function apiHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_URL}/api/health`);
  if (!res.ok) {
    throw new Error("Napaka pri preverjanju stanja API-ja");
  }
  return res.json();
}

// Helper za izračun cene na m2
export function calculatePricePerM2(price: number, area: number): number {
  return Math.round(price / area);
}

// TODO: zamenjaj z /api/offers/best, ko bo baza pripravljena
export function getBestOffers(offers: Offer[], limit: number = 5): Offer[] {
  return [...offers]
    .sort((a, b) => calculatePricePerM2(a.price, a.area_m2) - calculatePricePerM2(b.price, b.area_m2))
    .slice(0, limit);
}
