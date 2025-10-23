'use client';

import { useUnsplashImages } from '@/hooks/useUnsplashImages';
import { Activity } from '@/lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import UnsplashActivityCard from './UnsplashActivityCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface UnsplashActivityCarouselProps {
  title: string;
  activities: Activity[];
}

export default function UnsplashActivityCarousel({ title, activities }: UnsplashActivityCarouselProps) {
  const { images, loading } = useUnsplashImages();

  return (
    <section className="py-8">
      <div className="px-6">
        <h2 className="text-2xl font-bold text-black mb-6">{title}</h2>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="pb-4"
          >
            {activities.map((activity, index) => (
              <SwiperSlide key={activity.id}>
                <UnsplashActivityCard
                  activity={activity}
                  unsplashImage={images[index]?.url}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation buttons */}
          <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronLeft className="h-4 w-4 text-black" />
          </button>
          <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronRight className="h-4 w-4 text-black" />
          </button>
        </div>
      </div>
    </section>
  );
}
