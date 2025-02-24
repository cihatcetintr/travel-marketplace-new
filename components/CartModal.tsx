'use client';

import { useCart } from '@/context/CartContext';
import { FiX, FiPlus, FiMinus } from 'react-icons/fi';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full h-full md:w-[400px] p-6 overflow-y-auto ml-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Sepet</h2>
          <button onClick={onClose} className="p-2">
            <FiX size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 border-b pb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.location}</p>
                <p className="text-primary font-bold">THB {item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1"
                  >
                    <FiMinus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1"
                  >
                    <FiPlus size={16} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm ml-auto"
                  >
                    Kaldır
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Toplam</span>
              <span>THB {total}</span>
            </div>
            <button className="w-full bg-primary text-white py-2 rounded mt-4">
              Ödemeye Geç
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 