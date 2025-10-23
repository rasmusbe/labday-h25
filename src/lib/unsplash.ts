import { createApi } from 'unsplash-js';

// Create Unsplash API instance
const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || 'your_unsplash_access_key',
});

// Search for images by query
export async function searchImages(query: string, count: number = 1) {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      perPage: count,
      orientation: 'landscape',
    });

    if (result.errors) {
      console.error('Unsplash API errors:', result.errors);
      return [];
    }

    return result.response?.results || [];
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error);
    return [];
  }
}

// Get a random image for a specific category
export async function getRandomImage(category: string) {
  try {
    const result = await unsplash.photos.getRandom({
      query: category,
      orientation: 'landscape',
    });

    if (result.errors) {
      console.error('Unsplash API errors:', result.errors);
      return null;
    }

    return result.response;
  } catch (error) {
    console.error('Error fetching random image from Unsplash:', error);
    return null;
  }
}

// Get images from Unsplash API
export async function getActivityImages() {
  const queries = [
    'rock climbing',
    'hiking trail',
    'mountain biking',
    'traditional house',
    'outdoor restaurant',
    'mountain landscape',
    'kayaking water',
    'camping tent',
    'adventure hiking'
  ];

  const images = [];

  for (const query of queries) {
    try {
      const result = await unsplash.search.getPhotos({
        query,
        perPage: 1,
        orientation: 'landscape',
      });

      if (result.response?.results?.[0]) {
        const photo = result.response.results[0];
        images.push({
          url: photo.urls.regular,
          alt: photo.alt_description || query,
        });
      } else {
        // If no results, skip this image
        console.warn(`No images found for query: ${query}`);
      }
    } catch (error) {
      console.error(`Error fetching image for ${query}:`, error);
      // Skip this image instead of using fallback
    }
  }

  return images;
}
