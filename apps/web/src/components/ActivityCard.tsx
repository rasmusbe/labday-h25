'use client';

import { Activity } from '@beactive/shared';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const renderImage = () => {
    if (imageError) {
      return (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Bild kommer snart</span>
        </div>
      );
    }

    return (
      <>
        {imageLoading && (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Laddar...</span>
          </div>
        )}
        <Image
          src={activity.image}
          alt={activity.name}
          fill
          className={`object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setImageLoading(false)}
          onError={() => setImageError(true)}
        />
      </>
    );
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        {renderImage()}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-black text-lg leading-tight mb-2">
          {activity.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {activity.description}
        </p>
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700">
            {activity.rating}
          </span>
        </div>

        {/* Rating Breakdown */}
        {activity.ratingBreakdown && (
          <div className="space-y-2">
            {[
              { stars: 5, value: activity.ratingBreakdown.fiveStars },
              { stars: 4, value: activity.ratingBreakdown.fourStars },
              { stars: 3, value: activity.ratingBreakdown.threeStars },
              { stars: 2, value: activity.ratingBreakdown.twoStars },
              { stars: 1, value: activity.ratingBreakdown.oneStar },
            ].map(({ stars, value }) => {
              const maxValue = Math.max(
                activity.ratingBreakdown!.fiveStars,
                activity.ratingBreakdown!.fourStars,
                activity.ratingBreakdown!.threeStars,
                activity.ratingBreakdown!.twoStars,
                activity.ratingBreakdown!.oneStar
              );
              const barWidth = (value / maxValue) * 100;

              return (
                <div key={stars} className="flex items-center gap-2">
                  <div className="flex items-center gap-1 min-w-[30px]">
                    <Star className="h-3 w-3 fill-gray-400 text-gray-400" />
                    <span className="text-xs text-gray-500">{stars}</span>
                  </div>
                  <div className="flex-1 relative">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-500 rounded-full transition-all duration-300"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
