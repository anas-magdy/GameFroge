import { fetshGameDetails } from '@/lib/data';
import Image from 'next/image';
import { FaGamepad, FaCalendarAlt, FaUsers, FaSteam, FaWindows, FaPlaystation, FaXbox } from 'react-icons/fa';
import { Button } from '@/app/(components)/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Key } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export default async function GameDetailsPage({ params }: { params: { id: number } }) {
  const game = await fetshGameDetails(params.id);

  if (!game) {
    return <div className="p-10 text-red-500">Game not found</div>;
  }

  // Platform icons mapping
  const platformIcons = {
    pc: <FaWindows className="text-blue-600" />,
    steam: <FaSteam className="text-gray-800" />,
    playstation: <FaPlaystation className="text-blue-800" />,
    xbox: <FaXbox className="text-green-600" />
  };

  return (
    <div className="min-h-screen p-8 sm:p-20 font-sans bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb or Back Button */}
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
              {game.platform.toLowerCase().includes("steam") &&
                platformIcons.steam}
              {game.platform.toLowerCase().includes("playstation") &&
                platformIcons.playstation}
              {game.platform.toLowerCase().includes("xbox") &&
                platformIcons.xbox}
              <span className="bg-green-600 text-xs font-bold px-3 py-1 rounded-full text-white">
                {game.status || "Available"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {game.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {game.genre
                .split(",")
                .map((genre: string, index: Key | null | undefined) => (
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

        {/* Game Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {game.description || game.short_description}
              </p>
            </section>

            {/* Screenshots */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
              {game.screenshots && game.screenshots.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {game.screenshots.map(
                    (screenshot: {
                      id: Key | null | undefined;
                      image: string | StaticImport;
                    }) => (
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
                    )
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No screenshots available
                </p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Play Button */}
            <a
              href={game.game_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-md w-full gap-2"
            >
              <FaGamepad />
              Play Now
            </a>

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
                <h3 className="text-xl font-semibold mb-4">
                  System Requirements
                </h3>
                <ul className="space-y-3">
                  <li>
                    <span className=" text-green-300">OS :</span>{" "}
                    {game.minimum_system_requirements.os}
                  </li>
                  <li>
                    <span className=" text-green-300">Processor :</span>{" "}
                    {game.minimum_system_requirements.processor}
                  </li>
                  <li>
                    <span className=" text-green-300">Memory :</span>{" "}
                    {game.minimum_system_requirements.memory}
                  </li>
                  <li>
                    <span className=" text-green-300">Graphics :</span>{" "}
                    {game.minimum_system_requirements.graphics}
                  </li>
                  <li>
                    <span className=" text-green-300">Storage :</span>{" "}
                    {game.minimum_system_requirements.storage}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}
