'use client';

import { generateActivitiesWithImages } from '../lib/mock-data';
import { Activity } from '../lib/types';
import { useEffect, useState } from 'react';

export function useActivitiesWithImages() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const activitiesWithImages = await generateActivitiesWithImages();
        setActivities(activitiesWithImages);
      } catch (err) {
        setError('Failed to fetch activities with images');
        console.error('Error fetching activities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activities, loading, error };
}
