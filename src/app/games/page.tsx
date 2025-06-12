'use client';

import { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import GameCard from '../(components)/shared/GameCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample games data - in a real app, this would come from an API
const allGames = [
  {
    title: 'GTA V',
    description: 'Explore the criminal underworld of Los Santos.',
    rating: 4.7,
    imageUrl: '/image.png',
  },
  {
    title: 'Call of Duty',
    description: 'Engage in modern warfare with intense combat.',
    rating: 4.5,
    imageUrl: '/image.png',
  },
  {
    title: 'Cyberpunk 2077',
    description: 'Dive into a dystopian open-world future.',
    rating: 4.3,
    imageUrl: '/image.png',
  },
  {
    title: 'Mystery Game',
    description: 'A mysterious title with hidden gameplay.',
    rating: 4.0,
    imageUrl: '/image.png',
  },
  {
    title: 'GameX Alpha',
    description: 'A very long and detailed game description that tests layout wrapping and overflow.',
    rating: 4.2,
    imageUrl: '/image.png',
  },
  {
    title: 'Racing Master',
    description: 'Experience high-speed racing action.',
    rating: 4.6,
    imageUrl: '/image.png',
  },
  {
    title: 'Space Explorer',
    description: 'Journey through the vast universe.',
    rating: 4.4,
    imageUrl: '/image.png',
  },
  {
    title: 'Medieval Quest',
    description: 'Embark on an epic medieval adventure.',
    rating: 4.1,
    imageUrl: '/image.png',
  },
];

const ITEMS_PER_PAGE = 6;

export default function GamesPage() {
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allGames.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGames = allGames.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen p-8 sm:p-20 font-sans bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Games</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentGames.map((game) => (
            <GameCard
              key={game.title}
              {...game}
              isWishlisted={isWishlisted(game.title)}
              onWishlistToggle={() =>
                isWishlisted(game.title)
                  ? removeFromWishlist(game.title)
                  : addToWishlist(game)
              }
            />
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
