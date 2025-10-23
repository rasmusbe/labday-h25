'use client';

import { Button } from '@beactive/ui';
import { Globe, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-6 bg-white">
      {/* Logo */}
      <Link href="/" className="flex flex-col">
        <span className="text-sm font-medium text-black">Go</span>
        <span className="text-2xl font-bold text-black">BeActive</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          href="/activities"
          className="text-black hover:text-gray-600 transition-colors font-medium"
        >
          Sök aktiviteter
        </Link>
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

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-black" />
          ) : (
            <Menu className="h-5 w-5 text-black" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
          <div className="p-4 space-y-4">
            <Link
              href="/"
              className="block text-black hover:text-gray-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hem
            </Link>
            <Link
              href="/activities"
              className="block text-black hover:text-gray-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sök aktiviteter
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
