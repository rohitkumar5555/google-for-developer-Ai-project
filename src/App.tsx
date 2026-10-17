import React, { useState } from 'react';
import { ScreenType, ViewportMode, Sanctuary, BookingState } from './types';
import { SANCTUARIES } from './data/sanctuaries';
import { TopBar } from './components/navigation/TopBar';
import { MobileFrame } from './components/frame/MobileFrame';
import { MultiScreenCanvas } from './components/canvas/MultiScreenCanvas';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { DetailScreen } from './components/screens/DetailScreen';
import { BookingScreen } from './components/screens/BookingScreen';
import { ItineraryScreen } from './components/screens/ItineraryScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('explore');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('canvas');
  const [selectedSanctuary, setSelectedSanctuary] = useState<Sanctuary>(SANCTUARIES[0]);
  const [wishlist, setWishlist] = useState<string[]>([
    'fjord-brutalist',
    'kyoto-machiya',
  ]);
  const [booking, setBooking] = useState<BookingState>({
    sanctuaryId: 'fjord-brutalist',
    checkInDate: '2026-10-24',
    checkOutDate: '2026-10-27',
    nights: 3,
    guests: 2,
    selectedAddons: ['private-chef', 'boat-safari'],
    patronName: 'Julian Harrison',
    patronEmail: 'julian.harrison@patrons.atelier.com',
    paymentMethod: 'atelier_card',
    bookingRef: 'AS-2026-NOR-914',
    isConfirmed: true,
  });

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleUpdateBooking = (updated: Partial<BookingState>) => {
    setBooking((prev) => ({ ...prev, ...updated }));
  };

  const renderActiveScreen = (isCompact: boolean = false) => {
    switch (activeScreen) {
      case 'explore':
        return (
          <ExploreScreen
            sanctuaries={SANCTUARIES}
            selectedSanctuary={selectedSanctuary}
            onSelectSanctuary={setSelectedSanctuary}
            onNavigate={(screen) => setActiveScreen(screen)}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            isMobileCompact={isCompact}
          />
        );
      case 'detail':
        return (
          <DetailScreen
            sanctuary={selectedSanctuary}
            onNavigate={(screen) => setActiveScreen(screen)}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            isMobileCompact={isCompact}
          />
        );
      case 'booking':
        return (
          <BookingScreen
            sanctuary={selectedSanctuary}
            onNavigate={(screen) => setActiveScreen(screen)}
            booking={booking}
            onUpdateBooking={handleUpdateBooking}
            isMobileCompact={isCompact}
          />
        );
      case 'itinerary':
        return (
          <ItineraryScreen
            sanctuaries={SANCTUARIES}
            booking={booking}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            onSelectSanctuary={setSelectedSanctuary}
            onNavigate={(screen) => setActiveScreen(screen)}
            isMobileCompact={isCompact}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            onNavigate={(screen) => setActiveScreen(screen)}
            isMobileCompact={isCompact}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0b] text-neutral-100 flex flex-col font-sans">
      {/* Top Navigation Bar with Viewport Mode Switcher */}
      <TopBar
        activeScreen={activeScreen}
        onSelectScreen={setActiveScreen}
        viewportMode={viewportMode}
        onChangeViewportMode={setViewportMode}
        wishlistCount={wishlist.length}
      />

      {/* Main Content Area based on Viewport Mode */}
      <main className="flex-1 flex flex-col">
        {viewportMode === 'canvas' ? (
          <MultiScreenCanvas
            sanctuaries={SANCTUARIES}
            selectedSanctuary={selectedSanctuary}
            onSelectSanctuary={(sanctuary) => {
              setSelectedSanctuary(sanctuary);
              setBooking((prev) => ({ ...prev, sanctuaryId: sanctuary.id }));
            }}
            booking={booking}
            onUpdateBooking={handleUpdateBooking}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            onFocusScreen={(screen) => {
              setActiveScreen(screen);
              setViewportMode('mobile');
            }}
          />
        ) : viewportMode === 'mobile' ? (
          <div className="py-8 px-4 flex-1 flex items-center justify-center">
            <MobileFrame
              activeScreen={activeScreen}
              onSelectScreen={setActiveScreen}
              wishlistCount={wishlist.length}
            >
              {renderActiveScreen(true)}
            </MobileFrame>
          </div>
        ) : (
          /* Desktop expanded layout */
          <div className="flex-1 w-full">{renderActiveScreen(false)}</div>
        )}
      </main>

      {/* Editorial Footer (Banned telemetry removed, strictly quiet copyright & links) */}
      <footer className="border-t border-white/10 bg-neutral-950 py-6 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-neutral-300">
              Atelier Sanctuaries
            </span>
            <span aria-hidden="true">·</span>
            <span>Architectural Preservation & Private Commission Escapes</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <button
              onClick={() => {
                setActiveScreen('explore');
                setViewportMode('canvas');
              }}
              className="hover:text-white transition-colors"
            >
              Canvas Overview
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                setActiveScreen('itinerary');
                setViewportMode('mobile');
              }}
              className="hover:text-white transition-colors"
            >
              Guest Schedule
            </button>
            <span aria-hidden="true">·</span>
            <span>© 2026 Atelier Stays. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
