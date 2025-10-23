'use client';

import { Star } from 'lucide-react';

import { RatingBreakdown as RatingBreakdownType } from '@/lib/types';

interface RatingBreakdownProps {
  ratingBreakdown: RatingBreakdownType;
}

export default function RatingBreakdown({ ratingBreakdown }: RatingBreakdownProps) {
  const formatRating = (rating: number) => {
    return rating.toFixed(1).replace('.', ',');
  };

  const getBarWidth = (value: number) => {
    const maxValue = Math.max(
      ratingBreakdown.fiveStars,
      ratingBreakdown.fourStars,
      ratingBreakdown.threeStars,
      ratingBreakdown.twoStars,
      ratingBreakdown.oneStar
    );
    return (value / maxValue) * 100;
  };

  // Calculate overall rating from breakdown
  const calculateOverallRating = () => {
    const totalRatings = ratingBreakdown.fiveStars + ratingBreakdown.fourStars +
                        ratingBreakdown.threeStars + ratingBreakdown.twoStars +
                        ratingBreakdown.oneStar;

    if (totalRatings === 0) return 0;

    const weightedSum = (ratingBreakdown.fiveStars * 5) +
                       (ratingBreakdown.fourStars * 4) +
                       (ratingBreakdown.threeStars * 3) +
                       (ratingBreakdown.twoStars * 2) +
                       (ratingBreakdown.oneStar * 1);

    return weightedSum / totalRatings;
  };

  const starRows = [
    { stars: 5, value: ratingBreakdown.fiveStars },
    { stars: 4, value: ratingBreakdown.fourStars },
    { stars: 3, value: ratingBreakdown.threeStars },
    { stars: 2, value: ratingBreakdown.twoStars },
    { stars: 1, value: ratingBreakdown.oneStar },
  ];

  const overallRating = calculateOverallRating();

  return (
    <div className="bg-white text-black p-6 rounded-lg border border-gray-200">
      {/* Overall Rating Section */}
      <div className="flex items-center gap-3 mb-6">
        <Star className="h-8 w-8 fill-gray-600 text-gray-600" />
        <span className="text-4xl font-bold text-gray-600">
          {formatRating(overallRating)}
        </span>
      </div>

      {/* Rating Breakdown */}
      <div className="space-y-3">
        {starRows.map(({ stars, value }) => (
          <div key={stars} className="flex items-center gap-3">
            {/* Star and Number */}
            <div className="flex items-center gap-2 min-w-[60px]">
              <Star className="h-4 w-4 fill-gray-600 text-gray-600" />
              <span className="text-sm text-gray-600 font-medium">{stars}</span>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 relative">
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-600 rounded-full transition-all duration-300"
                  style={{ width: `${getBarWidth(value)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
