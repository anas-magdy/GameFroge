'use client';
import { toast } from 'sonner';

import { useWishlist } from '../context/WishlistContext';
import GameCard from '../(components)/shared/GameCard';
import Link from 'next/link';
import SharedButton from '../(components)/shared/SharedButton';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-1">🎮 My Wishlist</h1>
            <p className="text-muted-foreground text-sm">
              Here are the games you've added to your wishlist.
            </p>
          </div>

          {wishlist.length > 0 && (
           <Button
  variant="outline"
  onClick={() => {
    clearWishlist();
    toast.success("Wishlist cleared");
  }}
  className="mt-4 sm:mt-0 hover:bg-destructive/10 hover:text-destructive gap-2 border-destructive"
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
            <p className="text-muted-foreground mb-6">
              Browse our collection and add games to your wishlist.
            </p>
            <Link href="/">
              <SharedButton label="Back to Games" showIcon={true} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((game) => (
              <GameCard
                key={game.title}
                {...game}
                wishIcon={false}
                deleteIcon={true}
                onWishlistToggle={() => removeFromWishlist(game.title)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
