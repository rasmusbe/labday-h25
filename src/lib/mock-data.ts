import { Activity, Review, ActivityFact } from './types';
import { getActivityImages } from './unsplash';
import { generateSlug } from './utils';

// Mock reviews data
const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    reviewerName: 'Anna Svensson',
    date: '2024-01-15',
    rating: 5,
    comment: 'Fantastisk upplevelse! Perfekt för hela familjen. Personalen var mycket hjälpsam och aktiviteten var väl organiserad.',
    avatar: '/avatars/anna.jpg'
  },
  {
    id: '2',
    reviewerName: 'Erik Johansson',
    date: '2024-01-10',
    rating: 4,
    comment: 'Mycket trevlig aktivitet. Bra pris och bra service. Rekommenderar varmt!',
    avatar: '/avatars/erik.jpg'
  },
  {
    id: '3',
    reviewerName: 'Maria Andersson',
    date: '2024-01-05',
    rating: 5,
    comment: 'En av de bästa upplevelserna jag haft! Ska definitivt komma tillbaka.',
    avatar: '/avatars/maria.jpg'
  },
  {
    id: '4',
    reviewerName: 'Lars Nilsson',
    date: '2023-12-28',
    rating: 4,
    comment: 'Bra aktivitet med vacker natur. Lite kyligt men det var värt det.',
    avatar: '/avatars/lars.jpg'
  },
  {
    id: '5',
    reviewerName: 'Sofia Karlsson',
    date: '2023-12-20',
    rating: 5,
    comment: 'Perfekt för en romantisk utflykt! Mycket professionell personal.',
    avatar: '/avatars/sofia.jpg'
  },
  {
    id: '6',
    reviewerName: 'Johan Lindberg',
    date: '2023-12-15',
    rating: 4,
    comment: 'Trevlig aktivitet, bra för barn. Kunde ha varit lite längre.',
    avatar: '/avatars/johan.jpg'
  }
];

// Mock facts data
const MOCK_FACTS: ActivityFact[] = [
  {
    icon: '⏱️',
    label: 'Varaktighet',
    value: '2-3 timmar'
  },
  {
    icon: '👥',
    label: 'Gruppstorlek',
    value: 'Max 12 personer'
  },
  {
    icon: '🎒',
    label: 'Utrustning',
    value: 'Inkluderat i priset'
  },
  {
    icon: '🌡️',
    label: 'Säsong',
    value: 'Året runt'
  },
  {
    icon: '📍',
    label: 'Svårighetsgrad',
    value: 'Lätt till medel'
  },
  {
    icon: '💰',
    label: 'Pris',
    value: 'Från 299 kr/person'
  }
];

