'use client';

import { createContext, useContext, useState, ReactNode, Key } from 'react';

export interface Game {
  id: Key | null | undefined;
  title: string;
  description: string;
  rating: number;
  price?: string;
  imageUrl: string;
}

interface WishlistContextType {
  wishlist: Game[];
  addToWishlist: (game: Game) => void;
  removeFromWishlist: (title: string) => void;
  isWishlisted: (title: string) => boolean;
  clearWishlist: () => void; 
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Game[]>([]);

  const addToWishlist = (game: Game) => {
    setWishlist((prev) =>
      prev.some((item) => item.title === game.title) ? prev : [...prev, game]
    );
  };

  const removeFromWishlist = (title: string) => {
    setWishlist((prev) => prev.filter((game) => game.title !== title));
  };

  const isWishlisted = (title: string) => {
    return wishlist.some((game) => game.title === title);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

