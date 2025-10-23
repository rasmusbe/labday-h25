'use client';

import { Activity } from '@beactive/shared';
import ActivityCard from './ActivityCard';

interface ActivitySidebarProps {
  activities: Activity[];
  selectedActivity: Activity | null;
  onActivitySelect: (activity: Activity) => void;
  loading?: boolean;
}

export default function ActivitySidebar({
  activities,
  selectedActivity,
  onActivitySelect,
  loading = false,
}: ActivitySidebarProps) {

  if (loading) {
    return (
      <div className="w-full md:w-80 lg:w-96 h-full bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="w-full md:w-80 lg:w-96 h-full bg-white border-r border-gray-200 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Inga aktiviteter hittades</h3>
            <p className="text-gray-500 text-sm">
              Prova att ändra dina sökfilter eller söktermer
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-80 lg:w-96 h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-black mb-2">
          Här börjar äventyret.
        </h2>
        <p className="text-sm text-gray-600">
          {activities.length} aktivitet{activities.length !== 1 ? 'er' : ''} hittades
        </p>
      </div>

      {/* Activity Cards */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              onClick={() => onActivitySelect(activity)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedActivity?.id === activity.id
                  ? 'ring-2 ring-black ring-opacity-20'
                  : 'hover:shadow-md'
              }`}
            >
              <ActivityCard activity={activity} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
