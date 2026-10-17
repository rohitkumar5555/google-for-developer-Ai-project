import React from 'react';
import { ScreenType, ViewportMode } from '../../types';
import { Smartphone, LayoutGrid, Monitor, Bookmark, Compass, Calendar, User } from 'lucide-react';

interface TopBarProps {
  activeScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  viewportMode: ViewportMode;
  onChangeViewportMode: (mode: ViewportMode) => void;
  wishlistCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeScreen,
  onSelectScreen,
  viewportMode,
  onChangeViewportMode,
  wishlistCount,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectScreen('explore')}
            className="text-left group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-display font-bold text-sm tracking-widest transition-transform group-hover:scale-105">
              AS
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap">
              Atelier Sanctuaries
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <button
            onClick={() => onSelectScreen('explore')}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              activeScreen === 'explore' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Sanctuaries
          </button>
          <button
            onClick={() => onSelectScreen('detail')}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              activeScreen === 'detail' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Architecture
          </button>
          <button
            onClick={() => onSelectScreen('booking')}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              activeScreen === 'booking' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Concierge
          </button>
          <button
            onClick={() => onSelectScreen('itinerary')}
            className={`whitespace-nowrap transition-colors hover:text-white flex items-center gap-1.5 ${
              activeScreen === 'itinerary' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            <span>Itinerary</span>
            {wishlistCount > 0 && (
              <span className="text-[11px] font-mono text-amber-300">
                ({wishlistCount})
              </span>
            )}
          </button>
          <button
            onClick={() => onSelectScreen('profile')}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              activeScreen === 'profile' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Patron Circle
          </button>
        </nav>

        {/* Zone 3: 1 primary action with sleek mode switch */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Viewport display switcher */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
            <button
              onClick={() => onChangeViewportMode('mobile')}
              title="Mobile Device View"
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap ${
                viewportMode === 'mobile'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Phone</span>
            </button>
            <button
              onClick={() => onChangeViewportMode('canvas')}
              title="All Screens Side-by-Side Canvas"
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap ${
                viewportMode === 'canvas'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Multi-Screen</span>
            </button>
            <button
              onClick={() => onChangeViewportMode('desktop')}
              title="Expanded Desktop App View"
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap ${
                viewportMode === 'desktop'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
          </div>

          <button
            onClick={() => onSelectScreen('booking')}
            className="px-4 py-2 text-xs font-semibold tracking-wide text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-amber-500/10"
          >
            Reserve Sanctuary
          </button>
        </div>
      </div>
    </header>
  );
};
