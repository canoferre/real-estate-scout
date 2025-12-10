import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  SearchProfile,
  loadSearchProfiles,
  saveSearchProfiles,
  getProfileInsight,
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
  const imageUrl = offer.img_url?.trim();
  const formattedPrice = offer.price ? formatPrice(offer.price) : '—';

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-accent/50 hover:shadow-lg transition-all duration-300">
      <div className="relative mb-4 overflow-hidden rounded-xl border border-border bg-muted">
        <div className="aspect-[4/3]">
          {imageUrl ? (
            <img src={imageUrl} alt={offer.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground/70">
              <svg
                className="h-12 w-12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M5 10.5v8a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 18.5v-8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M9 20v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
        <div className="absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
          {offer.city}
        </div>
      </div>

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
            <span className="text-lg font-semibold text-foreground">{formattedPrice}</span>
            <span className="text-sm text-muted-foreground">{offer.area_m2} m²</span>
          </div>
        </div>

        {/* AI ocena */}
        <div className="pt-2 border-t border-border/50">
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
              className="text-primary h-8 w-8"
              onClick={() => onEvaluate(offer)}
              disabled={isEvaluating}
              aria-label="Pridobi AI oceno"
            >
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 bg-gradient-to-br from-primary/10 via-background to-background text-[10px] font-semibold uppercase tracking-wide ${
                  isEvaluating ? 'opacity-70' : ''
                }`}
              >
                {isEvaluating ? (
                  <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
            <div className="mt-3 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-background to-background p-3 shadow-sm">
              <div className="flex items-start gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wide">
                  AI
                </div>
                <div className="space-y-0.5 min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-primary/70">AI ocena posla</p>
                  <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{insight}</p>
                </div>
              </div>
            </div>
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
                <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{insight}</p>
              </div>
            </div>
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
                <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{insight}</p>
              </div>
            </div>
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
                <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{insight}</p>
              </div>
            </div>
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
                <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{insight}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
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
              {isEvaluating ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                  <path className="opacity-75" d="M4 12a8 8 0 018-8" strokeWidth="4" strokeLinecap="round" />
                </svg>
              ) : (
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-gradient-to-br from-primary/10 via-background to-background text-[11px] font-semibold uppercase tracking-wide">
                  AI
                </span>
              )}
            </Button>
          </div>

          {insight && (
            <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-background to-background p-4 shadow-sm">
              <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{insight}</p>
            </div>
          )}
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
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
              {isEvaluating ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                  <path className="opacity-75" d="M4 12a8 8 0 018-8" strokeWidth="4" strokeLinecap="round" />
                </svg>
              ) : (
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-gradient-to-br from-primary/10 via-background to-background text-[11px] font-semibold uppercase tracking-wide">
                  AI
                </span>
              )}
            </Button>
          </div>

          {insight && (
            <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-background to-background p-4 shadow-sm">
              <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{insight}</p>
            </div>
          )}
        </div>

        <div className="mt-3 space-y-2">
          {/* A single AI control per card; insights are keyed by offer ID so duplicates cannot appear */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
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
              {isEvaluating ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                  <path className="opacity-75" d="M4 12a8 8 0 018-8" strokeWidth="4" strokeLinecap="round" />
                </svg>
              ) : (
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-gradient-to-br from-primary/10 via-background to-background text-[11px] font-semibold uppercase tracking-wide">
                  AI
                </span>
              )}
            </Button>
          </div>

          {insight && (
            <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-background to-background p-4 shadow-sm">
              <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{insight}</p>
            </div>
          )}
        </div>

        <div className="mt-3 space-y-2">
          {/* A single AI control per card; insights are keyed by offer ID so duplicates cannot appear */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
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
              {isEvaluating ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                  <path className="opacity-75" d="M4 12a8 8 0 018-8" strokeWidth="4" strokeLinecap="round" />
                </svg>
              ) : (
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-gradient-to-br from-primary/10 via-background to-background text-[11px] font-semibold uppercase tracking-wide">
                  AI
                </span>
              )}
            </Button>
          </div>

          {insight && (
            <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-background to-background p-4 shadow-sm">
              <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{insight}</p>
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
  const [profiles, setProfiles] = useState<SearchProfile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [profilesOpen, setProfilesOpen] = useState(false);
  const [savedOfferIds, setSavedOfferIds] = useState<number[]>([]);
  const [insights, setInsights] = useState<Record<number, string>>({});
  const [insightLoading, setInsightLoading] = useState<Record<number, boolean>>({});
  const [profileInsightLoading, setProfileInsightLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const normalizeUrl = (url?: string | null): string | null => {
    if (!url) return null;
    return url.trim().toLowerCase().replace(/\/+$/, '');
  };

  const normalizeFallbackKey = (offer: Offer): string => {
    const titleCityDistrict = `${offer.title || ''}|${offer.city || ''}|${offer.district || ''}`.toLowerCase().trim();
    return titleCityDistrict;
  };

  const activeProfile = useMemo(
    () => profiles.find((profile) => profile.id === activeProfileId) || profiles[0],
    [profiles, activeProfileId]
  );

  // Zaščita strani
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/prijava');
    }
  }, [isAuthenticated, navigate]);

  // Naloži oglase
  useEffect(() => {
    async function loadOffers() {
      setIsLoading(true);
      try {
        const data = await fetchOffers(activeProfile?.searchTerm);

        const uniqueOffers = Array.from(
          data.reduce((map, offer) => {
            const urlKey = normalizeUrl(offer.url);
            const dedupeKey = urlKey || normalizeFallbackKey(offer) || `id-${offer.id}`;

            // Keep only one card per listing so the AI block renders a single time, even if the import lacks a URL.
            if (!map.has(dedupeKey)) {
              map.set(dedupeKey, offer);
            }

            return map;
          }, new Map<string, Offer>()).values()
        );

        setOffers(uniqueOffers);
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
      const storedProfiles = loadSearchProfiles();
      setProfiles(storedProfiles);
      setActiveProfileId(storedProfiles[0]?.id ?? null);
    }
  }, [isAuthenticated, toast, activeProfile?.searchTerm]);

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

  const persistProfiles = (nextProfiles: SearchProfile[]) => {
    const sanitized = saveSearchProfiles(nextProfiles);
    setProfiles(sanitized);

    if (sanitized.length && !sanitized.some((profile) => profile.id === activeProfileId)) {
      setActiveProfileId(sanitized[0].id);
    }
  };

  const handleProfileChange = (id: string) => {
    setActiveProfileId(id);
  };

  const handleProfileFieldChange = (id: string, field: keyof SearchProfile, value: string | number | undefined) => {
    setProfiles((current) => {
      const updated = current.map((profile) =>
        profile.id === id
          ? {
              ...profile,
              [field]: typeof value === 'string' ? value : value ?? undefined,
            }
          : profile
      );

      saveSearchProfiles(updated);
      return updated;
    });
  };

  const handleAddProfile = () => {
    setProfiles((current) => {
      const nextIndex = current.length + 1;
      const newProfile: SearchProfile = {
        id: `profil-${Date.now()}`,
        name: `Profil ${nextIndex}`,
        searchTerm: '',
        city: '',
        district: '',
        source: '',
        priorities: '',
      };

      const updated = [...current, newProfile];
      saveSearchProfiles(updated);
      setActiveProfileId(newProfile.id);
      return updated;
    });
  };

  const handleDeleteProfile = (id: string) => {
    setProfiles((current) => {
      if (current.length === 1) {
        toast({
          title: 'Ni mogoče izbrisati',
          description: 'Vsaj en profil mora ostati.',
          variant: 'destructive',
        });
        return current;
      }

      const updated = current.filter((profile) => profile.id !== id);
      persistProfiles(updated);
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

  const handleProfileInsight = async (profile: SearchProfile) => {
    setProfileInsightLoading(true);

    try {
      const summary = await getProfileInsight(profile);
      setProfiles((current) => {
        const updated = current.map((item) => (item.id === profile.id ? { ...item, aiSummary: summary } : item));
        saveSearchProfiles(updated);
        return updated;
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'AI povzetek profila ni uspel';
      toast({
        title: 'AI povzetek profila ni uspel',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setProfileInsightLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const normalizedSearch = (activeProfile?.searchTerm || '').trim().toLowerCase();
  const priceFilteredOffers = offers.filter((offer) => Number.isFinite(offer.price) && offer.price >= 5000);

  const filteredOffers = priceFilteredOffers.filter((offer) => {
    const haystack = `${offer.title} ${offer.city} ${offer.district} ${offer.source}`.toLowerCase();

    const matchesSearch = normalizedSearch ? haystack.includes(normalizedSearch) : true;
    const matchesCity = activeProfile?.city
      ? offer.city.toLowerCase().includes(activeProfile.city.toLowerCase())
      : true;
    const matchesDistrict = activeProfile?.district
      ? offer.district?.toLowerCase().includes(activeProfile.district.toLowerCase())
      : true;
    const matchesSource = activeProfile?.source
      ? offer.source.toLowerCase().includes(activeProfile.source.toLowerCase())
      : true;
    const matchesMinPrice = activeProfile?.minPrice ? offer.price >= activeProfile.minPrice : true;
    const matchesMaxPrice = activeProfile?.maxPrice ? offer.price <= activeProfile.maxPrice : true;
    const matchesMinArea = activeProfile?.minArea ? offer.area_m2 >= activeProfile.minArea : true;
    const matchesMaxArea = activeProfile?.maxArea ? offer.area_m2 <= activeProfile.maxArea : true;

    return (
      matchesSearch &&
      matchesCity &&
      matchesDistrict &&
      matchesSource &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesMinArea &&
      matchesMaxArea
    );
  });

  const savedOffers = priceFilteredOffers.filter((offer) => savedOfferIds.includes(offer.id));
  const availableOffers = filteredOffers.filter((offer) => !savedOfferIds.includes(offer.id));
  const bestOffers = getBestOffers(availableOffers, 3);
  const remainingOffers = availableOffers.filter((offer) => !bestOffers.some((best) => best.id === offer.id));
  const latestOffers = remainingOffers.slice(0, 6);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-10 space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Trenutne ponudbe</h1>
                <p className="text-muted-foreground text-lg">
                  Ustvari več iskalnih profilov z lastnimi filtri, prioritetami in AI povzetki.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setProfilesOpen((open) => !open)}
                  aria-expanded={profilesOpen}
                  aria-controls="profiles-panel"
                >
                  <svg
                    className={`h-4 w-4 transition-transform ${profilesOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="font-semibold">Iskalni profili</span>
                </Button>
              </div>
            </div>

            {activeProfile && profilesOpen && (
              <div
                className="rounded-3xl border border-border bg-gradient-to-br from-background via-background to-accent/5 p-6 shadow-xl"
                id="profiles-panel"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Iskalni profili</p>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Input
                          value={activeProfile.name}
                          onChange={(event) => handleProfileFieldChange(activeProfile.id, 'name', event.target.value)}
                          className="max-w-xs font-semibold"
                          aria-label="Ime profila"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProfile(activeProfile.id)}
                          aria-label="Izbriši profil"
                          className="text-destructive hover:text-destructive"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M10 11v6m4-6v6M9 7l1-3h4l1 3m-9 0l-.5 12a2 2 0 002 2h7a2 2 0 002-2L18 7" />
                          </svg>
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Nastavitve filtrov, prioritet in AI povzetek so vezani na ta profil.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-end">
                      {profiles.map((profile) => (
                        <Button
                          key={profile.id}
                          variant={profile.id === activeProfileId ? 'default' : 'outline'}
                          onClick={() => handleProfileChange(profile.id)}
                          className="flex items-center gap-2 rounded-full"
                        >
                          <span className="font-semibold">{profile.name}</span>
                          {profile.aiSummary && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wide">
                              AI
                            </span>
                          )}
                        </Button>
                      ))}
                      <Button variant="secondary" onClick={handleAddProfile} className="rounded-full">
                        + Nov profil
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="group rounded-2xl border border-border/80 bg-background/70 p-4 shadow-sm backdrop-blur">
                      <label className="text-xs uppercase tracking-[0.08em] text-muted-foreground" htmlFor="offer-search">
                        Išči po naslovu, mestu ali viru
                      </label>
                      <div className="relative mt-2">
                        <svg
                          className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.803 5.803a7.5 7.5 0 0010 10z" />
                        </svg>
                        <Input
                          id="offer-search"
                          placeholder="Npr. Koper, Ljubljana, nepremicnine.net"
                          value={activeProfile.searchTerm}
                          onChange={(event) => handleProfileFieldChange(activeProfile.id, 'searchTerm', event.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>

                    <div className="group rounded-2xl border border-border/80 bg-background/70 p-4 shadow-sm backdrop-blur">
                      <label className="text-xs uppercase tracking-[0.08em] text-muted-foreground" htmlFor="city-filter">
                        Mesto
                      </label>
                      <Input
                        id="city-filter"
                        placeholder="Ljubljana, Koper..."
                        value={activeProfile.city}
                        onChange={(event) => handleProfileFieldChange(activeProfile.id, 'city', event.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div className="group rounded-2xl border border-border/80 bg-background/70 p-4 shadow-sm backdrop-blur">
                      <label className="text-xs uppercase tracking-[0.08em] text-muted-foreground" htmlFor="district-filter">
                        Četrt / Ulica
                      </label>
                      <Input
                        id="district-filter"
                        placeholder="Šiška, Bežigrad..."
                        value={activeProfile.district}
                        onChange={(event) => handleProfileFieldChange(activeProfile.id, 'district', event.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div className="group rounded-2xl border border-border/80 bg-background/70 p-4 shadow-sm backdrop-blur">
                      <label className="text-xs uppercase tracking-[0.08em] text-muted-foreground" htmlFor="source-filter">
                        Vir
                      </label>
                      <Input
                        id="source-filter"
                        placeholder="nepremicnine, bolha..."
                        value={activeProfile.source}
                        onChange={(event) => handleProfileFieldChange(activeProfile.id, 'source', event.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div className="group rounded-2xl border border-border/80 bg-background/70 p-4 shadow-sm backdrop-blur">
                      <label className="text-xs uppercase tracking-[0.08em] text-muted-foreground" htmlFor="min-price">
                        Minimalna cena (€)
                      </label>
                      <Input
                        id="min-price"
                        type="number"
                        placeholder="0"
                        value={activeProfile.minPrice ?? ''}
                        onChange={(event) =>
                          handleProfileFieldChange(
                            activeProfile.id,
                            'minPrice',
                            event.target.value ? Number(event.target.value) : undefined
                          )
                        }
                        className="mt-2"
                      />
                    </div>

                    <div className="group rounded-2xl border border-border/80 bg-background/70 p-4 shadow-sm backdrop-blur">
                      <label className="text-xs uppercase tracking-[0.08em] text-muted-foreground" htmlFor="max-price">
                        Maksimalna cena (€)
                      </label>
                      <Input
                        id="max-price"
                        type="number"
                        placeholder="300000"
                        value={activeProfile.maxPrice ?? ''}
                        onChange={(event) =>
                          handleProfileFieldChange(
                            activeProfile.id,
                            'maxPrice',
                            event.target.value ? Number(event.target.value) : undefined
                          )
                        }
                        className="mt-2"
                      />
                    </div>

                    <div className="group rounded-2xl border border-border/80 bg-background/70 p-4 shadow-sm backdrop-blur">
                      <label className="text-xs uppercase tracking-[0.08em] text-muted-foreground" htmlFor="min-area">
                        Minimalna površina (m²)
                      </label>
                      <Input
                        id="min-area"
                        type="number"
                        placeholder="0"
                        value={activeProfile.minArea ?? ''}
                        onChange={(event) =>
                          handleProfileFieldChange(
                            activeProfile.id,
                            'minArea',
                            event.target.value ? Number(event.target.value) : undefined
                          )
                        }
                        className="mt-2"
                      />
                    </div>

                    <div className="group rounded-2xl border border-border/80 bg-background/70 p-4 shadow-sm backdrop-blur">
                      <label className="text-xs uppercase tracking-[0.08em] text-muted-foreground" htmlFor="max-area">
                        Maksimalna površina (m²)
                      </label>
                      <Input
                        id="max-area"
                        type="number"
                        placeholder="120"
                        value={activeProfile.maxArea ?? ''}
                        onChange={(event) =>
                          handleProfileFieldChange(
                            activeProfile.id,
                            'maxArea',
                            event.target.value ? Number(event.target.value) : undefined
                          )
                        }
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/80 bg-background/80 p-5 shadow-sm backdrop-blur">
                    <label className="text-xs uppercase tracking-[0.08em] text-muted-foreground" htmlFor="priorities">
                      Prioritete (opisno)
                    </label>
                    <Textarea
                      id="priorities"
                      placeholder="Kaj vam je pomembno? Lokacija, parkirišče, donosnost, ..."
                      value={activeProfile.priorities}
                      onChange={(event) => handleProfileFieldChange(activeProfile.id, 'priorities', event.target.value)}
                      className="mt-3"
                    />
                  </div>

                  <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background p-5 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2 text-sm text-primary/80">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                        </svg>
                        <span>AI povzetek profila za trenutne nastavitve</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleProfileInsight(activeProfile)}
                          disabled={profileInsightLoading}
                          className="flex items-center gap-2"
                        >
                          {profileInsightLoading ? (
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                              <path className="opacity-75" d="M4 12a8 8 0 018-8" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                          ) : (
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                          Generiraj AI povzetek
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleAddProfile()}>
                          Nov prazen profil
                        </Button>
                      </div>
                    </div>

                    {activeProfile.aiSummary ? (
                      <div className="mt-4 rounded-xl border border-primary/30 bg-background/90 p-4 text-sm leading-relaxed text-foreground/90 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary/70 mb-2">AI povzetek</p>
                        <p className="whitespace-pre-line">{activeProfile.aiSummary}</p>
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-muted-foreground">AI povzetek še ni ustvarjen</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            </div>
            {isLoading ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-muted/40 px-6 py-12 text-center">
                <svg className="h-10 w-10 animate-spin text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                  <path className="opacity-75" d="M4 12a8 8 0 018-8" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-foreground">Nalaganje ponudb</p>
                  <p className="text-sm text-muted-foreground">Pridobivamo najnovejše oglase z vašimi kriteriji.</p>
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
        
        {/* Footer spacer */}
        <div className="py-8" />
      </main>
    </>
  );
}
