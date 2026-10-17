import React, { useState } from 'react';
import { Sanctuary, ScreenType } from '../../types';
import { Search, Heart, SlidersHorizontal, MapPin, Users, ArrowUpRight, Check, Compass } from 'lucide-react';

interface ExploreScreenProps {
  sanctuaries: Sanctuary[];
  selectedSanctuary: Sanctuary;
  onSelectSanctuary: (sanctuary: Sanctuary) => void;
  onNavigate: (screen: ScreenType) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  isMobileCompact?: boolean;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  sanctuaries,
  selectedSanctuary,
  onSelectSanctuary,
  onNavigate,
  wishlist,
  onToggleWishlist,
  isMobileCompact = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [guestFilter, setGuestFilter] = useState<number>(0);

  const categories = [
    { id: 'all', label: 'All Curations' },
    { id: 'Brutalist', label: 'Brutalist & Concrete' },
    { id: 'Alpine', label: 'Alpine & Timber' },
    { id: 'Mediterranean', label: 'Coastal Terraces' },
    { id: 'Minimalist', label: 'Japanese Machiya' },
    { id: 'Heritage', label: 'Heritage Riads' },
  ];

  const filteredSanctuaries = sanctuaries.filter((s) => {
    const matchesCategory =
      activeCategory === 'all' || s.architecturalStyle === activeCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = s.pricePerNight <= maxPrice;
    const matchesGuests = guestFilter === 0 || s.specs.guests >= guestFilter;
    return matchesCategory && matchesSearch && matchesPrice && matchesGuests;
  });

  const featuredSanctuary = sanctuaries.find((s) => s.featured) || sanctuaries[0];

  return (
    <div className={`space-y-6 ${isMobileCompact ? 'px-4 py-3' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
      {/* Header editorial kicker */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-amber-400 tracking-wider uppercase mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Curated Architectural Stays</span>
            <span aria-hidden="true">·</span>
            <span>Edition 2026</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white max-w-2xl text-balance">
            Sanctuaries designed by master architects for contemplation and quiet luxury.
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span>{filteredSanctuaries.length} destinations curated</span>
          <span aria-hidden="true">·</span>
          <span>Verified private access</span>
        </div>
      </div>

      {/* Hero Featured Masterpiece (Desktop & Mobile) */}
      {featuredSanctuary && activeCategory === 'all' && !searchQuery && (
        <div className="relative rounded-2xl overflow-hidden border border-white/10 group bg-neutral-900">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <img
              src={featuredSanctuary.heroImage}
              alt={featuredSanctuary.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Measured contrast scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

            {/* Architectural badge indicator */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-neutral-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-neutral-200">
              <span className="text-amber-400 font-semibold">{featuredSanctuary.architecturalStyle}</span>
              <span aria-hidden="true">·</span>
              <span>Built {featuredSanctuary.yearBuilt}</span>
              <span aria-hidden="true">·</span>
              <span>{featuredSanctuary.architect}</span>
            </div>

            {/* Wishlist toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(featuredSanctuary.id);
              }}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-neutral-950/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-amber-400 transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  wishlist.includes(featuredSanctuary.id)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-white'
                }`}
              />
            </button>

            {/* Bottom Content Info */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="max-w-xl">
                <div className="text-xs text-amber-300 font-medium mb-1">
                  Featured Architectural Masterwork
                </div>
                <h2 className="font-display text-xl sm:text-3xl font-bold text-white tracking-tight">
                  {featuredSanctuary.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 mt-1">
                  {featuredSanctuary.subtitle}
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mt-2">
                  <span className="flex items-center gap-1 text-neutral-300">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {featuredSanctuary.location}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredSanctuary.specs.guests} guests</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredSanctuary.specs.bedrooms} suites</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums text-white font-semibold">
                    ${featuredSanctuary.pricePerNight.toLocaleString()}
                  </span>
                  <span>/ night</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onSelectSanctuary(featuredSanctuary);
                    onNavigate('detail');
                  }}
                  className="px-4 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg transition-colors border border-white/10 flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>Explore Blueprint</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    onSelectSanctuary(featuredSanctuary);
                    onNavigate('booking');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm whitespace-nowrap"
                >
                  Reserve Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by country, architecture, or city..."
              className="w-full bg-neutral-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Guests Selector */}
          <div className="flex items-center gap-2 bg-neutral-900 border border-white/10 rounded-xl px-3 py-1.5 shrink-0">
            <Users className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-xs text-neutral-400">Guests:</span>
            {[0, 2, 4, 6].map((num) => (
              <button
                key={num}
                onClick={() => setGuestFilter(num)}
                className={`px-2 py-1 text-xs rounded-md transition-colors ${
                  guestFilter === num
                    ? 'bg-amber-400 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {num === 0 ? 'Any' : `${num}+`}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-neutral-800 text-amber-300 border border-amber-400/30 shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sanctuaries List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSanctuaries.map((sanctuary) => (
          <div
            key={sanctuary.id}
            onClick={() => {
              onSelectSanctuary(sanctuary);
              onNavigate('detail');
            }}
            className="group cursor-pointer bg-neutral-900/60 rounded-xl border border-white/10 overflow-hidden hover:border-amber-400/30 transition-all flex flex-col"
          >
            {/* Card Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-800">
              <img
                src={sanctuary.heroImage}
                alt={sanctuary.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />

              {/* Wishlist button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(sanctuary.id);
                }}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-neutral-950/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-amber-400 transition-colors"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    wishlist.includes(sanctuary.id)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-white'
                  }`}
                />
              </button>

              {/* Architectural Style & Region */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300">
                <span className="font-medium text-amber-300">{sanctuary.architecturalStyle}</span>
                <span className="text-neutral-400">{sanctuary.region}</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-base font-semibold text-white group-hover:text-amber-400 transition-colors">
                  {sanctuary.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                  {sanctuary.subtitle}
                </p>

                {/* Metadata in unboxed text format */}
                <div className="flex items-center gap-2 text-xs text-neutral-400 mt-2.5">
                  <span>{sanctuary.specs.guests} guests</span>
                  <span aria-hidden="true">·</span>
                  <span>{sanctuary.specs.bedrooms} suites</span>
                  <span aria-hidden="true">·</span>
                  <span>{sanctuary.specs.areaSqFt.toLocaleString()} sq ft</span>
                </div>
              </div>

              {/* Bottom Price & Action */}
              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-neutral-500">Nightly sanctuary rate</div>
                  <div className="text-sm font-semibold text-white font-mono tabular-nums">
                    ${sanctuary.pricePerNight.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-neutral-400">/ night</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSanctuary(sanctuary);
                    onNavigate('booking');
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-neutral-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSanctuaries.length === 0 && (
        <div className="py-16 text-center text-neutral-400">
          <p className="text-sm">No architectural sanctuaries found matching your criteria.</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
              setGuestFilter(0);
            }}
            className="mt-3 text-xs text-amber-400 hover:underline"
          >
            Reset all search filters
          </button>
        </div>
      )}
    </div>
  );
};
