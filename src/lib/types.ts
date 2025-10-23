export interface RatingBreakdown {
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
}

export interface Review {
  id: string;
  reviewerName: string;
  date: string;
  rating: number;
  comment: string;
  avatar?: string;
}

export interface ActivityFact {
  icon: string;
  label: string;
  value: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  rating: number;
  category: ActivityCategory;
  coordinates: [number, number]; // [longitude, latitude]
  image: string;
  location: string;
  ratingBreakdown?: RatingBreakdown;
  slug: string;
  reviews?: Review[];
  facts?: ActivityFact[];
}

export interface ActivityCategory {
  id: string;
  name: string;
  icon: string;
}

export const ACTIVITY_CATEGORIES: ActivityCategory[] = [
  { id: 'aktiviteter', name: 'Aktiviteter', icon: '🎯' },
  { id: 'boende', name: 'Boende', icon: '🏠' },
  { id: 'mat-dryck', name: 'Mat & dryck', icon: '🍽️' },
  { id: 'naturuppleviser', name: 'Naturuppleviser', icon: '🌲' },
  { id: 'utrustning-service', name: 'Utrustning & service', icon: '⚙️' },
];
