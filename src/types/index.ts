export type ScreenType = 'explore' | 'detail' | 'booking' | 'itinerary' | 'profile';

export type ViewportMode = 'mobile' | 'canvas' | 'desktop';

export interface Sanctuary {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  region: string;
  country: string;
  architecturalStyle: 'Brutalist' | 'Alpine' | 'Heritage' | 'Mediterranean' | 'Minimalist';
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  specs: {
    guests: number;
    bedrooms: number;
    bathrooms: number;
    areaSqFt: number;
  };
  description: string;
  architect: string;
  yearBuilt: number;
  featured: boolean;
  heroImage: string;
  galleryImages: string[];
  amenities: string[];
  spaces: {
    name: string;
    description: string;
  }[];
  reviews: {
    author: string;
    role: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

export interface ConciergeAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: 'per day' | 'per stay' | 'per person';
  selected?: boolean;
}

export interface BookingState {
  sanctuaryId: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guests: number;
  selectedAddons: string[];
  patronName: string;
  patronEmail: string;
  paymentMethod: 'apple_pay' | 'atelier_card' | 'wire_transfer';
  bookingRef?: string;
  isConfirmed?: boolean;
}

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  location: string;
  category: 'Wellness' | 'Culinary' | 'Expedition' | 'Leisure';
  day: number;
  completed?: boolean;
}
