import { useState } from 'react';
import { FiMenu, FiHeart, FiShoppingCart, FiUser } from 'react-icons/fi';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';
import FavoritesModal from './FavoritesModal';
import CartModal from './CartModal';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { favorites } = useFavorites();
  const { items } = useCart();
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onMenuClick} className="p-2">
              <FiMenu size={24} />
            </button>
            <Image 
              src="/logo.svg" 
              alt="Logo" 
              width={32} 
              height={32} 
              priority
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 relative" onClick={() => setIsFavoritesOpen(true)}>
              <FiHeart size={24} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
            <button className="p-2 relative" onClick={() => setIsCartOpen(true)}>
              <FiShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
            {session ? (
              <button 
                className="p-2"
                onClick={() => signOut()}
              >
                <FiUser size={24} />
              </button>
            ) : (
              <button 
                className="p-2"
                onClick={() => signIn()}
              >
                <FiUser size={24} />
              </button>
            )}
          </div>
        </div>
      </nav>

      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Navbar; 