'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useWishlist, Game } from '../context/WishlistContext';
import GameCard from '../(components)/shared/GameCard';
import { Button } from '@/app/(components)/ui/button';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { fetshAllData } from '@/lib/data';
import { Input } from '@/app/(components)/ui/input';

interface ApiGame {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

const ITEMS_PER_PAGE = 9;

export default function GamesPage() {
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const [currentPage, setCurrentPage] = useState(1);
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const data = await fetshAllData();

        // Transform the API data to match our Game interface
        const transformedData = data.map((game: ApiGame) => ({
          title: game.title,
          description: game.short_description,
          rating: 4.5, // API doesn't provide rating, using a default value
          imageUrl: game.thumbnail,
          price: 'Free to Play' // All games are free to play
        }));

        setGames(transformedData);
        setFilteredGames(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching games:', error);
        setError('Failed to fetch games. Please try again later.');
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Filter games based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGames(filtered);
    }
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchQuery, games]);

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGames = filteredGames.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen p-8 sm:p-20 font-sans bg-background text-foreground">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">All Games</h1>
          <div className="flex justify-center items-center h-64">
            <p>Loading games...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 sm:p-20 font-sans bg-background text-foreground">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">All Games</h1>
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 sm:p-20 font-sans bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">All Games</h1>
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentGames.map((game) => (
            <GameCard
              key={game.title}
              title={game.title}
              description={game.description}
              rating={game.rating}
              imageUrl={game.imageUrl}
              isWishlisted={isWishlisted(game.title)}
              onWishlistToggle={() =>
                isWishlisted(game.title)
                  ? removeFromWishlist(game.title)
                  : addToWishlist(game)
              }
            />
          ))}
        </div>

        {filteredGames.length > 0 && (
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
        )}

        {filteredGames.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No games found matching your search.</p>
          </div>
        )}
      </div>

    </div>
  );
}
