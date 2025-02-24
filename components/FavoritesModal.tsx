'use client';

import { useFavorites } from '@/context/FavoritesContext';
import { FiX } from 'react-icons/fi';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const { favorites, removeFromFavorites } = useFavorites();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full h-full md:w-[400px] p-6 overflow-y-auto ml-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Favoriler</h2>
          <button onClick={onClose} className="p-2">
            <FiX size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {favorites.map(tour => (
            <div key={tour.id} className="flex gap-4 border-b pb-4">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{tour.title}</h3>
                <p className="text-gray-600">{tour.location}</p>
                <p className="text-primary font-bold">THB {tour.price}</p>
                <button
                  onClick={() => removeFromFavorites(tour.id)}
                  className="text-red-500 text-sm"
                >
                  Favorilerden Kaldır
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 