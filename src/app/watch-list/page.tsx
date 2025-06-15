'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

import { useWishlist } from '../context/WishlistContext';
import GameCard from '../(components)/shared/GameCard';
import SharedButton from '../(components)/shared/SharedButton';
import { Button } from '@/app/(components)/ui/button';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-1">🎮 My Wishlist</h1>
            <p className="text-muted-foreground text-sm">Games you&aposve added to your wishlist.</p>
          </div>

          {wishlist.length > 0 && (
            <Button
              variant="outline"
              onClick={() => {
                clearWishlist();
                toast.success('Wishlist cleared');
              }}
              className="mt-4 sm:mt-0 gap-2 border-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-4xl mb-4">🫙</p>
            <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Browse and add games to your wishlist.</p>
            <Link href="/">
              <SharedButton label="Back to Games" showIcon />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((game) => (
              <GameCard
                key={game.id}
                {...game}
                wishIcon={false}
                deleteIcon
                onWishlistToggle={() => {
                  removeFromWishlist(game.id);
                  toast.success(`${game.title} removed from wishlist`);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
