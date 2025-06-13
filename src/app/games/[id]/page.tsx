
'use client';

import { fetshGameDetails } from '@/lib/data';
import Image from 'next/image';
import { 
  FaGamepad, FaCalendarAlt, FaUsers, 
  FaSteam, FaWindows, FaPlaystation, FaXbox, 
  FaHeart, FaRegHeart 
} from 'react-icons/fa';
import { Button } from '@/app/(components)/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Key } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useWishlist } from '@/app/context/WishlistContext';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Game {
  id: number;
  title: string;
  description: string;
  short_description: string;
  thumbnail: string;
  status: string;
  platform: string;
  genre: string;
  release_date: string;
  developer: string;
  publisher: string;
  game_url: string;
  screenshots?: {
    id: Key;
    image: string | StaticImport;
  }[];
  minimum_system_requirements?: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}

export default function GameDetailsPage({ params }: { params: { id: number } }) {
  const { id } = params; 
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState(false);

  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

useEffect(() => {
  const fetchGame = async () => {
    try {
      const data = await fetshGameDetails(id); // استخدم id هنا
      setGame(data);
    } catch (error) {
      console.error("Error fetching game:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchGame();
}, [id]);
  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!game) {
    return <div className="p-10 text-red-500">Game not found</div>;
  }

  const handleWishlistToggle = () => {
    if (isWishlisted(game.title)) {
      removeFromWishlist(game.title);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        title: game.title,
        description: game.short_description || game.description,
        rating: 0,
        imageUrl: game.thumbnail,
        id: game.id
      });
      toast.success("Added to wishlist");
    }

    setAnimation(true);
    setTimeout(() => setAnimation(false), 500);
  };

  const platformIcons = {
    pc: <FaWindows className="text-blue-600" />,
    steam: <FaSteam className="text-gray-800" />,
    playstation: <FaPlaystation className="text-blue-800" />,
    xbox: <FaXbox className="text-green-600" />
  };

  return (
    <div className="min-h-screen p-8 sm:p-20 font-sans bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/games">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Games
            </Button>
          </Link>
        </div>

        {/* Game Header */}
        <div className="relative rounded-xl overflow-hidden mb-8 h-96">
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              {game.platform.toLowerCase().includes("pc") && platformIcons.pc}
              {game.platform.toLowerCase().includes("steam") && platformIcons.steam}
              {game.platform.toLowerCase().includes("playstation") && platformIcons.playstation}
              {game.platform.toLowerCase().includes("xbox") && platformIcons.xbox}
              <span className="bg-green-600 text-xs font-bold px-3 py-1 rounded-full text-white">
                {game.status || "Available"}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{game.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {game.genre.split(",").map((genre: string, index: Key) => (
                <span
                  key={index}
                  className="bg-muted px-3 py-1 rounded-full text-sm"
                >
                  {genre.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {game.description || game.short_description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
              {game.screenshots && game.screenshots.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {game.screenshots.map((screenshot: { id: Key; image: string | StaticImport }) => (
                    <div
                      key={screenshot.id}
                      className="aspect-video bg-muted rounded-lg overflow-hidden border"
                    >
                      <Image
                        src={screenshot.image}
                        alt={`${game.title} screenshot`}
                        width={400}
                        height={225}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No screenshots available</p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <a
              href={game.game_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-md w-full gap-2"
            >
              <FaGamepad />
              Play Now
            </a>

            {/* Wishlist Button */}
            <motion.button
              onClick={handleWishlistToggle}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors w-full"
              whileTap={{ scale: 0.95 }}
              animate={
                animation
                  ? { scale: [1, 1.1, 1], transition: { duration: 0.3 } }
                  : {}
              }
            >
              {isWishlisted(game.title) ? (
                <>
                  <FaHeart className="text-red-500" />
                  <span>In Wishlist</span>
                </>
              ) : (
                <>
                  <FaRegHeart />
                  <span>Add to Wishlist</span>
                </>
              )}
            </motion.button>

            {/* Game Details */}
            <div className="bg-muted p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Details</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FaCalendarAlt className="mt-1 text-primary" />
                  <div>
                    <span className="block text-sm text-muted-foreground">
                      Release Date
                    </span>
                    <span>{game.release_date}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaUsers className="mt-1 text-primary" />
                  <div>
                    <span className="block text-sm text-muted-foreground">
                      Developer
                    </span>
                    <span>{game.developer}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaUsers className="mt-1 text-primary" />
                  <div>
                    <span className="block text-sm text-muted-foreground">
                      Publisher
                    </span>
                    <span>{game.publisher}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* System Requirements */}
            {game.minimum_system_requirements && (
              <div className="bg-muted p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">System Requirements</h3>
                <ul className="space-y-3">
                  <li><span className="text-green-300">OS:</span> {game.minimum_system_requirements.os}</li>
                  <li><span className="text-green-300">Processor:</span> {game.minimum_system_requirements.processor}</li>
                  <li><span className="text-green-300">Memory:</span> {game.minimum_system_requirements.memory}</li>
                  <li><span className="text-green-300">Graphics:</span> {game.minimum_system_requirements.graphics}</li>
                  <li><span className="text-green-300">Storage:</span> {game.minimum_system_requirements.storage}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
