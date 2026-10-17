import React, { useState } from 'react';
import { Sanctuary, ScreenType, BookingState, ItineraryItem } from '../../types';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Plus,
  Compass,
  ArrowRight,
  Sun,
  CloudRain,
  Coffee,
  Utensils,
  Camera,
  Heart,
  X,
} from 'lucide-react';

interface ItineraryScreenProps {
  sanctuaries: Sanctuary[];
  booking: BookingState;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onSelectSanctuary: (sanctuary: Sanctuary) => void;
  onNavigate: (screen: ScreenType) => void;
  isMobileCompact?: boolean;
}

const INITIAL_SCHEDULE: ItineraryItem[] = [
  {
    id: 'it-1',
    day: 1,
    time: '15:00',
    title: 'Helipad Arrival & Luggage Valet',
    location: 'Private Villa Helipad, Aurlandsfjord',
    category: 'Expedition',
    completed: true,
  },
  {
    id: 'it-2',
    day: 1,
    time: '17:30',
    title: 'Hinoki Bath & Fjord Cold Plunge Unwind',
    location: 'Lower Thermal Bath Suite',
    category: 'Wellness',
    completed: true,
  },
  {
    id: 'it-3',
    day: 1,
    time: '19:30',
    title: 'Nordic Fire Tasting Menu by Chef Henrik',
    location: 'Fjord Dining Pavilion',
    category: 'Culinary',
    completed: false,
  },
  {
    id: 'it-4',
    day: 2,
    time: '08:30',
    title: 'Sunrise Movement & Meditation on Timber Pier',
    location: 'Cantilevered Water Pier',
    category: 'Wellness',
    completed: false,
  },
  {
    id: 'it-5',
    day: 2,
    time: '11:00',
    title: 'Private Rib Boat & Waterfall Expedition',
    location: 'Naerøyfjord UNESCO Heritage Inlet',
    category: 'Expedition',
    completed: false,
  },
  {
    id: 'it-6',
    day: 2,
    time: '18:00',
    title: 'Rare Vintage Sommelier Cellar Session',
    location: 'Basalt Wine Chamber',
    category: 'Culinary',
    completed: false,
  },
];

