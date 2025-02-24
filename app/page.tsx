'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import FilterModal from '@/components/FilterModal';
import { tours, Tour } from '@/data/tours';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';
import { FiHeart } from 'react-icons/fi';
import Image from 'next/image';

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredTours, setFilteredTours] = useState<Tour[]>(tours);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCart } = useCart();

  const handleFilters = (filters: any) => {
    let filtered = tours;

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(tour => 
        tour.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(tour => 
        tour.category === filters.category
      );
    }

    // Activities filter
    if (filters.activities.length > 0) {
      filtered = filtered.filter(tour => 
        filters.activities.some((activity: string) => 
          tour.activities.includes(activity)
        )
      );
    }

    // Price filter
    filtered = filtered.filter(tour => 
      tour.price <= filters.priceRange
    );

    setFilteredTours(filtered);
    setIsFilterOpen(false);
  };

  return (
    <main className="min-h-screen pt-16">
      <Navbar onMenuClick={() => setIsFilterOpen(true)} />
      
      <FilterModal 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleFilters}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <div key={tour.id} className="rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image 
                  src={tour.image} 
                  alt={tour.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {tour.discount && (
                  <div className="absolute top-4 left-4 bg-white rounded px-2 py-1">
                    {tour.discount}% OFF
                  </div>
                )}
                <button
                  onClick={() => {
                    isFavorite(tour.id) 
                      ? removeFromFavorites(tour.id)
                      : addToFavorites(tour);
                  }}
                  className={`absolute top-4 right-4 p-2 rounded-full ${
                    isFavorite(tour.id)
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-500'
                  }`}
                >
                  <FiHeart size={20} />
                </button>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400">★</span>
                  <span>{tour.rating}</span>
                  <span className="text-gray-500">({tour.reviews})</span>
                  <span className="text-gray-500 ml-auto">{tour.location}</span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{tour.title}</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 line-through">THB {tour.originalPrice}</span>
                    <span className="text-xl font-bold ml-2">THB {tour.price}</span>
                  </div>
                  <button 
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
                    onClick={() => addToCart(tour)}
                  >
                    Book now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
