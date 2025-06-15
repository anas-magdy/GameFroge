
'use client';
import { fetshGameDetails } from '@/lib/data';
import Image from 'next/image';
import { 
  FaGamepad, FaCalendarAlt, FaUsers, 
  FaSteam, FaWindows, FaPlaystation, FaXbox, 
  FaHeart, FaRegHeart, FaStar, FaUser 
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
import { useParams } from 'next/navigation';

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

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export default  function GameDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  
  
  const [game, setGame] = useState<Game | null>(null);
  console.log(game)
  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState(false);

  // Sample reviews data
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      user: "GamerPro123",
      rating: 5,
      comment: "One of the best games I've played this year! The graphics are amazing and the gameplay is smooth.",
      date: "2023-05-15"
    },
    {
      id: 2,
      user: "GameCritic",
      rating: 4,
      comment: "Great story and characters, but the controls could be more responsive.",
      date: "2023-04-22"
    },
    {
      id: 3,
      user: "CasualPlayer",
      rating: 3,
      comment: "Fun game but gets repetitive after a while. Worth the price though.",
      date: "2023-03-10"
    }
  ]);

  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const data = await fetshGameDetails(id);
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!game) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="p-10 text-red-500 text-xl">Game not found</div>
      </motion.div>
    );
  }

  const handleWishlistToggle = () => {
    if (isWishlisted(game.id)) {
      removeFromWishlist(game.id);
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-8 sm:p-20 font-sans bg-background text-foreground"
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <motion.div variants={itemVariants} className="mb-6">
          <Link href="/games">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Games
            </Button>
          </Link>
        </motion.div>

        {/* Game Header */}
        <motion.div variants={itemVariants} className="relative rounded-xl overflow-hidden mb-8 h-96">
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            quality={100}
            className="object-cover opacity-70"
          
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
                <motion.span
                  key={index}
                  className="bg-muted px-3 py-1 rounded-full text-sm"
                  variants={itemVariants}
                >
                  {genre.trim()}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {game.description || game.short_description}
              </p>
            </motion.section>

            {/* Reviews Section */}
            <motion.section variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Player Reviews</h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <motion.div 
                    key={review.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-muted p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <FaUser className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{review.user}</h3>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < review.rating ? "text-yellow-400" : "text-muted-foreground/30"} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                    <p className="text-sm text-muted-foreground/70 mt-2">{review.date}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Screenshots */}
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
              {game.screenshots && game.screenshots.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                  variants={containerVariants}
                >
                  {game.screenshots.map((screenshot, index) => (
                    <motion.div
                      key={screenshot.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: index * 0.1 }}
                      className="aspect-video bg-muted rounded-lg overflow-hidden border"
                    >
                      <Image
                        src={screenshot.image}
                        alt={`${game.title} screenshot`}
                        width={400}
                        height={225}
                        className="object-cover w-full h-full"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-muted-foreground">No screenshots available</p>
              )}
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.a
              href={game.game_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-md w-full gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaGamepad />
              Play Now
            </motion.a>

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
              {isWishlisted(game.id) ? (
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
            <motion.div 
              className="bg-muted p-6 rounded-lg border"
              whileHover={{ y: -5 }}
            >
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
            </motion.div>

            {/* System Requirements */}
            {game.minimum_system_requirements && (
              <motion.div 
                className="bg-muted p-6 rounded-lg border"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold mb-4">System Requirements</h3>
                <ul className="space-y-3">
                  <li><span className="text-green-300">OS:</span> {game.minimum_system_requirements.os}</li>
                  <li><span className="text-green-300">Processor:</span> {game.minimum_system_requirements.processor}</li>
                  <li><span className="text-green-300">Memory:</span> {game.minimum_system_requirements.memory}</li>
                  <li><span className="text-green-300">Graphics:</span> {game.minimum_system_requirements.graphics}</li>
                  <li><span className="text-green-300">Storage:</span> {game.minimum_system_requirements.storage}</li>
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}