export const ItineraryScreen: React.FC<ItineraryScreenProps> = ({
  sanctuaries,
  booking,
  wishlist,
  onToggleWishlist,
  onSelectSanctuary,
  onNavigate,
  isMobileCompact = false,
}) => {
  const [schedule, setSchedule] = useState<ItineraryItem[]>(INITIAL_SCHEDULE);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('14:00');
  const [newLocation, setNewLocation] = useState('Villa Terrace');
  const [newCategory, setNewCategory] = useState<'Wellness' | 'Culinary' | 'Expedition' | 'Leisure'>('Leisure');

  const activeSanctuary =
    sanctuaries.find((s) => s.id === booking.sanctuaryId) || sanctuaries[0];

  const wishlistSanctuaries = sanctuaries.filter((s) => wishlist.includes(s.id));

  const toggleComplete = (id: string) => {
    setSchedule((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: ItineraryItem = {
      id: `it-${Date.now()}`,
      day: selectedDay,
      time: newTime,
      title: newTitle,
      location: newLocation,
      category: newCategory,
      completed: false,
    };

    setSchedule((prev) => [...prev, newItem].sort((a, b) => a.time.localeCompare(b.time)));
    setNewTitle('');
    setShowAddModal(false);
  };

  const filteredSchedule = schedule.filter((item) => item.day === selectedDay);

  return (
    <div className={`space-y-6 ${isMobileCompact ? 'px-4 py-3' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
      {/* Editorial Header */}
      <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-1">
            <span>Expedition & Sanctuary Itinerary</span>
            <span aria-hidden="true">·</span>
            <span>Live Schedule</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Guest Itinerary & Schedule
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Seamless coordination for your upcoming architectural residences.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Activity</span>
        </button>
      </div>

      {/* Active Upcoming Stay Card */}
      <div className="relative rounded-2xl overflow-hidden border border-amber-400/30 bg-neutral-900 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <img
              src={activeSanctuary.heroImage}
              alt={activeSanctuary.title}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
            />
            <div>
              <div className="text-[11px] text-amber-400 font-mono uppercase tracking-wider">
                Confirmed Upcoming Residence
              </div>
              <h2 className="font-display text-lg font-bold text-white">
                {activeSanctuary.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  {activeSanctuary.location}
                </span>
                <span aria-hidden="true">·</span>
                <span>Ref: {booking.bookingRef || 'AS-2026-NOR-914'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="bg-neutral-950 px-3 py-1.5 rounded-lg border border-white/10 text-right">
              <div className="text-[10px] text-neutral-500 uppercase">Local Weather</div>
              <div className="text-xs font-mono text-neutral-200 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>14°C · Crisp Sun</span>
              </div>
            </div>
            <button
              onClick={() => {
                onSelectSanctuary(activeSanctuary);
                onNavigate('detail');
              }}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white border border-white/10 transition-colors flex items-center gap-1"
            >
              <span>Sanctuary Guide</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Day Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-medium mr-2">Schedule Day:</span>
          {[1, 2, 3].map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                selectedDay === day
                  ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400 shadow-sm'
                  : 'bg-neutral-800 text-neutral-400 border-white/5 hover:text-white'
              }`}
            >
              Day 0{day} · Oct {23 + day}
            </button>
          ))}
        </div>

        {/* Timeline of Events */}
        <div className="space-y-3 pt-2">
          {filteredSchedule.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleComplete(item.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                item.completed
                  ? 'bg-neutral-950/40 border-white/5 opacity-60'
                  : 'bg-neutral-950/80 border-white/10 hover:border-amber-400/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    item.completed
                      ? 'bg-amber-400 border-amber-400 text-neutral-950'
                      : 'border-neutral-600'
                  }`}
                >
                  {item.completed && <CheckCircle2 className="w-4 h-4" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-amber-300 font-semibold">
                      {item.time}
                    </span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span className="text-xs text-neutral-400">{item.category}</span>
                  </div>
                  <div
                    className={`text-xs font-semibold mt-0.5 ${
                      item.completed ? 'line-through text-neutral-400' : 'text-white'
                    }`}
                  >
                    {item.title}
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">{item.location}</div>
                </div>
              </div>

              <div className="text-[10px] text-neutral-500 hidden sm:block">
                {item.completed ? 'Completed' : 'Tap to mark done'}
              </div>
            </div>
          ))}

          {filteredSchedule.length === 0 && (
            <div className="py-8 text-center text-xs text-neutral-400">
              No activities planned for this day yet. Click "Add Custom Activity" above.
            </div>
          )}
        </div>
      </div>

      {/* Saved Patron Wishlist */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-amber-400 fill-amber-400" />
            <h2 className="font-display text-lg font-bold text-white tracking-tight">
              Saved Patron Wishlist ({wishlistSanctuaries.length})
            </h2>
          </div>
          <span className="text-xs text-neutral-400">Reserved for future journeys</span>
        </div>

        {wishlistSanctuaries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlistSanctuaries.map((s) => (
              <div
                key={s.id}
                className="bg-neutral-900 border border-white/10 rounded-xl p-3 flex gap-3 group"
              >
                <img
                  src={s.heroImage}
                  alt={s.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-lg object-cover border border-white/10 shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xs font-bold text-white line-clamp-1">
                      {s.title}
                    </h3>
                    <div className="text-[11px] text-neutral-400">{s.location}</div>
                    <div className="text-xs font-mono text-amber-300 font-semibold mt-1">
                      ${s.pricePerNight} / night
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        onSelectSanctuary(s);
                        onNavigate('detail');
                      }}
                      className="text-[11px] text-amber-400 hover:underline"
                    >
                      View Details
                    </button>
                    <span className="text-neutral-600">·</span>
                    <button
                      onClick={() => onToggleWishlist(s.id)}
                      className="text-[11px] text-neutral-400 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-neutral-500 bg-neutral-900/30 rounded-xl border border-white/5">
            Your wishlist is empty. Tap the heart on any sanctuary in Explore to bookmark.
          </div>
        )}
      </section>

      {/* Add Activity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleAddActivity}
            className="bg-neutral-900 border border-white/15 rounded-2xl max-w-sm w-full p-5 space-y-4 relative"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display text-sm font-bold text-white">
                Schedule Activity for Day 0{selectedDay}
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Activity Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Private Fjord Kayak Tour"
                className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Time</label>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(
                      e.target.value as 'Wellness' | 'Culinary' | 'Expedition' | 'Leisure'
                    )
                  }
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Wellness">Wellness</option>
                  <option value="Culinary">Culinary</option>
                  <option value="Expedition">Expedition</option>
                  <option value="Leisure">Leisure</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">Location / Venue</label>
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="submit"
                className="flex-1 py-2 rounded-lg text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors"
              >
                Add to Schedule
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="py-2 px-3 rounded-lg text-xs text-neutral-400 hover:text-white bg-neutral-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
