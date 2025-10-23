import CallToAction from '@/components/CallToAction';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import InteractiveMap from '@/components/InteractiveMap';
import UnsplashActivityCarousel from '@/components/UnsplashActivityCarousel';
import { POPULAR_ACTIVITIES, RECOMMENDED_ACTIVITIES } from '@/lib/mock-data';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />

        {/* Interactive Map Section */}
        <section className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <InteractiveMap />
          </div>
        </section>

        {/* Popular Activities Carousel */}
        <UnsplashActivityCarousel
          title="Populärt nära dig"
          activities={POPULAR_ACTIVITIES}
        />

        {/* Recommended Activities Carousel */}
        <UnsplashActivityCarousel
          title="Eftersom att du bokade klättring"
          activities={RECOMMENDED_ACTIVITIES}
        />

        {/* Call to Action */}
        <section className="px-6">
          <div className="max-w-6xl mx-auto">
            <CallToAction />
          </div>
        </section>
      </main>
    </div>
  );
}
