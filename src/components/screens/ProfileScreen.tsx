import React, { useState } from 'react';
import { ScreenType } from '../../types';
import {
  User,
  Shield,
  Award,
  CreditCard,
  Settings,
  Bell,
  Sparkles,
  CheckCircle2,
  Globe,
  Sliders,
  PhoneCall,
  ChevronRight,
  LogOut,
  Moon,
  Compass,
} from 'lucide-react';

interface ProfileScreenProps {
  onNavigate: (screen: ScreenType) => void;
  isMobileCompact?: boolean;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigate,
  isMobileCompact = false,
}) => {
  const [currency, setCurrency] = useState('USD');
  const [notifications, setNotifications] = useState(true);
  const [temperaturePref, setTemperaturePref] = useState('20°C');
  const [pillowPref, setPillowPref] = useState('Goose Down');
  const [conciergeModal, setConciergeModal] = useState(false);

  return (
    <div className={`space-y-6 ${isMobileCompact ? 'px-4 py-3' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
      {/* Editorial Header */}
      <div className="border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-1">
          <span>Private Circle Membership</span>
          <span aria-hidden="true">·</span>
          <span>Patron Tier IV</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Patron Profile & Concierge Lounge
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Confidential membership details, architectural preferences, and private access privileges.
        </p>
      </div>

      {/* Luxury Metallic Patron Card */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
              <span>Atelier Founding Circle</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
              Julian Harrison
            </h2>
            <div className="text-xs text-neutral-400 mt-0.5">
              Patron ID: <span className="font-mono text-amber-300">AS-PATRON-0824</span>
            </div>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 font-display font-bold text-base shadow-inner">
            IV
          </div>
        </div>

        {/* Milestones Stats Row with Tabular Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
          <div>
            <div className="text-[11px] text-neutral-500">Sanctuaries Experienced</div>
            <div className="text-lg font-mono font-bold text-white tabular-nums">4 Stays</div>
          </div>
          <div>
            <div className="text-[11px] text-neutral-500">Residence Nights</div>
            <div className="text-lg font-mono font-bold text-white tabular-nums">18 Nights</div>
          </div>
          <div>
            <div className="text-[11px] text-neutral-500">Carbon Sequestered</div>
            <div className="text-lg font-mono font-bold text-white tabular-nums">100% Neutral</div>
          </div>
          <div>
            <div className="text-[11px] text-neutral-500">Patron Standing</div>
            <div className="text-lg font-mono font-bold text-amber-400 tabular-nums">Lifetime Tier</div>
          </div>
        </div>

        {/* Exclusive Tier Privileges */}
        <div className="pt-2 space-y-2">
          <div className="text-xs font-semibold text-neutral-300">
            Active Tier IV Privileges
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Complimentary private helipad air-bridge transfer</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Unrestricted access to private reserve cellars</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Priority reservations 12 months ahead of public release</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Dedicated 24/7 personal architectural attaché</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Architectural Preferences */}
        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Sliders className="w-4 h-4 text-amber-400" />
            <h3 className="font-display text-sm font-bold text-white">
              Bespoke Sanctuary Preferences
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-neutral-400 block mb-1">
                Preferred Nocturnal Temperature
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['18.5°C', '20°C', '21.5°C'].map((temp) => (
                  <button
                    key={temp}
                    onClick={() => setTemperaturePref(temp)}
                    className={`py-2 rounded-lg border transition-all ${
                      temperaturePref === temp
                        ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400'
                        : 'bg-neutral-950 text-neutral-300 border-white/5'
                    }`}
                  >
                    {temp}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Pillow Menu Customization</label>
              <div className="grid grid-cols-3 gap-2">
                {['Goose Down', 'Buckwheat', 'Memory Foam'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPillowPref(p)}
                    className={`py-2 rounded-lg border transition-all ${
                      pillowPref === p
                        ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400'
                        : 'bg-neutral-950 text-neutral-300 border-white/5'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <div className="text-neutral-400 mb-1">Vinyl Soundscape Curator</div>
              <div className="text-neutral-300 bg-neutral-950 border border-white/10 rounded-lg p-2.5">
                Scandinavian Ambient & Japanese Minimalist Piano (ECM Records)
              </div>
            </div>
          </div>
        </div>

        {/* Account & App Settings */}
        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Settings className="w-4 h-4 text-amber-400" />
            <h3 className="font-display text-sm font-bold text-white">
              Currency & Global Protocols
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-neutral-400 block mb-1.5">Display Valuation Currency</label>
              <div className="grid grid-cols-4 gap-2">
                {['USD', 'EUR', 'GBP', 'CHF'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`py-2 rounded-lg border font-mono transition-all ${
                      currency === c
                        ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400'
                        : 'bg-neutral-950 text-neutral-300 border-white/5'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-t border-white/5">
              <div>
                <div className="font-medium text-white">Encrypted Travel Notifications</div>
                <div className="text-[11px] text-neutral-500">
                  Concierge flight status & keyless gate passes
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-10 h-6 rounded-full transition-colors relative p-1 ${
                  notifications ? 'bg-amber-400' : 'bg-neutral-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-neutral-950 transition-transform ${
                    notifications ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <button
              onClick={() => setConciergeModal(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/10 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>Contact Private Atelier Attaché</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Attaché Modal */}
      {conciergeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/15 rounded-2xl max-w-sm w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-white">
              Direct Architectural Attaché
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Your dedicated concierge is <strong className="text-white">Henrik Holte</strong>. An
              encrypted direct audio bridge is ready.
            </p>
            <div className="bg-neutral-950 rounded-xl p-3 border border-white/10 text-xs font-mono text-amber-300">
              Direct Line: +47 21 00 88 92
            </div>
            <button
              onClick={() => setConciergeModal(false)}
              className="w-full py-2 rounded-lg text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
