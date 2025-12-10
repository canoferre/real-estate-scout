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
  img_url?: string;
  created_at?: string;
}

export interface HealthResponse {
  status: string;
  message: string;
}

export interface AuthResponse {
  token: string;
  email: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface DealInsightResponse {
  summary: string;
}

export interface SearchProfile {
  id: string;
  name: string;
  searchTerm: string;
  city?: string;
  district?: string;
  source?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  priorities?: string;
  aiSummary?: string;
}

// Offers API
export async function fetchOffers(searchTerm?: string): Promise<Offer[]> {
  const query = searchTerm?.trim()
    ? `?q=${encodeURIComponent(searchTerm.trim())}`
    : "";
  const res = await fetch(`${API_URL}/api/offers${query}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Napaka pri nalaganju oglasov");
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

// Auth API
export async function apiRegister(email: string, password: string): Promise<RegisterResponse> {
  const res = await fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.error || "Napaka pri registraciji");
  }
  
  return data;
}

export async function apiLogin(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.error || "Nepravilni podatki za prijavo");
  }
  
  return data;
}

// Token management
const TOKEN_KEY = "skavt_token";
const USER_EMAIL_KEY = "skavt_user_email";

export function saveAuthToken(token: string, email: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_EMAIL_KEY, email);
}

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUserEmail(): string | null {
  return localStorage.getItem(USER_EMAIL_KEY);
}

export function clearAuthToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_EMAIL_KEY);
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

// Helper za izračun cene na m2
export function calculatePricePerM2(price: number, area: number): number {
  if (!area || area === 0) return 0;
  return Math.round(price / area);
}

// TODO: zamenjaj z /api/offers/best, ko bo baza pripravljena
export function getBestOffers(offers: Offer[], limit: number = 5): Offer[] {
  return [...offers]
    .filter(o => o.price && o.area_m2)
    .sort((a, b) => calculatePricePerM2(a.price, a.area_m2) - calculatePricePerM2(b.price, b.area_m2))
    .slice(0, limit);
}

// Formatiraj ceno
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('sl-SI').format(price) + ' €';
}

// Shranjene nepremičnine v localStorage
const SAVED_OFFERS_KEY = "skavt_saved_offers";
const SEARCH_PROFILES_KEY = "skavt_search_profiles";

const defaultProfile = (): SearchProfile => ({
  id: "profil-1",
  name: "Privzeti profil",
  searchTerm: "",
  city: "",
  district: "",
  source: "",
  priorities: "",
});

function getSavedOfferIds(): number[] {
  try {
    const saved = localStorage.getItem(SAVED_OFFERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function setSavedOfferIds(ids: number[]): void {
  localStorage.setItem(SAVED_OFFERS_KEY, JSON.stringify(ids));
}

export function loadSavedOffers(): number[] {
  return getSavedOfferIds();
}

function parseProfiles(raw: string | null): SearchProfile[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

export function loadSearchProfiles(): SearchProfile[] {
  const stored = parseProfiles(localStorage.getItem(SEARCH_PROFILES_KEY));
  if (stored.length === 0) {
    const defaults = [defaultProfile()];
    localStorage.setItem(SEARCH_PROFILES_KEY, JSON.stringify(defaults));
    return defaults;
  }
  return stored;
}

export function saveSearchProfiles(profiles: SearchProfile[]): SearchProfile[] {
  const sanitized = profiles.map((profile) => ({
    ...profile,
    searchTerm: profile.searchTerm || "",
    city: profile.city || "",
    district: profile.district || "",
    source: profile.source || "",
    priorities: profile.priorities || "",
  }));

  localStorage.setItem(SEARCH_PROFILES_KEY, JSON.stringify(sanitized));
  return sanitized;
}

export function saveOffer(offerId: number): number[] {
  const ids = new Set(getSavedOfferIds());
  ids.add(offerId);
  const updated = Array.from(ids);
  setSavedOfferIds(updated);
  return updated;
}

export function removeSavedOffer(offerId: number): number[] {
  const ids = new Set(getSavedOfferIds());
  ids.delete(offerId);
  const updated = Array.from(ids);
  setSavedOfferIds(updated);
  return updated;
}

export async function getProfileInsight(profile: SearchProfile): Promise<string> {
  const res = await fetch(`${API_URL}/api/deal-insight`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profile }),
  });

  const data: DealInsightResponse & { error?: string } = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "AI povzetek profila trenutno ni na voljo");
  }

  return data.summary;
}
