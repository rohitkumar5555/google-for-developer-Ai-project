import React, { useState } from 'react';
import { ScreenType, Sanctuary, BookingState } from '../../types';
import { ExploreScreen } from '../screens/ExploreScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { BookingScreen } from '../screens/BookingScreen';
import { ItineraryScreen } from '../screens/ItineraryScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  ExternalLink,
  ArrowRight,
  Layers,
  Sparkles,
  Smartphone,
} from 'lucide-react';

interface MultiScreenCanvasProps {
  sanctuaries: Sanctuary[];
  selectedSanctuary: Sanctuary;
  onSelectSanctuary: (sanctuary: Sanctuary) => void;
  booking: BookingState;
  onUpdateBooking: (booking: Partial<BookingState>) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onFocusScreen: (screen: ScreenType) => void;
}

export const MultiScreenCanvas: React.FC<MultiScreenCanvasProps> = ({
  sanctuaries,
  selectedSanctuary,
  onSelectSanctuary,
  booking,
  onUpdateBooking,
  wishlist,
  onToggleWishlist,
  onFocusScreen,
}) => {
  const [scale, setScale] = useState<number>(0.85);

  const screensConfig: {
    id: ScreenType;
    number: string;
    title: string;
    description: string;
    component: React.ReactNode;
  }[] = [
    {
      id: 'explore',
      number: '01',
      title: 'Explore & Curations',
      description: 'Architectural discovery, filters, search, and sanctuary cards',
      component: (
        <ExploreScreen
          sanctuaries={sanctuaries}
          selectedSanctuary={selectedSanctuary}
          onSelectSanctuary={onSelectSanctuary}
          onNavigate={(s) => onFocusScreen(s)}
          wishlist={wishlist}
          onToggleWishlist={onToggleWishlist}
          isMobileCompact={true}
        />
      ),
    },
    {
      id: 'detail',
      number: '02',
      title: 'Architectural Blueprint',
      description: 'Living spaces, floorplan concept, amenities, and critic notes',
      component: (
        <DetailScreen
          sanctuary={selectedSanctuary}
          onNavigate={(s) => onFocusScreen(s)}
          wishlist={wishlist}
          onToggleWishlist={onToggleWishlist}
          isMobileCompact={true}
        />
      ),
    },
    {
      id: 'booking',
      number: '03',
      title: 'Concierge Reservation',
      description: 'Stay duration, bespoke addons, escrow calculation, and pass voucher',
      component: (
        <BookingScreen
          sanctuary={selectedSanctuary}
          onNavigate={(s) => onFocusScreen(s)}
          booking={booking}
          onUpdateBooking={onUpdateBooking}
          isMobileCompact={true}
        />
      ),
    },
    {
      id: 'itinerary',
      number: '04',
      title: 'Guest Itinerary & Schedule',
      description: 'Interactive day-by-day expedition timeline and saved wishlists',
      component: (
        <ItineraryScreen
          sanctuaries={sanctuaries}
          booking={booking}
          wishlist={wishlist}
          onToggleWishlist={onToggleWishlist}
          onSelectSanctuary={onSelectSanctuary}
          onNavigate={(s) => onFocusScreen(s)}
          isMobileCompact={true}
        />
      ),
    },
    {
      id: 'profile',
      number: '05',
      title: 'Patron Circle Lounge',
      description: 'Tier IV privileges, stay milestones, and microclimate preferences',
      component: (
        <ProfileScreen
          onNavigate={(s) => onFocusScreen(s)}
          isMobileCompact={true}
        />
      ),
    },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#070809] flex flex-col overflow-hidden relative select-none">
      {/* Canvas Top Toolbar */}
      <div className="h-12 bg-neutral-950/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
            <Layers className="w-4 h-4" />
            <span className="font-semibold">Interactive Multi-Screen Architecture Canvas</span>
          </div>
          <span className="text-neutral-600">·</span>
          <span className="text-xs text-neutral-400 hidden sm:inline">
            5 synchronized interactive screens across the entire patron journey
          </span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
            <button
              onClick={() => setScale((s) => Math.max(0.65, +(s - 0.1).toFixed(2)))}
              className="p-1 text-neutral-400 hover:text-white rounded"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono text-neutral-300">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale((s) => Math.min(1.1, +(s + 0.1).toFixed(2)))}
              className="p-1 text-neutral-400 hover:text-white rounded"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setScale(0.85)}
            className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white bg-white/5 rounded-lg border border-white/10"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Canvas Viewport Scroll Area */}
      <div className="flex-1 overflow-x-auto overflow-y-auto p-8 sm:p-12 relative flex items-start justify-start">
        {/* Subtle dot matrix background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Canvas Content Container with Transform Scale */}
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            transition: 'transform 0.15s ease-out',
          }}
          className="flex items-start gap-10 min-w-max pb-20 pt-4"
        >
          {screensConfig.map((screen, idx) => (
            <div key={screen.id} className="flex items-start gap-6">
              {/* Screen Card Unit */}
              <div className="w-[390px] flex flex-col space-y-3">
                {/* Header label above device frame */}
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      {screen.number}
                    </span>
                    <h3 className="font-display text-sm font-bold text-white">
                      {screen.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => onFocusScreen(screen.id)}
                    className="flex items-center gap-1 text-[11px] font-medium text-amber-400/90 hover:text-amber-300 transition-colors"
                  >
                    <span>Focus</span>
                    <Smartphone className="w-3 h-3" />
                  </button>
                </div>

                <p className="text-[11px] text-neutral-400 px-2 line-clamp-1">
                  {screen.description}
                </p>

                {/* iPhone Frame Container */}
                <div className="w-[390px] h-[820px] bg-neutral-950 rounded-[48px] p-2.5 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_0_8px_#18191c] flex flex-col overflow-hidden relative">
                  {/* Speaker Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 w-28 h-5 bg-black rounded-full border border-white/10" />

                  {/* Status Bar */}
                  <div className="px-5 pt-1.5 pb-1 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                    <span>09:41</span>
                    <span className="text-[10px] text-amber-400">Atelier OS</span>
                  </div>

                  {/* Inner Scrollable Viewport */}
                  <div className="flex-1 overflow-y-auto no-scrollbar rounded-t-[32px] bg-neutral-950 text-neutral-100 pb-8 select-text">
                    {screen.component}
                  </div>

                  {/* Bottom Indicator */}
                  <div className="h-4 flex items-center justify-center">
                    <div className="w-24 h-1 bg-white/20 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Connecting Flow Arrow Between Screens */}
              {idx < screensConfig.length - 1 && (
                <div className="h-[820px] flex items-center justify-center text-neutral-600 pt-16">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-[2px] bg-gradient-to-r from-amber-500/20 to-amber-500/60" />
                    <ArrowRight className="w-4 h-4 text-amber-400/60" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
