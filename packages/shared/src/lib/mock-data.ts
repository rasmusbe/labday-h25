import { Activity } from './types';
import { getActivityImages } from './unsplash';

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
    ratingBreakdown: { fiveStars: 45, fourStars: 35, threeStars: 15, twoStars: 3, oneStar: 2 }
  },
  {
    id: '2',
    name: 'Vandring runt Varbotjärnen',
    description: 'Vacker vandring runt den pittoreska Varbotjärnen',
    rating: 4.8,
    category: { id: 'naturuppleviser', name: 'Naturuppleviser', icon: '🌲' },
    coordinates: [15.5, 60.6],
    location: 'Varbotjärnen',
    ratingBreakdown: { fiveStars: 60, fourStars: 30, threeStars: 8, twoStars: 1, oneStar: 1 }
  },
  {
    id: '3',
    name: 'Cykling längs Slätta',
    description: 'Mysig cykeltur genom den vackra naturen',
    rating: 4.3,
    category: { id: 'aktiviteter', name: 'Aktiviteter', icon: '🎯' },
    coordinates: [15.4, 60.5],
    location: 'Slätta',
    ratingBreakdown: { fiveStars: 30, fourStars: 40, threeStars: 25, twoStars: 4, oneStar: 1 }
  },
  {
    id: '4',
    name: 'Carl Larsson-gården',
    description: 'Historisk gård med vacker arkitektur och trädgård',
    rating: 4.7,
    category: { id: 'boende', name: 'Boende', icon: '🏠' },
    coordinates: [15.7, 60.8],
    location: 'Carl Larsson-gården',
    ratingBreakdown: { fiveStars: 55, fourStars: 35, threeStars: 8, twoStars: 1, oneStar: 1 }
  },
  {
    id: '5',
    name: 'Högtäkt Restaurang',
    description: 'Lokal mat med fokus på svenska råvaror',
    rating: 4.2,
    category: { id: 'mat-dryck', name: 'Mat & dryck', icon: '🍽️' },
    coordinates: [15.3, 60.4],
    location: 'Högtäkt',
    ratingBreakdown: { fiveStars: 25, fourStars: 45, threeStars: 25, twoStars: 4, oneStar: 1 }
  },
  {
    id: '6',
    name: 'Stångtjärn Naturreservat',
    description: 'Oexploaterad natur med rik flora och fauna',
    rating: 4.9,
    category: { id: 'naturuppleviser', name: 'Naturuppleviser', icon: '🌲' },
    coordinates: [15.8, 60.9],
    location: 'Stångtjärn',
    ratingBreakdown: { fiveStars: 80, fourStars: 18, threeStars: 2, twoStars: 0, oneStar: 0 }
  },
  {
    id: '7',
    name: 'Varpan Vattensport',
    description: 'Kajak och kanot uthyrning vid Varpan',
    rating: 4.4,
    category: { id: 'utrustning-service', name: 'Utrustning & service', icon: '⚙️' },
    coordinates: [15.2, 60.3],
    location: 'Varpan',
    ratingBreakdown: { fiveStars: 35, fourStars: 40, threeStars: 20, twoStars: 4, oneStar: 1 }
  },
  {
    id: '8',
    name: 'Slogmyrloken Camping',
    description: 'Mysig campingplats mitt i naturen',
    rating: 4.6,
    category: { id: 'boende', name: 'Boende', icon: '🏠' },
    coordinates: [15.1, 60.2],
    location: 'Slogmyrloken',
    ratingBreakdown: { fiveStars: 50, fourStars: 35, threeStars: 12, twoStars: 2, oneStar: 1 }
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
