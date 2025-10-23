import { Review } from '@/lib/types';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500 text-sm font-medium">
              {review.reviewerName.charAt(0)}
            </span>
          </div>
        </div>

        {/* Review Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-900">
              {review.reviewerName}
            </h4>
            <span className="text-xs text-gray-500">
              {formatDate(review.date)}
            </span>
          </div>

          {/* Star Rating */}
          <div className="flex items-center space-x-1 mb-3">
            {renderStars(review.rating)}
          </div>

          {/* Review Text */}
          <p className="text-sm text-gray-700 leading-relaxed">
            {review.comment}
          </p>
        </div>
      </div>
    </div>
  );
}

