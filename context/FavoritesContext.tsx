'use client';

import React, { createContext, useContext, useState } from 'react';
import { Tour } from '@/data/tours';

interface FavoritesContextType {
  favorites: Tour[];
  addToFavorites: (tour: Tour) => void;
  removeFromFavorites: (tourId: string) => void;
  isFavorite: (tourId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Tour[]>([]);

  const addToFavorites = (tour: Tour) => {
    setFavorites(prev => [...prev, tour]);
  };

  const removeFromFavorites = (tourId: string) => {
    setFavorites(prev => prev.filter(tour => tour.id !== tourId));
  };

  const isFavorite = (tourId: string) => {
    return favorites.some(tour => tour.id === tourId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
} 