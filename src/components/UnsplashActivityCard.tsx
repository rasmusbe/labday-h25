'use client';

import { Activity } from '@/lib/types';
import { Star } from 'lucide-react';
import UnsplashImage from './UnsplashImage';

interface UnsplashActivityCardProps {
  activity: Activity;
  unsplashImage?: string;
}

export default function UnsplashActivityCard({ activity, unsplashImage }: UnsplashActivityCardProps) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        {unsplashImage ? (
          <UnsplashImage
            src={unsplashImage}
            alt={activity.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Laddar bild...</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-black text-lg leading-tight">
            {activity.name}
          </h3>
          <div className="flex items-center gap-1 ml-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {activity.rating}
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-sm">
          {activity.description}
        </p>
      </div>
    </div>
  );
}
