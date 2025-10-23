'use client';

import ActivitySidebar from '@/components/ActivitySidebar';
import FullScreenMap from '@/components/FullScreenMap';
import Header from '@/components/Header';
import SearchFilterBar from '@/components/SearchFilterBar';
import { MOCK_ACTIVITIES, Activity } from '@beactive/shared';
import { useMemo, useState } from 'react';

export default function ActivitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    aktivitet: null as string | null,
    prisniva: null as string | null,
    popularitet: null as string | null,
    sasong: null as string | null,
  });

  // Filter and search logic
  const filteredActivities = useMemo(() => {
    let filtered = MOCK_ACTIVITIES;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(activity =>
        activity.name.toLowerCase().includes(term) ||
        activity.description.toLowerCase().includes(term) ||
        activity.location.toLowerCase().includes(term)
      );
    }

    // Aktivitet filter
    if (activeFilters.aktivitet) {
      filtered = filtered.filter(activity =>
        activity.category.id === activeFilters.aktivitet
      );
    }

    // Popularitet filter (sort by rating)
    if (activeFilters.popularitet) {
      switch (activeFilters.popularitet) {
        case 'hoga':
          filtered = filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'populära':
          // Sort by rating breakdown (five stars count)
          filtered = filtered.sort((a, b) => {
            const aFiveStars = a.ratingBreakdown?.fiveStars || 0;
            const bFiveStars = b.ratingBreakdown?.fiveStars || 0;
            return bFiveStars - aFiveStars;
          });
          break;
        case 'nya':
          // For now, just reverse the order (newest first)
          filtered = filtered.reverse();
          break;
      }
    }

    return filtered;
  }, [searchTerm, activeFilters]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterType: string, value: string | null) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivity(activity);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content */}
      <div className="flex h-[calc(100vh-88px)]">
        {/* Sidebar */}
        <div className="w-full md:w-80 lg:w-96 flex flex-col">
          {/* Search and Filter Bar */}
          <div className="p-6 border-b border-gray-200 bg-white">
            <SearchFilterBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Activity List */}
          <div className="flex-1 overflow-hidden">
            <ActivitySidebar
              activities={filteredActivities}
              selectedActivity={selectedActivity}
              onActivitySelect={handleActivitySelect}
            />
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 hidden md:block">
          <FullScreenMap
            activities={filteredActivities}
            selectedActivity={selectedActivity}
            onActivitySelect={handleActivitySelect}
          />
        </div>
      </div>

      {/* Mobile Map (shown below sidebar on mobile) */}
      <div className="md:hidden">
        <div className="h-96">
          <FullScreenMap
            activities={filteredActivities}
            selectedActivity={selectedActivity}
            onActivitySelect={handleActivitySelect}
          />
        </div>
      </div>
    </div>
  );
}

