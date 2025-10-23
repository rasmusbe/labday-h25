'use client';

import { getActivityImages } from '../lib/unsplash';
import { useEffect, useState } from 'react';

interface UnsplashImage {
  url: string;
  alt: string;
}

export function useUnsplashImages() {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const fetchedImages = await getActivityImages();
        setImages(fetchedImages);
      } catch (err) {
        setError('Failed to fetch images from Unsplash');
        console.error('Error fetching images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return { images, loading, error };
}
