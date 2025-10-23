import { Activity } from './types';

// Create activities - images will be fetched from Unsplash API
export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    name: 'Klättring i Sundbornsån',
    description: 'Utmanande klättring med fantastisk utsikt över Sundbornsån',
    rating: 4.5,
    category: { id: 'aktiviteter', name: 'Aktiviteter', icon: '🎯' },
    coordinates: [15.6, 60.7],
    image: '', // Will be replaced by Unsplash API
    location: 'Sundbornsån'
  },
  {
    id: '2',
    name: 'Vandring runt Varbotjärnen',
    description: 'Vacker vandring runt den pittoreska Varbotjärnen',
    rating: 4.8,
    category: { id: 'naturuppleviser', name: 'Naturuppleviser', icon: '🌲' },
    coordinates: [15.5, 60.6],
    image: '', // Will be replaced by Unsplash API
    location: 'Varbotjärnen'
  },
  {
    id: '3',
    name: 'Cykling längs Slätta',
    description: 'Mysig cykeltur genom den vackra naturen',
    rating: 4.3,
    category: { id: 'aktiviteter', name: 'Aktiviteter', icon: '🎯' },
    coordinates: [15.4, 60.5],
    image: '', // Will be replaced by Unsplash API
    location: 'Slätta'
  },
  {
    id: '4',
    name: 'Carl Larsson-gården',
    description: 'Historisk gård med vacker arkitektur och trädgård',
    rating: 4.7,
    category: { id: 'boende', name: 'Boende', icon: '🏠' },
    coordinates: [15.7, 60.8],
    image: '', // Will be replaced by Unsplash API
    location: 'Carl Larsson-gården'
  },
  {
    id: '5',
    name: 'Högtäkt Restaurang',
    description: 'Lokal mat med fokus på svenska råvaror',
    rating: 4.2,
    category: { id: 'mat-dryck', name: 'Mat & dryck', icon: '🍽️' },
    coordinates: [15.3, 60.4],
    image: '', // Will be replaced by Unsplash API
    location: 'Högtäkt'
  },
  {
    id: '6',
    name: 'Stångtjärn Naturreservat',
    description: 'Oexploaterad natur med rik flora och fauna',
    rating: 4.9,
    category: { id: 'naturuppleviser', name: 'Naturuppleviser', icon: '🌲' },
    coordinates: [15.8, 60.9],
    image: '', // Will be replaced by Unsplash API
    location: 'Stångtjärn'
  },
  {
    id: '7',
    name: 'Varpan Vattensport',
    description: 'Kajak och kanot uthyrning vid Varpan',
    rating: 4.4,
    category: { id: 'utrustning-service', name: 'Utrustning & service', icon: '⚙️' },
    coordinates: [15.2, 60.3],
    image: '', // Will be replaced by Unsplash API
    location: 'Varpan'
  },
  {
    id: '8',
    name: 'Slogmyrloken Camping',
    description: 'Mysig campingplats mitt i naturen',
    rating: 4.6,
    category: { id: 'boende', name: 'Boende', icon: '🏠' },
    coordinates: [15.1, 60.2],
    image: '', // Will be replaced by Unsplash API
    location: 'Slogmyrloken'
  }
];

export const POPULAR_ACTIVITIES = MOCK_ACTIVITIES.slice(0, 4);
export const RECOMMENDED_ACTIVITIES = MOCK_ACTIVITIES.slice(4, 8);
