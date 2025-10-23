'use client';

import Image from 'next/image';
import { useState } from 'react';

interface UnsplashImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
}

export default function UnsplashImage({ src, alt, className, fill, sizes }: UnsplashImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  if (imageError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500">Bild kommer snart</span>
      </div>
    );
  }

  return (
    <>
      {imageLoading && (
        <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
          <span className="text-gray-500">Laddar...</span>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={`${className} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        sizes={sizes}
        onLoad={() => setImageLoading(false)}
        onError={() => setImageError(true)}
      />
    </>
  );
}