// Base activities data without images
const BASE_ACTIVITIES: Omit<Activity, 'image'>[] = [
  {
    id: '1',
    name: 'Klättring i Sundbornsån',
    description: 'Utmanande klättring med fantastisk utsikt över Sundbornsån',
    rating: 4.5,
    category: { id: 'aktiviteter', name: 'Aktiviteter', icon: '🎯' },
    coordinates: [15.6, 60.7],
    location: 'Sundbornsån',
    ratingBreakdown: { fiveStars: 45, fourStars: 35, threeStars: 15, twoStars: 3, oneStar: 2 },
    slug: generateSlug('Klättring i Sundbornsån'),
    reviews: MOCK_REVIEWS.slice(0, 2),
    facts: MOCK_FACTS.slice(0, 3)
  },
  {
    id: '2',
    name: 'Vandring runt Varbotjärnen',
    description: 'Vacker vandring runt den pittoreska Varbotjärnen',
    rating: 4.8,
    category: { id: 'naturuppleviser', name: 'Naturuppleviser', icon: '🌲' },
    coordinates: [15.5, 60.6],
    location: 'Varbotjärnen',
    ratingBreakdown: { fiveStars: 60, fourStars: 30, threeStars: 8, twoStars: 1, oneStar: 1 },
    slug: generateSlug('Vandring runt Varbotjärnen'),
    reviews: MOCK_REVIEWS.slice(1, 3),
    facts: MOCK_FACTS.slice(1, 4)
  },
  {
    id: '3',
    name: 'Cykling längs Slätta',
    description: 'Mysig cykeltur genom den vackra naturen',
    rating: 4.3,
    category: { id: 'aktiviteter', name: 'Aktiviteter', icon: '🎯' },
    coordinates: [15.4, 60.5],
    location: 'Slätta',
    ratingBreakdown: { fiveStars: 30, fourStars: 40, threeStars: 25, twoStars: 4, oneStar: 1 },
    slug: generateSlug('Cykling längs Slätta'),
    reviews: MOCK_REVIEWS.slice(2, 4),
    facts: MOCK_FACTS.slice(2, 5)
  },
  {
    id: '4',
    name: 'Carl Larsson-gården',
    description: 'Historisk gård med vacker arkitektur och trädgård',
    rating: 4.7,
    category: { id: 'boende', name: 'Boende', icon: '🏠' },
    coordinates: [15.7, 60.8],
    location: 'Carl Larsson-gården',
    ratingBreakdown: { fiveStars: 55, fourStars: 35, threeStars: 8, twoStars: 1, oneStar: 1 },
    slug: generateSlug('Carl Larsson-gården'),
    reviews: MOCK_REVIEWS.slice(3, 5),
    facts: MOCK_FACTS.slice(3, 6)
  },
  {
    id: '5',
    name: 'Högtäkt Restaurang',
    description: 'Lokal mat med fokus på svenska råvaror',
    rating: 4.2,
    category: { id: 'mat-dryck', name: 'Mat & dryck', icon: '🍽️' },
    coordinates: [15.3, 60.4],
    location: 'Högtäkt',
    ratingBreakdown: { fiveStars: 25, fourStars: 45, threeStars: 25, twoStars: 4, oneStar: 1 },
    slug: generateSlug('Högtäkt Restaurang'),
    reviews: MOCK_REVIEWS.slice(4, 6),
    facts: MOCK_FACTS.slice(0, 3)
  },
  {
    id: '6',
    name: 'Stångtjärn Naturreservat',
    description: 'Oexploaterad natur med rik flora och fauna',
    rating: 4.9,
    category: { id: 'naturuppleviser', name: 'Naturuppleviser', icon: '🌲' },
    coordinates: [15.8, 60.9],
    location: 'Stångtjärn',
    ratingBreakdown: { fiveStars: 80, fourStars: 18, threeStars: 2, twoStars: 0, oneStar: 0 },
    slug: generateSlug('Stångtjärn Naturreservat'),
    reviews: MOCK_REVIEWS.slice(0, 2),
    facts: MOCK_FACTS.slice(1, 4)
  },
  {
    id: '7',
    name: 'Varpan Vattensport',
    description: 'Kajak och kanot uthyrning vid Varpan',
    rating: 4.4,
    category: { id: 'utrustning-service', name: 'Utrustning & service', icon: '⚙️' },
    coordinates: [15.2, 60.3],
    location: 'Varpan',
    ratingBreakdown: { fiveStars: 35, fourStars: 40, threeStars: 20, twoStars: 4, oneStar: 1 },
    slug: generateSlug('Varpan Vattensport'),
    reviews: MOCK_REVIEWS.slice(1, 3),
    facts: MOCK_FACTS.slice(2, 5)
  },
  {
    id: '8',
    name: 'Slogmyrloken Camping',
    description: 'Mysig campingplats mitt i naturen',
    rating: 4.6,
    category: { id: 'boende', name: 'Boende', icon: '🏠' },
    coordinates: [15.1, 60.2],
    location: 'Slogmyrloken',
    ratingBreakdown: { fiveStars: 50, fourStars: 35, threeStars: 12, twoStars: 2, oneStar: 1 },
    slug: generateSlug('Slogmyrloken Camping'),
    reviews: MOCK_REVIEWS.slice(2, 4),
    facts: MOCK_FACTS.slice(3, 6)
  }
];

// Function to generate activities with Unsplash images
export async function generateActivitiesWithImages(): Promise<Activity[]> {
  try {
    const images = await getActivityImages();

    return BASE_ACTIVITIES.map((activity, index) => ({
      ...activity,
      image: images[index]?.url || '/placeholder-activity.jpg' // Fallback to placeholder
    }));
  } catch (error) {
    console.error('Error generating activities with images:', error);
    // Return activities with placeholder images
    return BASE_ACTIVITIES.map(activity => ({
      ...activity,
      image: '/placeholder-activity.jpg'
    }));
  }
}

// For backward compatibility, export static data (will be replaced by async function)
export const MOCK_ACTIVITIES: Activity[] = BASE_ACTIVITIES.map(activity => ({
  ...activity,
  image: '/placeholder-activity.jpg'
}));

export const POPULAR_ACTIVITIES = MOCK_ACTIVITIES.slice(0, 4);
export const RECOMMENDED_ACTIVITIES = MOCK_ACTIVITIES.slice(4, 8);
