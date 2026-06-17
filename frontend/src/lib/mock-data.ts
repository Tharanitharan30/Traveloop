export type TripStatus = "draft" | "upcoming" | "ongoing" | "completed";

export interface City {
  id: string;
  name: string;
  country: string;
  region: string;
  image: string;
  costIndex: number; // 1-100
  popularity: number; // 1-100
  description: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  city: string;
  category: "Adventure" | "Culture" | "Food" | "Nature" | "Nightlife" | "Relax";
  image: string;
  duration: number; // hours
  cost: number;
  rating: number;
}

export interface TripStop {
  id: string;
  cityId: string;
  arrival: string;
  departure: string;
  activityIds: string[];
}

export interface Trip {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  cover: string;
  status: TripStatus;
  budget: number;
  spent: number;
  stops: TripStop[];
  shared: boolean;
  creator: string;
}

export interface PackingItem {
  id: string;
  tripId: string;
  category: "Clothing" | "Documents" | "Electronics" | "Essentials";
  name: string;
  packed: boolean;
}

export interface Note {
  id: string;
  tripId: string;
  title: string;
  content: string;
  createdAt: string;
}

const img = (q: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const cities: City[] = [
  {
    id: "c1",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    image: img("photo-1540959733332-eab4deabeeaf"),
    costIndex: 82,
    popularity: 96,
    description:
      "Neon-drenched megacity blending tradition and cutting-edge tech.",
  },
  {
    id: "c2",
    name: "Paris",
    country: "France",
    region: "Europe",
    image: img("photo-1502602898657-3e91760cbb34"),
    costIndex: 85,
    popularity: 98,
    description: "City of light, café culture, and timeless boulevards.",
  },
  {
    id: "c3",
    name: "Lisbon",
    country: "Portugal",
    region: "Europe",
    image: img("photo-1555881400-74d7acaacd8b"),
    costIndex: 55,
    popularity: 88,
    description: "Pastel hills, tram rides and Atlantic sunsets.",
  },
  {
    id: "c4",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    image: img("photo-1537996194471-e657df975ab4"),
    costIndex: 35,
    popularity: 92,
    description: "Lush rice terraces, surf beaches and temple villages.",
  },
  {
    id: "c5",
    name: "New York",
    country: "USA",
    region: "North America",
    image: img("photo-1496442226666-8d4d0e62e6e9"),
    costIndex: 95,
    popularity: 99,
    description: "The city that never sleeps — skylines, museums, slices.",
  },
  {
    id: "c6",
    name: "Reykjavík",
    country: "Iceland",
    region: "Europe",
    image: img("photo-1504233529578-6d46baba6d34"),
    costIndex: 90,
    popularity: 78,
    description: "Northern lights, geothermal lagoons, volcanic landscapes.",
  },
  {
    id: "c7",
    name: "Marrakech",
    country: "Morocco",
    region: "Africa",
    image: img("photo-1597212618440-806262de4f6b"),
    costIndex: 40,
    popularity: 80,
    description: "Souks, riads, and spice-scented medinas.",
  },
  {
    id: "c8",
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    image: img("photo-1580060839134-75a5edca2e99"),
    costIndex: 50,
    popularity: 84,
    description: "Table Mountain, vineyards and two-ocean coastline.",
  },
  {
    id: "c9",
    name: "Sydney",
    country: "Australia",
    region: "Oceania",
    image: img("photo-1506973035872-a4ec16b8e8d9"),
    costIndex: 78,
    popularity: 90,
    description: "Harbour life, beaches and Opera House icon.",
  },
  {
    id: "c10",
    name: "Rio de Janeiro",
    country: "Brazil",
    region: "South America",
    image: img("photo-1483729558449-99ef09a8c325"),
    costIndex: 48,
    popularity: 86,
    description: "Beaches, samba and dramatic mountain backdrops.",
  },
  {
    id: "c11",
    name: "Barcelona",
    country: "Spain",
    region: "Europe",
    image: img("photo-1583422409516-2895a77efded"),
    costIndex: 65,
    popularity: 94,
    description: "Gaudí architecture, tapas and Mediterranean charm.",
  },
  {
    id: "c12",
    name: "Istanbul",
    country: "Turkey",
    region: "Europe",
    image: img("photo-1524231757912-21f4fe3a7200"),
    costIndex: 45,
    popularity: 89,
    description: "Two continents, ancient bazaars and Bosphorus views.",
  },
  {
    id: "c13",
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    image: img("photo-1493976040374-85c8e12f0c0e"),
    costIndex: 70,
    popularity: 91,
    description: "Temples, geisha districts and bamboo groves.",
  },
  {
    id: "c14",
    name: "Queenstown",
    country: "New Zealand",
    region: "Oceania",
    image: img("photo-1469854523086-cc02fe5d8800"),
    costIndex: 72,
    popularity: 82,
    description: "Adventure capital of the southern alps.",
  },
  {
    id: "c15",
    name: "Mexico City",
    country: "Mexico",
    region: "North America",
    image: img("photo-1518105779142-d975f22f1b0a"),
    costIndex: 42,
    popularity: 85,
    description: "Vibrant food scene, museums and colorful neighborhoods.",
  },
  {
    id: "c16",
    name: "Prague",
    country: "Czechia",
    region: "Europe",
    image: img("photo-1519677100203-a0e668c92439"),
    costIndex: 50,
    popularity: 83,
    description: "Fairytale old town and Gothic spires.",
  },
  {
    id: "c17",
    name: "Bangkok",
    country: "Thailand",
    region: "Asia",
    image: img("photo-1508009603885-50cf7c579365"),
    costIndex: 38,
    popularity: 93,
    description: "Street food paradise and golden temples.",
  },
  {
    id: "c18",
    name: "Vancouver",
    country: "Canada",
    region: "North America",
    image: img("photo-1559511260-66a654ae982a"),
    costIndex: 75,
    popularity: 81,
    description: "Ocean, mountains and a refined coastal city.",
  },
  {
    id: "c19",
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    image: img("photo-1570077188670-e3a8d69ac5ff"),
    costIndex: 68,
    popularity: 95,
    description: "Whitewashed cliffs above the Aegean blue.",
  },
  {
    id: "c20",
    name: "Dubai",
    country: "UAE",
    region: "Asia",
    image: img("photo-1512453979798-5ea266f8880c"),
    costIndex: 80,
    popularity: 87,
    description: "Skyscrapers, desert dunes and gold souks.",
  },
];

const cats = [
  "Adventure",
  "Culture",
  "Food",
  "Nature",
  "Nightlife",
  "Relax",
] as const;
const activityNames = [
  "Sunset Sailing",
  "Local Food Tour",
  "Mountain Hike",
  "Museum Pass",
  "Old Town Walk",
  "Cooking Class",
  "Snorkel Trip",
  "Wine Tasting",
  "Rooftop Bar",
  "Spa Day",
  "Bike Rental",
  "Photography Tour",
  "Hot Air Balloon",
  "Temple Visit",
  "Surf Lesson",
  "Live Jazz Night",
  "Market Wander",
  "Castle Tour",
  "Kayak Adventure",
  "Street Art Tour",
];
const activityImages = [
  "photo-1530789253388-582c481c54b0",
  "photo-1414235077428-338989a2e8c0",
  "photo-1551632811-561732d1e306",
  "photo-1518998053901-5348d3961a04",
  "photo-1496950866446-3253e1470e8e",
  "photo-1556909114-f6e7ad7d3136",
  "photo-1559827260-dc66d52bef19",
  "photo-1510812431401-41d2bd2722f3",
  "photo-1514933651103-005eec06c04b",
  "photo-1540555700478-4be289fbecef",
  "photo-1502810190503-8303352d0dd1",
  "photo-1493238792000-8113da705763",
  "photo-1507608616759-54f48f0af0ee",
  "photo-1545569341-9eb8b30979d9",
  "photo-1502933691298-84fc14542831",
  "photo-1415201364774-f6f0bb35f28f",
  "photo-1488459716781-31db52582fe9",
  "photo-1533104816931-20fa691ff6ca",
  "photo-1572125675722-238a51764762",
  "photo-1551913902-c92207136625",
];

export const activities: Activity[] = Array.from({ length: 50 }, (_, i) => {
  const city = cities[i % cities.length];
  const name = activityNames[i % activityNames.length];
  return {
    id: `a${i + 1}`,
    name: `${name} — ${city.name}`,
    description: "A curated experience hand-picked by Traveloop locals.",
    city: city.name,
    category: cats[i % cats.length],
    image: img(activityImages[i % activityImages.length], 800, 600),
    duration: 1 + (i % 6),
    cost: 20 + ((i * 17) % 280),
    rating: 4 + ((i * 13) % 10) / 10,
  };
});

const today = new Date();
const addDays = (d: Date, days: number) => {
  const n = new Date(d);
  n.setDate(n.getDate() + days);
  return n.toISOString().slice(0, 10);
};

export const trips: Trip[] = [
  {
    id: "t1",
    name: "Japan Discovery",
    description:
      "Two weeks across Tokyo and Kyoto exploring food, temples and design.",
    startDate: addDays(today, 14),
    endDate: addDays(today, 28),
    cover: img("photo-1545569341-9eb8b30979d9"),
    status: "upcoming",
    budget: 4800,
    spent: 1200,
    shared: true,
    creator: "You",
    stops: [
      {
        id: "s1",
        cityId: "c1",
        arrival: addDays(today, 14),
        departure: addDays(today, 21),
        activityIds: ["a1", "a7", "a13"],
      },
      {
        id: "s2",
        cityId: "c13",
        arrival: addDays(today, 21),
        departure: addDays(today, 28),
        activityIds: ["a2", "a14"],
      },
    ],
  },
  {
    id: "t2",
    name: "European Summer",
    description: "Paris → Barcelona → Lisbon. Trains, tapas and sunsets.",
    startDate: addDays(today, 60),
    endDate: addDays(today, 80),
    cover: img("photo-1502602898657-3e91760cbb34"),
    status: "upcoming",
    budget: 5500,
    spent: 0,
    shared: false,
    creator: "You",
    stops: [
      {
        id: "s3",
        cityId: "c2",
        arrival: addDays(today, 60),
        departure: addDays(today, 67),
        activityIds: ["a4", "a8"],
      },
      {
        id: "s4",
        cityId: "c11",
        arrival: addDays(today, 67),
        departure: addDays(today, 74),
        activityIds: ["a3"],
      },
      {
        id: "s5",
        cityId: "c3",
        arrival: addDays(today, 74),
        departure: addDays(today, 80),
        activityIds: ["a5"],
      },
    ],
  },
  {
    id: "t3",
    name: "Bali Recharge",
    description: "A week of surf, yoga and rice terraces.",
    startDate: addDays(today, -30),
    endDate: addDays(today, -20),
    cover: img("photo-1537996194471-e657df975ab4"),
    status: "completed",
    budget: 2200,
    spent: 1980,
    shared: true,
    creator: "You",
    stops: [
      {
        id: "s6",
        cityId: "c4",
        arrival: addDays(today, -30),
        departure: addDays(today, -20),
        activityIds: ["a15", "a10"],
      },
    ],
  },
  {
    id: "t4",
    name: "Iceland Ring Road",
    description: "Volcanoes, lagoons and northern lights chase.",
    startDate: addDays(today, 120),
    endDate: addDays(today, 130),
    cover: img("photo-1504233529578-6d46baba6d34"),
    status: "draft",
    budget: 3800,
    spent: 0,
    shared: false,
    creator: "You",
    stops: [
      {
        id: "s7",
        cityId: "c6",
        arrival: addDays(today, 120),
        departure: addDays(today, 130),
        activityIds: [],
      },
    ],
  },
  {
    id: "t5",
    name: "Morocco Markets",
    description: "Riads, souks and Sahara dunes.",
    startDate: addDays(today, 200),
    endDate: addDays(today, 212),
    cover: img("photo-1597212618440-806262de4f6b"),
    status: "draft",
    budget: 2400,
    spent: 0,
    shared: false,
    creator: "You",
    stops: [
      {
        id: "s8",
        cityId: "c7",
        arrival: addDays(today, 200),
        departure: addDays(today, 212),
        activityIds: [],
      },
    ],
  },
  {
    id: "t6",
    name: "NYC Weekend",
    description: "Galleries, bagels and Broadway.",
    startDate: addDays(today, -120),
    endDate: addDays(today, -117),
    cover: img("photo-1496442226666-8d4d0e62e6e9"),
    status: "completed",
    budget: 1500,
    spent: 1620,
    shared: false,
    creator: "You",
    stops: [
      {
        id: "s9",
        cityId: "c5",
        arrival: addDays(today, -120),
        departure: addDays(today, -117),
        activityIds: ["a17"],
      },
    ],
  },
];

export const sharedTrips: Trip[] = [
  {
    id: "st1",
    name: "Greek Islands Hop",
    description: "Two weeks through Santorini, Naxos and Crete.",
    startDate: addDays(today, 45),
    endDate: addDays(today, 59),
    cover: img("photo-1570077188670-e3a8d69ac5ff"),
    status: "upcoming",
    budget: 3600,
    spent: 0,
    shared: true,
    creator: "Maya R.",
    stops: [
      {
        id: "ss1",
        cityId: "c19",
        arrival: addDays(today, 45),
        departure: addDays(today, 59),
        activityIds: ["a1"],
      },
    ],
  },
  {
    id: "st2",
    name: "New Zealand Adventure",
    description: "Glacier hikes, fjords and bungy jumps.",
    startDate: addDays(today, 90),
    endDate: addDays(today, 110),
    cover: img("photo-1469854523086-cc02fe5d8800"),
    status: "upcoming",
    budget: 6200,
    spent: 0,
    shared: true,
    creator: "Liam K.",
    stops: [
      {
        id: "ss2",
        cityId: "c14",
        arrival: addDays(today, 90),
        departure: addDays(today, 110),
        activityIds: ["a3"],
      },
    ],
  },
  {
    id: "st3",
    name: "South Africa Safari",
    description: "Cape Town wine country and Kruger safari.",
    startDate: addDays(today, 30),
    endDate: addDays(today, 45),
    cover: img("photo-1580060839134-75a5edca2e99"),
    status: "upcoming",
    budget: 4500,
    spent: 0,
    shared: true,
    creator: "Priya S.",
    stops: [
      {
        id: "ss3",
        cityId: "c8",
        arrival: addDays(today, 30),
        departure: addDays(today, 45),
        activityIds: ["a8"],
      },
    ],
  },
];

export const packingTemplate: Omit<PackingItem, "id" | "tripId">[] = [
  { category: "Documents", name: "Passport", packed: true },
  { category: "Documents", name: "Travel insurance", packed: true },
  { category: "Documents", name: "Flight tickets", packed: false },
  { category: "Electronics", name: "Phone charger", packed: true },
  { category: "Electronics", name: "Universal adapter", packed: false },
  { category: "Electronics", name: "Camera", packed: false },
  { category: "Electronics", name: "Power bank", packed: true },
  { category: "Clothing", name: "Comfortable shoes", packed: true },
  { category: "Clothing", name: "Rain jacket", packed: false },
  { category: "Clothing", name: "Swimwear", packed: false },
  { category: "Clothing", name: "Layers", packed: false },
  { category: "Essentials", name: "Toiletries", packed: true },
  { category: "Essentials", name: "Medication", packed: true },
  { category: "Essentials", name: "Reusable water bottle", packed: false },
  { category: "Essentials", name: "Sunscreen", packed: false },
];

export const notesSeed: Note[] = [
  {
    id: "n1",
    tripId: "t1",
    title: "Best ramen in Shibuya",
    content:
      "Ichiran is overrated — try Afuri for citrus shio ramen. Open late.",
    createdAt: addDays(today, -2),
  },
  {
    id: "n2",
    tripId: "t3",
    title: "Ubud morning routine",
    content:
      "Yoga at 7am, coconut at the warung, then rice terrace walk before crowds.",
    createdAt: addDays(today, -25),
  },
  {
    id: "n3",
    tripId: "t2",
    title: "Train Paris → Barcelona",
    content:
      "Book renfe-SNCF at least 60 days out. Window seat on the right side.",
    createdAt: addDays(today, -1),
  },
];

export const getCity = (id: string) => cities.find((c) => c.id === id);
export const getActivity = (id: string) => activities.find((a) => a.id === id);
export const getTrip = (id: string) => trips.find((t) => t.id === id);
