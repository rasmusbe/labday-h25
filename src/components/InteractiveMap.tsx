'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MOCK_ACTIVITIES } from '@/lib/mock-data';
import { Activity, ACTIVITY_CATEGORIES } from '@/lib/types';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Import Mapbox GL CSS
import 'mapbox-gl/dist/mapbox-gl.css';

declare global {
	interface Window {
		mapboxgl: any;
	}
}

interface InteractiveMapProps {
	onActivitySelect?: (activity: Activity) => void;
}

export default function InteractiveMap({ onActivitySelect }: InteractiveMapProps) {
	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<any>(null);
	const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string>('aktiviteter');

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
			zoom: 8,
		});

		map.current.on('load', () => {
			addMarkers();
		});
	};

	const addMarkers = () => {
		if (!map.current) return;

		MOCK_ACTIVITIES.forEach((activity) => {
			const el = document.createElement('div');
			el.className = 'marker';
			el.style.backgroundImage = `url('data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="12" fill="#000" stroke="#fff" stroke-width="2"/>
          <text x="15" y="20" text-anchor="middle" fill="white" font-size="12" font-family="Arial">${activity.category.icon}</text>
        </svg>
      `)}')`;
			el.style.width = '30px';
			el.style.height = '30px';
			el.style.cursor = 'pointer';

			el.addEventListener('click', () => {
				setSelectedActivity(activity);
				onActivitySelect?.(activity);
			});

			new window.mapboxgl.Marker(el).setLngLat(activity.coordinates).addTo(map.current);
		});
	};

	const filteredActivities = MOCK_ACTIVITIES.filter((activity) => activity.category.id === selectedCategory);

	return (
		<div className='w-full'>
			{/* Map container */}
			<div className='relative'>
				<div ref={mapContainer} className='w-full h-96 lg:h-[500px] rounded-lg' />

				{/* Expand map button */}
				<Button className='absolute top-4 right-4 bg-white border border-gray-300 text-black hover:bg-gray-50' aria-label='Öppna stor karta'>
					Stor karta
				</Button>

				{/* Activity popup */}
				{selectedActivity && (
					<Card className='absolute top-4 left-4 max-w-sm bg-white border border-gray-200 shadow-lg'>
						<div className='aspect-video relative overflow-hidden rounded-t-lg'>
							<Image src={selectedActivity.image} alt={selectedActivity.name} fill className='object-cover' sizes='(max-width: 768px) 100vw, 400px' />
						</div>
						<div className='p-4'>
							<div className='flex items-start justify-between mb-2'>
								<h3 className='font-semibold text-black text-lg leading-tight'>{selectedActivity.name}</h3>
								<div className='flex items-center gap-1 ml-2'>
									<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' aria-hidden='true' />
									<span className='text-sm font-medium text-gray-700'>{selectedActivity.rating} av 5 stjärnor</span>
								</div>
							</div>
							<p className='text-gray-600 text-sm'>{selectedActivity.description}</p>
						</div>
					</Card>
				)}
			</div>

			{/* Category filters */}
			<div className='mt-6 flex gap-2 overflow-x-auto pb-2'>
				{ACTIVITY_CATEGORIES.map((category) => (
					<Button
						key={category.id}
						variant={selectedCategory === category.id ? 'default' : 'outline'}
						className={`whitespace-nowrap ${selectedCategory === category.id ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-50'}`}
						onClick={() => setSelectedCategory(category.id)}
					>
						{category.name}
					</Button>
				))}
			</div>
		</div>
	);
}
