import React, { useState } from 'react';
import { Sanctuary, ScreenType, BookingState } from '../../types';
import { CONCIERGE_ADDONS } from '../../data/sanctuaries';
import {
  Calendar,
  Users,
  Check,
  CreditCard,
  Lock,
  Sparkles,
  QrCode,
  ShieldCheck,
  ArrowRight,
  Plane,
  Clock,
  MapPin,
  X,
  Compass,
} from 'lucide-react';

interface BookingScreenProps {
  sanctuary: Sanctuary;
  onNavigate: (screen: ScreenType) => void;
  booking: BookingState;
  onUpdateBooking: (booking: Partial<BookingState>) => void;
  isMobileCompact?: boolean;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({
  sanctuary,
  onNavigate,
  booking,
  onUpdateBooking,
  isMobileCompact = false,
}) => {
  const [nights, setNights] = useState(booking.nights || 3);
  const [guests, setGuests] = useState(booking.guests || 2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(
    booking.selectedAddons || ['private-chef']
  );
  const [patronName, setPatronName] = useState(booking.patronName || 'Julian Harrison');
  const [patronEmail, setPatronEmail] = useState(
    booking.patronEmail || 'julian.harrison@patrons.atelier.com'
  );
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'atelier_card' | 'wire_transfer'>(
    booking.paymentMethod || 'atelier_card'
  );
  const [specialRequests, setSpecialRequests] = useState(
    'Please prepare the cedar sauna for 18:00 arrival. Temperature preference: 85°C.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVoucher, setShowVoucher] = useState(false);
  const [bookingRef, setBookingRef] = useState('AS-2026-NOR-914');

  const basePrice = sanctuary.pricePerNight * nights;

  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = CONCIERGE_ADDONS.find((a) => a.id === addonId);
    if (!addon) return sum;
    if (addon.unit === 'per day') {
      return sum + addon.price * nights;
    }
    return sum + addon.price;
  }, 0);

  const trustFee = Math.round((basePrice + addonsTotal) * 0.05);
  const vat = Math.round((basePrice + addonsTotal) * 0.07);
  const grandTotal = basePrice + addonsTotal + trustFee + vat;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const ref = `AS-2026-${sanctuary.country.slice(0, 3).toUpperCase()}-${Math.floor(
        100 + Math.random() * 900
      )}`;
      setBookingRef(ref);
      onUpdateBooking({
        sanctuaryId: sanctuary.id,
        nights,
        guests,
        selectedAddons,
        patronName,
        patronEmail,
        paymentMethod,
        bookingRef: ref,
        isConfirmed: true,
      });
      setIsSubmitting(false);
      setShowVoucher(true);
    }, 900);
  };

  return (
    <div className={`space-y-6 ${isMobileCompact ? 'px-4 py-3' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
      {/* Title */}
      <div className="border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-1">
          <span>Curated Concierge Reservation</span>
          <span aria-hidden="true">·</span>
          <span>Encrypted Transaction</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Reserve {sanctuary.title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          {sanctuary.location}, {sanctuary.country} · {sanctuary.architect}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Reservation Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dates & Guests Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-neutral-900 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-300">
                <span className="font-medium flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  Stay Duration
                </span>
                <span className="font-mono text-amber-400">{nights} nights</span>
              </div>
              <div className="flex items-center gap-2">
                {[2, 3, 5, 7, 10].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNights(n)}
                    className={`flex-1 py-1.5 text-xs rounded-lg border transition-all ${
                      nights === n
                        ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400 shadow-sm'
                        : 'bg-neutral-800 text-neutral-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {n}N
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-neutral-400">
                Check-in: Oct 24, 2026 · Check-out: Oct {24 + nights}, 2026
              </div>
            </div>

            <div className="bg-neutral-900 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-300">
                <span className="font-medium flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-400" />
                  Party Size
                </span>
                <span className="font-mono text-amber-400">{guests} guests</span>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 4, 6].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGuests(g)}
                    disabled={g > sanctuary.specs.guests}
                    className={`flex-1 py-1.5 text-xs rounded-lg border transition-all ${
                      guests === g
                        ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400 shadow-sm'
                        : g > sanctuary.specs.guests
                        ? 'opacity-30 cursor-not-allowed bg-neutral-900 border-white/5'
                        : 'bg-neutral-800 text-neutral-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-neutral-400">
                Capacity limit: {sanctuary.specs.guests} guests maximum
              </div>
            </div>
          </div>

          {/* Curated Concierge Add-ons */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-white tracking-tight">
                Curated Concierge Services
              </h2>
              <span className="text-xs text-neutral-400">Optional bespoke enhancements</span>
            </div>

            <div className="space-y-2.5">
              {CONCIERGE_ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                      isSelected
                        ? 'bg-neutral-900 border-amber-400/50 shadow-sm shadow-amber-500/5'
                        : 'bg-neutral-900/40 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-amber-400 border-amber-400 text-neutral-950'
                            : 'border-neutral-600 bg-neutral-800'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">{addon.name}</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5 max-w-lg">
                          {addon.description}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-semibold text-amber-300 tabular-nums">
                        +${addon.price}
                      </span>
                      <span className="block text-[10px] text-neutral-500">{addon.unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Patron Credentials */}
          <section className="space-y-3 bg-neutral-900 border border-white/10 rounded-xl p-4">
            <h2 className="font-display text-sm font-bold text-white tracking-tight">
              Patron Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">
                  Primary Guest Full Name
                </label>
                <input
                  type="text"
                  value={patronName}
                  onChange={(e) => setPatronName(e.target.value)}
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">
                  Patron Confidential Email
                </label>
                <input
                  type="email"
                  value={patronEmail}
                  onChange={(e) => setPatronEmail(e.target.value)}
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">
                Architectural or Dietary Specifications
              </label>
              <textarea
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </section>
        </div>

        {/* Right 1 Col: Financial Summary & Payment */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-neutral-900 border border-white/15 rounded-2xl p-5 space-y-5 shadow-2xl">
            {/* Sanctuary mini header */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <img
                src={sanctuary.heroImage}
                alt={sanctuary.title}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-lg object-cover border border-white/10 shrink-0"
              />
              <div>
                <h3 className="font-display text-sm font-bold text-white line-clamp-1">
                  {sanctuary.title}
                </h3>
                <div className="text-xs text-neutral-400">{sanctuary.location}</div>
                <div className="text-[11px] text-amber-300 font-mono mt-0.5">
                  {nights} nights · {guests} guests
                </div>
              </div>
            </div>

            {/* Itemized Calculation */}
            <div className="space-y-2 text-xs text-neutral-300">
              <div className="flex justify-between">
                <span>
                  Sanctuary Rate (${sanctuary.pricePerNight} × {nights}N)
                </span>
                <span className="font-mono tabular-nums text-white">${basePrice.toLocaleString()}</span>
              </div>

              {addonsTotal > 0 && (
                <div className="flex justify-between text-neutral-400">
                  <span>Selected Concierge Add-ons</span>
                  <span className="font-mono tabular-nums text-white">+${addonsTotal.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-400">
                <span>Architectural Conservation Fund (5%)</span>
                <span className="font-mono tabular-nums text-white">${trustFee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-neutral-400">
                <span>Regional Tourism & Climate Surcharge (7%)</span>
                <span className="font-mono tabular-nums text-white">${vat.toLocaleString()}</span>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline font-bold">
                <span className="text-white text-sm">Total Investment</span>
                <span className="font-mono text-xl text-amber-400 tabular-nums">
                  ${grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs font-medium text-neutral-400">Payment Authorization</span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('atelier_card')}
                  className={`py-2 px-1 text-[11px] rounded-lg border font-medium transition-all ${
                    paymentMethod === 'atelier_card'
                      ? 'bg-neutral-800 text-amber-300 border-amber-400/50'
                      : 'bg-neutral-950 text-neutral-400 border-white/5'
                  }`}
                >
                  Patron Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`py-2 px-1 text-[11px] rounded-lg border font-medium transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-neutral-800 text-amber-300 border-amber-400/50'
                      : 'bg-neutral-950 text-neutral-400 border-white/5'
                  }`}
                >
                  Apple Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wire_transfer')}
                  className={`py-2 px-1 text-[11px] rounded-lg border font-medium transition-all ${
                    paymentMethod === 'wire_transfer'
                      ? 'bg-neutral-800 text-amber-300 border-amber-400/50'
                      : 'bg-neutral-950 text-neutral-400 border-white/5'
                  }`}
                >
                  Private Wire
                </button>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="w-full py-3 px-4 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Authorizing Sanctuary Escrow...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authorize Sanctuary Reservation</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1 text-[10px] text-neutral-500">
              <ShieldCheck className="w-3 h-3" />
              <span>Full refund available up to 14 days prior to arrival</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Digital Voucher Modal */}
      {showVoucher && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/15 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowVoucher(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Voucher Header */}
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Sanctuary Confirmed
              </div>
              <h2 className="font-display text-xl font-bold text-white">
                Bespoke Boarding Pass
              </h2>
              <p className="text-xs text-neutral-400">
                Your private architectural residence is verified.
              </p>
            </div>

            {/* Digital Pass Card */}
            <div className="bg-neutral-950 rounded-2xl p-4 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase">Reservation ID</div>
                  <div className="font-mono text-xs font-bold text-amber-300">{bookingRef}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-neutral-500 uppercase">Status</div>
                  <div className="text-xs font-semibold text-emerald-400">Guaranteed</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={sanctuary.heroImage}
                  alt={sanctuary.title}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white">{sanctuary.title}</div>
                  <div className="text-[11px] text-neutral-400">{sanctuary.location}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs border-t border-white/10 pt-3">
                <div>
                  <div className="text-[10px] text-neutral-500">Dates</div>
                  <div className="text-white font-medium">{nights} Nights (Oct 2026)</div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500">Guests</div>
                  <div className="text-white font-medium">{guests} Adults</div>
                </div>
              </div>

              {/* QR Code and Barcode mockup */}
              <div className="bg-white p-3 rounded-xl flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-neutral-900 font-bold uppercase tracking-wider">
                    ATELIER ACCESS PASS
                  </span>
                  <span className="text-[11px] font-mono font-bold text-neutral-800">
                    {patronName}
                  </span>
                  <span className="text-[9px] text-neutral-500">
                    Scan at villa private security gate
                  </span>
                </div>
                <QrCode className="w-12 h-12 text-neutral-950 shrink-0" />
              </div>
            </div>

            {/* Voucher Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowVoucher(false);
                  onNavigate('itinerary');
                }}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-2"
              >
                <span>View in Itinerary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setShowVoucher(false)}
                className="py-2.5 px-4 rounded-xl text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
