import React from 'react';
import Link from 'next/link';
import { Gamepad2, Heart } from 'lucide-react';
import { Button } from '@/app/(components)/ui/button';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Game Store
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/games">
              <Button variant="ghost" className="gap-2">
                <Gamepad2 className="w-4 h-4" />
                Games
              </Button>
            </Link>
            <Link href="/watch-list">
              <Button variant="ghost" className="gap-2">
                <Heart className="w-4 h-4" />
                Wishlist
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
