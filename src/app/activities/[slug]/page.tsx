'use client';

import RatingBreakdown from '@/components/RatingBreakdown';
import ReviewCard from '@/components/ReviewCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { generateActivitiesWithImages } from '@/lib/mock-data';
import { Activity, getActivityBySlug } from '@/lib/utils';
import { Heart, MapPin, Share2, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ActivityDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const activities = await generateActivitiesWithImages();
        const foundActivity = getActivityBySlug(activities, slug);
        setActivity(foundActivity || null);
      } catch (error) {
        console.error('Error loading activity:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadActivity();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Laddar aktivitet...</p>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Aktivitet hittades inte</h1>
          <p className="text-gray-600 mb-6">Den begärda aktiviteten kunde inte hittas.</p>
          <Link href="/">
            <Button>Gå tillbaka till startsidan</Button>
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'Om aktiviteten' },
    { id: 'images', label: 'Bilder' },
    { id: 'facts', label: 'Fakta' },
    { id: 'reviews', label: 'Recensioner' },
    { id: 'location', label: 'Hitta hit' },
    { id: 'shop', label: 'Shop' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % 1); // Only one image for now
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + 1) % 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Hem</Link>
            <span>/</span>
            <Link href="/activities" className="hover:text-gray-700">Aktivitet</Link>
            <span>/</span>
            <span className="text-gray-900">Hitta din</span>
            <span>/</span>
            <span className="text-gray-900">{activity.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image Gallery */}
            <div className="relative mb-8">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <Image
                  src={activity.image}
                  alt={activity.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20" />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h1 className="text-3xl font-bold mb-2">{activity.name}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{activity.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{activity.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mb-8">
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Om aktiviteten</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {activity.description}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'images' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Bilder</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="aspect-square relative overflow-hidden rounded-lg">
                      <Image
                        src={activity.image}
                        alt={activity.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Fler bilder kommer snart</span>
                    </div>
                    <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Fler bilder kommer snart</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'facts' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Fakta</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activity.facts?.map((fact, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="text-2xl">{fact.icon}</div>
                        <div>
                          <h3 className="font-medium text-gray-900">{fact.label}</h3>
                          <p className="text-gray-600">{fact.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Recensioner</h2>
                  {activity.ratingBreakdown && (
                    <div className="mb-8">
                      <RatingBreakdown ratingBreakdown={activity.ratingBreakdown} />
                    </div>
                  )}
                  <div className="space-y-4">
                    {activity.reviews?.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'location' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Hitta hit</h2>
                  <div className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Karta kommer snart</span>
                  </div>
                  <div className="bg-white p-6 rounded-lg border">
                    <h3 className="font-medium text-gray-900 mb-2">Adress</h3>
                    <p className="text-gray-600">{activity.location}</p>
                  </div>
                </div>
              )}

              {activeTab === 'shop' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Shop</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                      <Card key={item} className="overflow-hidden">
                        <div className="aspect-video bg-gray-200" />
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 mb-2">Produkt {item}</h3>
                          <p className="text-gray-600 text-sm mb-3">Beskrivning av produkt</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-lg">299 kr</span>
                            <Button size="sm">Lägg till</Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Booking Card */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Boka aktivitet</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aktivitet
                    </label>
                    <Input value={activity.name} readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Antal personer
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>1 person</option>
                      <option>2 personer</option>
                      <option>3 personer</option>
                      <option>4 personer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Antal aktivitet
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>1 aktivitet</option>
                      <option>2 aktiviteter</option>
                      <option>3 aktiviteter</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Förfrågan
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md h-20"
                      placeholder="Skriv din förfrågan här..."
                    />
                  </div>
                  <Button className="w-full">Skicka förfrågan</Button>
                </div>
              </Card>

              {/* Advertisement Banner */}
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="font-medium text-blue-900 mb-2">Reklam</h3>
                <p className="text-blue-700 text-sm">Annonsplats för relevanta produkter eller tjänster</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

