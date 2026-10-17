import React from 'react';
import { ScreenType } from '../../types';
import { Compass, Landmark, CreditCard, Calendar, User, Wifi, Battery, Sparkles } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  activeScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  wishlistCount: number;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  activeScreen,
  onSelectScreen,
  wishlistCount,
}) => {
  return (
    <div className="relative mx-auto w-full max-w-[412px] h-[870px] bg-neutral-950 rounded-[52px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_12px_#1f2124,0_0_0_14px_#2d3137] border border-white/10 flex flex-col overflow-hidden">
      {/* Device Top Speaker Notch / Dynamic Island */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-3 w-[124px] h-[30px] bg-black rounded-full border border-white/10 shadow-inner">
        <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700/50 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-blue-900/60" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
          <span className="text-[10px] font-mono tracking-tighter text-neutral-400">Atelier</span>
        </div>
      </div>

      {/* iOS Status Bar */}
      <div className="relative z-40 px-6 pt-2 pb-1 flex items-center justify-between text-xs font-medium text-neutral-300">
        <span className="font-semibold tracking-tight">09:41</span>
        <div className="flex items-center gap-2">
          <Wifi className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold">5G</span>
          <Battery className="w-4 h-4" />
        </div>
      </div>

      {/* Screen Body Viewport */}
      <div className="relative flex-1 overflow-y-auto overflow-x-hidden no-scrollbar rounded-t-[36px] bg-neutral-950 text-neutral-100 pb-16">
        {children}
      </div>

      {/* iOS Floating Bottom Tab Bar */}
      <div className="absolute bottom-3 left-4 right-4 z-40 bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-3xl px-3 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => onSelectScreen('explore')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeScreen === 'explore' ? 'text-amber-400 scale-105' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight">Explore</span>
        </button>

        <button
          onClick={() => onSelectScreen('detail')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeScreen === 'detail' ? 'text-amber-400 scale-105' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight">Architect</span>
        </button>

        <button
          onClick={() => onSelectScreen('booking')}
          className={`relative flex flex-col items-center gap-1 transition-all ${
            activeScreen === 'booking' ? 'text-amber-400 scale-105' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
            <CreditCard className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-medium tracking-tight">Reserve</span>
        </button>

        <button
          onClick={() => onSelectScreen('itinerary')}
          className={`relative flex flex-col items-center gap-1 transition-all ${
            activeScreen === 'itinerary' ? 'text-amber-400 scale-105' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-amber-500 text-neutral-950 text-[9px] font-bold flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
          <span className="text-[10px] font-medium tracking-tight">Schedule</span>
        </button>

        <button
          onClick={() => onSelectScreen('profile')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeScreen === 'profile' ? 'text-amber-400 scale-105' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <User className="w-4 h-4" />
          <span className="text-[10px] font-medium tracking-tight">Patron</span>
        </button>
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full pointer-events-none" />
    </div>
  );
};
