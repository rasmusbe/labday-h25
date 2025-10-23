'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function HeroSection() {
	return (
		<section className='px-6 py-8'>
			<div className='max-w-6xl mx-auto'>
				<div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8'>
					{/* Hero text */}
					<div className='flex-1'>
						<h1 className='text-4xl lg:text-6xl font-bold text-black mb-8'>Här börjar äventyret.</h1>
					</div>

					{/* Search bar */}
					<div className='flex-1 max-w-md'>
						<div className='relative'>
							<Input placeholder='Sök aktiviteter eller platser' className='w-full h-12 pr-12 text-lg border-gray-300 focus:border-black focus:ring-black' aria-label='Sök aktiviteter eller platser' />
							<Search className='absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
