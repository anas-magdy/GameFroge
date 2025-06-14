// 'use client';

// import { createContext, useContext, useState, ReactNode, Key } from 'react';

// export interface Game {
//   id: Key | null | undefined;
//   title: string;
//   description: string;
//   rating: number;
//   price?: string;
//   imageUrl: string;
// }

// interface WishlistContextType {
//   wishlist: Game[];
//   addToWishlist: (game: Game) => void;
//   removeFromWishlist: (title: string) => void;
//   isWishlisted: (title: string) => boolean;
//   clearWishlist: () => void; 
// }

// const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// export const useWishlist = () => {
//   const context = useContext(WishlistContext);
//   if (!context) throw new Error('useWishlist must be used within WishlistProvider');
//   return context;
// };

// export const WishlistProvider = ({ children }: { children: ReactNode }) => {
//   const [wishlist, setWishlist] = useState<Game[]>([]);

//   const addToWishlist = (game: Game) => {
//     setWishlist((prev) =>
//       prev.some((item) => item.title === game.title) ? prev : [...prev, game]
//     );
//   };

//   const removeFromWishlist = (title: string) => {
//     setWishlist((prev) => prev.filter((game) => game.title !== title));
//   };

//   const isWishlisted = (title: string) => {
//     return wishlist.some((game) => game.title === title);
//   };

//   const clearWishlist = () => {
//     setWishlist([]);
//   };

//   return (
//     <WishlistContext.Provider
//       value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted, clearWishlist }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Game {
  id: number;
  title: string;
  description?: string;
  rating?: string | number;
  price?: string;
  imageUrl?: string;
}

interface WishlistContextType {
  wishlist: Game[];
  addToWishlist: (game: Game) => void;
  removeFromWishlist: (id: number) => void;
  isWishlisted: (id: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Game[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (game: Game) => {
    setWishlist((prev) => {
      if (!prev.find((g) => g.id === game.id)) {
        return [...prev, game];
      }
      return prev;
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((game) => game.id !== id));
  };

  const isWishlisted = (id: number) => {
    return wishlist.some((game) => game.id === id);
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

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
