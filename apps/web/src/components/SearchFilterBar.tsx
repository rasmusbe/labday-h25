'use client';

import { Button, Input } from '@beactive/ui';
import { Search } from 'lucide-react';

interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeFilters: {
    aktivitet: string | null;
    prisniva: string | null;
    popularitet: string | null;
    sasong: string | null;
  };
  onFilterChange: (filterType: string, value: string | null) => void;
}

export default function SearchFilterBar({
  searchTerm,
  onSearchChange,
  activeFilters,
  onFilterChange,
}: SearchFilterBarProps) {
  const filterOptions = {
    aktivitet: [
      { value: 'aktiviteter', label: 'Aktiviteter' },
      { value: 'boende', label: 'Boende' },
      { value: 'mat-dryck', label: 'Mat & dryck' },
      { value: 'naturuppleviser', label: 'Naturuppleviser' },
      { value: 'utrustning-service', label: 'Utrustning & service' },
    ],
    prisniva: [
      { value: 'gratis', label: 'Gratis' },
      { value: 'billigt', label: 'Billigt' },
      { value: 'medel', label: 'Medel' },
      { value: 'dyrt', label: 'Dyrt' },
    ],
    popularitet: [
      { value: 'hoga', label: 'Höga betyg' },
      { value: 'populära', label: 'Populära' },
      { value: 'nya', label: 'Nya' },
    ],
    sasong: [
      { value: 'vinter', label: 'Vinter' },
      { value: 'var', label: 'Vår' },
      { value: 'sommar', label: 'Sommar' },
      { value: 'host', label: 'Höst' },
    ],
  };

  const handleFilterClick = (filterType: string, value: string) => {
    const currentValue = activeFilters[filterType as keyof typeof activeFilters];
    const newValue = currentValue === value ? null : value;
    onFilterChange(filterType, newValue);
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Sök aktiviteter eller platser"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-black focus:ring-black"
        />
      </div>

      {/* Filter Buttons */}
      <div className="space-y-3">
        {/* Aktivitet Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Aktivitet</h3>
          <div className="flex flex-wrap gap-2">
            {filterOptions.aktivitet.map((option) => (
              <Button
                key={option.value}
                variant={activeFilters.aktivitet === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterClick('aktivitet', option.value)}
                className={`text-xs ${
                  activeFilters.aktivitet === option.value
                    ? "bg-black text-white"
                    : "bg-white text-black border-gray-300 hover:bg-gray-50"
                }`}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Prisnivå Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Prisnivå</h3>
          <div className="flex flex-wrap gap-2">
            {filterOptions.prisniva.map((option) => (
              <Button
                key={option.value}
                variant={activeFilters.prisniva === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterClick('prisniva', option.value)}
                className={`text-xs ${
                  activeFilters.prisniva === option.value
                    ? "bg-black text-white"
                    : "bg-white text-black border-gray-300 hover:bg-gray-50"
                }`}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Popularitet Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Popularitet</h3>
          <div className="flex flex-wrap gap-2">
            {filterOptions.popularitet.map((option) => (
              <Button
                key={option.value}
                variant={activeFilters.popularitet === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterClick('popularitet', option.value)}
                className={`text-xs ${
                  activeFilters.popularitet === option.value
                    ? "bg-black text-white"
                    : "bg-white text-black border-gray-300 hover:bg-gray-50"
                }`}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Säsong Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Säsong</h3>
          <div className="flex flex-wrap gap-2">
            {filterOptions.sasong.map((option) => (
              <Button
                key={option.value}
                variant={activeFilters.sasong === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterClick('sasong', option.value)}
                className={`text-xs ${
                  activeFilters.sasong === option.value
                    ? "bg-black text-white"
                    : "bg-white text-black border-gray-300 hover:bg-gray-50"
                }`}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

