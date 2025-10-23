'use client';

import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-6 bg-white">
      {/* Logo */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-black">Go</span>
        <span className="text-2xl font-bold text-black">BeActive</span>
      </div>

      {/* Right side navigation */}
      <div className="flex items-center gap-4">
        {/* Language selector */}
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Globe className="h-5 w-5 text-black" />
        </button>

        {/* Login button */}
        <Button variant="outline" className="bg-white border-gray-300 text-black hover:bg-gray-50">
          Logga in
        </Button>
      </div>
    </header>
  );
}
