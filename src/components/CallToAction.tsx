'use client';

import { Button } from '@/components/ui/button';

export default function CallToAction() {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-8 lg:p-12 my-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Text content */}
          <div className="flex-1">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
              Exponera din verksamhet mot 250.000 aktiva äventyrare.
            </h2>
            <Button
              variant="outline"
              className="bg-white border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
            >
              Registrera dig gratis här
            </Button>
          </div>

          {/* Image placeholder */}
          <div className="flex-1">
            <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Bild kommer snart</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
