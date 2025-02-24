'use client';

import React, { createContext, useContext, useState } from 'react';
import { Tour } from '@/data/tours';

interface CartItem extends Tour {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (tour: Tour) => void;
  removeFromCart: (tourId: string) => void;
  updateQuantity: (tourId: string, quantity: number) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (tour: Tour) => {
    setItems(prev => {
      const exists = prev.find(item => item.id === tour.id);
      if (exists) {
        return prev.map(item =>
          item.id === tour.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...tour, quantity: 1 }];
    });
  };

  const removeFromCart = (tourId: string) => {
    setItems(prev => prev.filter(item => item.id !== tourId));
  };

  const updateQuantity = (tourId: string, quantity: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === tourId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 