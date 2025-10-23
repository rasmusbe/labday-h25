'use client';

import { Activity } from '@/lib/types';
import { useEffect, useRef } from 'react';

// Import Mapbox GL CSS
import 'mapbox-gl/dist/mapbox-gl.css';

declare global {
  interface Window {
    mapboxgl: any;
  }
}

interface FullScreenMapProps {
  activities: Activity[];
}

export default function FullScreenMap({
  activities
}: FullScreenMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markers = useRef<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.mapboxgl) {
      // Dynamically import Mapbox GL
      import('mapbox-gl').then((mapboxgl) => {
        window.mapboxgl = mapboxgl.default;
        initializeMap();
      });
    } else if (window.mapboxgl) {
      initializeMap();
    }
  }, []);

  const initializeMap = () => {
    if (!mapContainer.current || !window.mapboxgl) return;

    const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';

    window.mapboxgl.accessToken = mapboxAccessToken;

    map.current = new window.mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [15.5, 60.6], // Center on Sweden
      zoom: 8
    });

    map.current.on('load', () => {
      updateMarkers();
    });
  };

  const updateMarkers = () => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    activities.forEach((activity) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url('data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="12" fill="#666" stroke="#fff" stroke-width="2"/>
          <text x="15" y="20" text-anchor="middle" fill="white" font-size="12" font-family="Arial">${activity.category.icon}</text>
        </svg>
      `)}')`;
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.cursor = 'pointer';
      el.style.borderRadius = '50%';
      el.style.border = 'none';

      const marker = new window.mapboxgl.Marker(el)
        .setLngLat(activity.coordinates)
        .addTo(map.current);

      markers.current.push(marker);
    });

    // Fit map to show all activities
    if (activities.length > 0) {
      const bounds = new window.mapboxgl.LngLatBounds();
      activities.forEach(activity => {
        bounds.extend(activity.coordinates);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  };

  // Update markers when activities change
  useEffect(() => {
    if (map.current) {
      updateMarkers();
    }
  }, [activities]);

  return (
    <div className="flex-1 h-full relative">
      <div
        ref={mapContainer}
        className="w-full h-full"
      />

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => {
            if (map.current) {
              map.current.zoomIn();
            }
          }}
          className="bg-white border border-gray-300 rounded-lg p-2 shadow-md hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button
          onClick={() => {
            if (map.current) {
              map.current.zoomOut();
            }
          }}
          className="bg-white border border-gray-300 rounded-lg p-2 shadow-md hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

