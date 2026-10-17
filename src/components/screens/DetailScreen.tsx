import React, { useState } from 'react';
import { Sanctuary, ScreenType } from '../../types';
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Maximize2,
  Calendar,
  Sparkles,
  CheckCircle2,
  Star,
  ShieldCheck,
  ChevronRight,
  Compass,
} from 'lucide-react';

interface DetailScreenProps {
  sanctuary: Sanctuary;
  onNavigate: (screen: ScreenType) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  isMobileCompact?: boolean;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  sanctuary,
  onNavigate,
  wishlist,
  onToggleWishlist,
  isMobileCompact = false,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedNights, setSelectedNights] = useState(3);
  const [copiedLink, setCopiedLink] = useState(false);

  const images = sanctuary.galleryImages.length > 0 ? sanctuary.galleryImages : [sanctuary.heroImage];
  const totalPrice = sanctuary.pricePerNight * selectedNights;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className={`space-y-6 ${isMobileCompact ? 'px-4 py-3' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <button
          onClick={() => onNavigate('explore')}
          className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Sanctuaries</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>
          <button
            onClick={() => onToggleWishlist(sanctuary.id)}
            className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-amber-400 transition-colors"
          >
            <Heart
              className={`w-4 h-4 ${
                wishlist.includes(sanctuary.id) ? 'fill-amber-400 text-amber-400' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main Title Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-1">
          <span>{sanctuary.architecturalStyle} Architecture</span>
          <span aria-hidden="true">·</span>
          <span>Designed by {sanctuary.architect}</span>
          <span aria-hidden="true">·</span>
          <span>Constructed {sanctuary.yearBuilt}</span>
        </div>
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
          {sanctuary.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-400 mt-2">
          <span className="flex items-center gap-1 text-neutral-200">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            {sanctuary.location}, {sanctuary.country}
          </span>
          <span aria-hidden="true">·</span>
          <span>{sanctuary.specs.guests} guests maximum</span>
          <span aria-hidden="true">·</span>
          <span>{sanctuary.specs.bedrooms} master suites</span>
          <span aria-hidden="true">·</span>
          <span>{sanctuary.specs.bathrooms} private baths</span>
          <span aria-hidden="true">·</span>
          <span>{sanctuary.specs.areaSqFt.toLocaleString()} sq ft enclosed</span>
        </div>
      </div>

      {/* Hero Media Showcase Gallery */}
      <div className="space-y-3">
        <div className="relative aspect-[16/10] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
          <img
            src={images[activeImageIndex]}
            alt={sanctuary.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-3 right-3 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs font-mono text-neutral-300">
            {activeImageIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails row */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative w-24 h-16 rounded-lg overflow-hidden border transition-all shrink-0 ${
                activeImageIndex === idx
                  ? 'border-amber-400 ring-2 ring-amber-400/20 scale-102'
                  : 'border-white/10 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Perspective ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Architectural Blueprint & Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Left 2 Cols: Architectural Narrative & Spaces */}
        <div className="lg:col-span-2 space-y-8">
          {/* Narrative */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white tracking-tight">
              Architectural Concept & Philosophy
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {sanctuary.description}
            </p>
          </section>

          {/* Living Spaces Breakdown */}
          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-white tracking-tight">
              Dedicated Living Pavilions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {sanctuary.spaces.map((space, index) => (
                <div
                  key={index}
                  className="bg-neutral-900/50 border border-white/10 rounded-xl p-4 space-y-2"
                >
                  <div className="text-xs font-mono text-amber-400">
                    Space 0{index + 1}
                  </div>
                  <h3 className="font-display text-sm font-semibold text-white">
                    {space.name}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {space.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Curated Amenities Checklist */}
          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-white tracking-tight">
              Bespoke Amenities & Specifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sanctuary.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-neutral-300 bg-neutral-900/30 border border-white/5 rounded-lg p-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews & Architectural Criticism */}
          <section className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-white tracking-tight">
                Patron Impressions & Notes
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-mono">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-white">{sanctuary.rating}</span>
                <span className="text-neutral-500">({sanctuary.reviewCount} verified stays)</span>
              </div>
            </div>

            <div className="space-y-3">
              {sanctuary.reviews.map((rev, i) => (
                <div
                  key={i}
                  className="bg-neutral-900/50 border border-white/10 rounded-xl p-4 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">{rev.author}</div>
                      <div className="text-[11px] text-neutral-400">{rev.role}</div>
                    </div>
                    <div className="text-[11px] font-mono text-neutral-500">{rev.date}</div>
                  </div>
                  <p className="text-xs text-neutral-300 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right 1 Col: Quick Reservation Sticky Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-neutral-900 border border-white/15 rounded-2xl p-5 space-y-5 shadow-2xl">
            <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs text-neutral-400">Sanctuary rate</span>
                <div className="text-xl font-bold font-mono text-white tabular-nums">
                  ${sanctuary.pricePerNight.toLocaleString()}
                  <span className="text-xs font-normal text-neutral-400"> / night</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-neutral-300 font-mono">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-white">{sanctuary.rating}</span>
              </div>
            </div>

            {/* Quick Stay Length Config */}
            <div className="space-y-3">
              <label className="text-xs font-medium text-neutral-300">
                Estimated Duration of Residence
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[2, 3, 5, 7].map((n) => (
                  <button
                    key={n}
                    onClick={() => setSelectedNights(n)}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                      selectedNights === n
                        ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400 shadow-sm'
                        : 'bg-neutral-800 text-neutral-300 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {n} nights
                  </button>
                ))}
              </div>

              {/* Fee Estimation */}
              <div className="pt-3 space-y-2 text-xs text-neutral-400 border-t border-white/10">
                <div className="flex justify-between">
                  <span>
                    ${sanctuary.pricePerNight.toLocaleString()} × {selectedNights} nights
                  </span>
                  <span className="font-mono text-white tabular-nums">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Architectural Preservation Trust (5%)</span>
                  <span className="font-mono text-white tabular-nums">
                    ${Math.round(totalPrice * 0.05).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-neutral-200 pt-2 border-t border-white/5">
                  <span>Estimated Total</span>
                  <span className="font-mono text-amber-400 tabular-nums text-sm">
                    ${Math.round(totalPrice * 1.05).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onNavigate('booking')}
              className="w-full py-3 px-4 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-2"
            >
              <span>Proceed to Bespoke Reservation</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>Full confidentiality & private access guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
