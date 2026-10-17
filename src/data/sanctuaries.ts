import { Sanctuary, ConciergeAddon } from '../types';

export const SANCTUARIES: Sanctuary[] = [
  {
    id: 'fjord-brutalist',
    title: 'The Aurland Monolith',
    subtitle: 'Board-formed concrete cantilever over glassy fjord waters',
    location: 'Aurland, Vestland',
    region: 'Western Fjords',
    country: 'Norway',
    architecturalStyle: 'Brutalist',
    pricePerNight: 1450,
    rating: 4.98,
    reviewCount: 38,
    specs: {
      guests: 6,
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 3800,
    },
    description:
      'Perched sheer against the granite precipice of Aurlandsfjord, The Monolith merges raw board-formed concrete with weathered Nordic cedar. Floor-to-ceiling glass pavilions open directly to mist-shrouded waters, featuring a private cantilevered fireplace deck and deep soaking cedar plunge.',
    architect: 'Sverre Breidablikk Arkitekter',
    yearBuilt: 2022,
    featured: true,
    heroImage: '/src/assets/images/hero_architectural_villa_1792231162442.jpg',
    galleryImages: [
      '/src/assets/images/hero_architectural_villa_1792231162442.jpg',
      '/src/assets/images/kyoto_machiya_sanctuary_1792231163341.jpg',
      '/src/assets/images/dolomites_alpine_chalet_1792231163011.jpg',
    ],
    amenities: [
      'Cantilevered fjord observation terrace',
      'Private wood-fired cedar hot tub & cold plunge',
      'Geothermal hydronic heated basalt flooring',
      'Bespoke Bang & Olufsen sound curation',
      'Sub-Zero & Gaggenau culinary kitchen',
      'Private deep-water boat tender berth',
      'Acoustically isolated vinyl listening salon',
      'Full EV fast charging dock (22kW)',
    ],
    spaces: [
      {
        name: 'Fjord Pavilion',
        description: 'Double-height great room with raw concrete fireplace and 12-meter frameless glass panoramic wall.',
      },
      {
        name: 'Master Sanctuary',
        description: 'King suite perched directly above the waterline with direct terrace access and freestanding stone tub.',
      },
      {
        name: 'Thermal Bath & Sauna',
        description: 'Nordic timber sauna with one-way mirrored glass gazing out toward waterfall cascades.',
      },
    ],
    reviews: [
      {
        author: 'Astrid Lindqvist',
        role: 'Architectural Historian, Oslo',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        rating: 5,
        date: 'September 2026',
        comment:
          'The intersection of heavy cast concrete and misty water is transcendent. The acoustic stillness inside is unlike anything I have experienced.',
      },
      {
        author: 'Julian Vance',
        role: 'Design Director, London',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        rating: 5,
        date: 'August 2026',
        comment:
          'Every sightline is calculated. Watching the fjord clouds roll across the monolith in total warmth by the sunken hearth was an unforgettable week.',
      },
    ],
  },
  {
    id: 'kyoto-machiya',
    title: 'Kanso Hinoki House',
    subtitle: 'Centuries-old joinery framing an ancient moss garden',
    location: 'Arashiyama, Kyoto',
    region: 'Kansai',
    country: 'Japan',
    architecturalStyle: 'Minimalist',
    pricePerNight: 1200,
    rating: 4.96,
    reviewCount: 42,
    specs: {
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      areaSqFt: 2200,
    },
    description:
      'Hidden behind a nondescript cedar gate along the Katsura River, Kanso Hinoki House is a restored masterwork of Sukiya-zukuri architecture. Tatami rooms bordered by shoji paper screens slide back entirely to merge interior living with a private, rain-washed moss and bamboo garden.',
    architect: 'Kengo Kuma & Associates (Restoration)',
    yearBuilt: 2021,
    featured: false,
    heroImage: '/src/assets/images/kyoto_machiya_sanctuary_1792231163341.jpg',
    galleryImages: [
      '/src/assets/images/kyoto_machiya_sanctuary_1792231163341.jpg',
      '/src/assets/images/hero_architectural_villa_1792231162442.jpg',
      '/src/assets/images/marrakech_kasbah_courtyard_1792231188828.jpg',
    ],
    amenities: [
      'Aromatic Hinoki wood soaking tub (Ofuro)',
      'Centuries-old curated moss & bamboo courtyard garden',
      'Traditional tea ceremony chashitsu pavilion',
      'Hand-woven igusa tatami matting',
      'Ceramic collection by Living National Treasures',
      'Private tea master morning service',
      'Underfloor radiant climate control',
      'Daikin ultra-silent microclimate purification',
    ],
    spaces: [
      {
        name: 'Shoji Garden Gallery',
        description: 'Living salon flanked by sliding paper partitions opening 180 degrees to the moss garden.',
      },
      {
        name: 'The Hinoki Bath Suite',
        description: 'Soaking bath carved from fragrant ancient hinoki cypress with garden waterfall view.',
      },
      {
        name: 'Tea Pavilion',
        description: 'Four-and-a-half tatami room dedicated to mindfulness and seasonal matcha ceremonies.',
      },
    ],
    reviews: [
      {
        author: 'Claire Delacroix',
        role: 'Curator, Musée des Arts Décoratifs',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        rating: 5,
        date: 'October 2026',
        comment:
          'Absolute poetry. The sound of rain on the moss garden while soaking in the hinoki tub is meditative perfection.',
      },
    ],
  },
  {
    id: 'dolomites-chalet',
    title: 'Alpinum Glass Ridge',
    subtitle: 'Dramatic timber and cantilevered glass facing limestone spires',
    location: 'Val Gardena, South Tyrol',
    region: 'Dolomites',
    country: 'Italy',
    architecturalStyle: 'Alpine',
    pricePerNight: 1680,
    rating: 4.99,
    reviewCount: 51,
    specs: {
      guests: 8,
      bedrooms: 4,
      bathrooms: 4,
      areaSqFt: 4600,
    },
    description:
      'Set high on the alpine meadow with unobstructed vistas of the Sassolungo peaks, Alpinum Glass Ridge reimagines the South Tyrolean hay barn with blackened larch timbers, local porphyry stone, and expansive triple-glazed thermal curtain walls.',
    architect: 'Peter Pichler Architecture',
    yearBuilt: 2023,
    featured: false,
    heroImage: '/src/assets/images/dolomites_alpine_chalet_1792231163011.jpg',
    galleryImages: [
      '/src/assets/images/dolomites_alpine_chalet_1792231163011.jpg',
      '/src/assets/images/hero_architectural_villa_1792231162442.jpg',
      '/src/assets/images/amalfi_cliffside_terrace_1792231188389.jpg',
    ],
    amenities: [
      'Ski-in / ski-out access to Dolomiti Superski',
      'Panoramic Finnish sauna with mountain snow view',
      'Outdoor heated stainless-steel plunge pool',
      'Open wood-burning hearth in local dolomite stone',
      'Custom boot room with ionized gear warming',
      'Temperature-controlled alpine wine cellar',
      'Private chef table seating for 10',
      'Underground heated vehicle port',
    ],
    spaces: [
      {
        name: 'The Great Hearth',
        description: 'Double-volume living pavilion centered around a monolith granite hearth with glass peak vistas.',
      },
      {
        name: 'The Alpine Spa Room',
        description: 'Private wellness sanctuary with pine sauna, steam cave, and glass plunge pool.',
      },
      {
        name: 'Panoramic Mezzanine',
        description: 'Loft library stocked with architectural monographs and stargazing telescope.',
      },
    ],
    reviews: [
      {
        author: 'Dr. Markus Weber',
        role: 'Architect, Zurich',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        rating: 5,
        date: 'January 2026',
        comment:
          'The timber joinery details and the alignment with the Sassolungo peaks during the alpine glow (Enrosadira) are breathtaking.',
      },
    ],
  },
  {
    id: 'amalfi-terrazza',
    title: 'Terrazza di Pietra',
    subtitle: 'Sun-bleached Roman vaults and infinity pool into the Tyrrhenian',
    location: 'Positano, Campania',
    region: 'Amalfi Coast',
    country: 'Italy',
    architecturalStyle: 'Mediterranean',
    pricePerNight: 1850,
    rating: 4.97,
    reviewCount: 34,
    specs: {
      guests: 6,
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 3400,
    },
    description:
      'Carved into the sheer vertical cliffs above Positano, Terrazza di Pietra combines centuries-old stone barrel vaults with contemporary limestone terraces. An organic infinity pool blurs seamlessly into the azure Tyrrhenian Sea below.',
    architect: 'Studio Luca Guadagnino & Partners',
    yearBuilt: 2020,
    featured: false,
    heroImage: '/src/assets/images/amalfi_cliffside_terrace_1792231188389.jpg',
    galleryImages: [
      '/src/assets/images/amalfi_cliffside_terrace_1792231188389.jpg',
      '/src/assets/images/marrakech_kasbah_courtyard_1792231188828.jpg',
      '/src/assets/images/hero_architectural_villa_1792231162442.jpg',
    ],
    amenities: [
      'Private saltwater infinity pool hanging over cliff edge',
      'Lemon grove dining pergola with wood-fired pizza oven',
      'Private funicular lift directly from sea-level cove',
      'Travertine and hand-chiseled limestone interiors',
      'Bespoke Riva boat charter with private captain',
      'Sublime outdoor showers overlooking Capri',
      'Dedicated villa host & sommelier',
      'Private wine vault with reserve Greco di Tufo',
    ],
    spaces: [
      {
        name: 'The Cliffside Loggia',
        description: 'Stone arched colonnade with shaded teak daybeds overlooking the Positano pastel houses.',
      },
      {
        name: 'Sunken Vault Suite',
        description: 'Primary bedroom carved partially into natural rock cliff with natural temperature moderation.',
      },
      {
        name: 'The Citrus Belvedere',
        description: 'Terraced garden planted with heritage Sfusato Amalfitano lemons and outdoor marble dining table.',
      },
    ],
    reviews: [
      {
        author: 'Elena Rinaldi',
        role: 'Restaurateur, Milan',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        rating: 5,
        date: 'July 2026',
        comment:
          'Having morning espresso under the arches as the Amalfi boats glide by is pure magic. Unparalleled seclusion in Positano.',
      },
    ],
  },
  {
    id: 'marrakech-riad',
    title: 'Dar El Nour Kasbah',
    subtitle: 'Intricate zellij tilework, reflecting pool, and aromatic citrus garden',
    location: 'Medina, Marrakech',
    region: 'Marrakech-Safi',
    country: 'Morocco',
    architecturalStyle: 'Heritage',
    pricePerNight: 980,
    rating: 4.95,
    reviewCount: 29,
    specs: {
      guests: 6,
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 3100,
    },
    description:
      'An oasis of tranquility amidst the kinetic energy of the old Medina. Dar El Nour is restored with natural tadelakt lime plaster, hand-carved cedar corbels, and a central emerald zellij pool floating with white rose petals under mature Seville orange trees.',
    architect: 'Studio KO Marrakech',
    yearBuilt: 2019,
    featured: false,
    heroImage: '/src/assets/images/marrakech_kasbah_courtyard_1792231188828.jpg',
    galleryImages: [
      '/src/assets/images/marrakech_kasbah_courtyard_1792231188828.jpg',
      '/src/assets/images/kyoto_machiya_sanctuary_1792231163341.jpg',
      '/src/assets/images/amalfi_cliffside_terrace_1792231188389.jpg',
    ],
    amenities: [
      'Emerald zellij courtyard plunge & reflecting pool',
      'Private marble hammam with eucalyptus steam',
      'Rooftop stargazing lounge with Atlas Mountain views',
      'Traditional Berber breakfast prepared daily by in-house cook',
      'Hand-loomed Moroccan rugs from High Atlas artisans',
      'Aromatic courtyard with Seville orange & jasmine trees',
      'Library of North African architecture & literature',
      'Private medina escort and concierge access',
    ],
    spaces: [
      {
        name: 'The Central Riad Courtyard',
        description: 'Sunlit interior atrium centered around the reflecting pool and towering orange trees.',
      },
      {
        name: 'Atlas Rooftop Terrace',
        description: 'Terracotta terrace with Berber tent seating, open fireplace, and 360-degree views.',
      },
      {
        name: 'Private Hammam Chamber',
        description: 'Traditional domed steam bath lined with grey tadelakt and brass basins.',
      },
    ],
    reviews: [
      {
        author: 'Tariq Mansoor',
        role: 'Writer & Essayist, Paris',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        rating: 5,
        date: 'May 2026',
        comment:
          'Step through the heavy cedar doorway and the chaos of the souks vanishes into the trickling of the fountain. Pure serenity.',
      },
    ],
  },
];

export const CONCIERGE_ADDONS: ConciergeAddon[] = [
  {
    id: 'private-chef',
    name: 'Private In-Sanctuary Michelin-Trained Chef',
    description: 'Four-course seasonal tasting menu prepared daily utilizing hyper-local ingredients and wine pairings.',
    price: 320,
    unit: 'per day',
  },
  {
    id: 'boat-safari',
    name: 'Private Rib Boat & Fjord Safari',
    description: 'Custom half-day expedition with marine biologist skipper to secluded waterfalls and seal colonies.',
    price: 550,
    unit: 'per stay',
  },
  {
    id: 'helicopter-transfer',
    name: 'Direct Helipad Arrival & Departure',
    description: 'Bespoke twin-engine helicopter transfer from nearest international airport directly to villa grounds.',
    price: 900,
    unit: 'per stay',
  },
  {
    id: 'sommelier-tasting',
    name: 'Rare Vintage Sommelier Cellar Session',
    description: 'Private guided tasting of library vintages paired with artisanal cheeses and charcuterie.',
    price: 240,
    unit: 'per stay',
  },
];
