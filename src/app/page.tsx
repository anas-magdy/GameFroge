"use client";
import { useState, useEffect } from "react";
import SharedButton from "./(components)/shared/SharedButton";
import VideoWithPlayButton from "./(components)/VideoWithPlayButton";
import ServicesSlider from "./(components)/ServicesSlider";
import HowWeWorkVideo from "./(components)/HowWeWorkVideo";
import { allGames } from "../lib/data";
import { Game, useWishlist } from "./context/WishlistContext";
import { Heart } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

const slides = [
  {
    image: "https://www.cairo24.com/Upload/libfiles/79/4/940.jpg",
    title: "Art Is Our Game",
    desc: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nulla Et Nisi Sed Libero Eleifend Semper A Eu Sem. Donec Eget Massa Duis Metus Faucibus Aliquam. Maecenas Quis Risus Ante",
  },
  {
    image: "https://www.sqorebda3.com/vb/attachments/15666/",
    title: "Game World",
    desc: "Discover new adventures and worlds. Join us and be part of the legend!",
  },
  {
    image: "https://www.sqorebda3.com/vb/attachments/16230/",
    title: "Epic Battles Await",
    desc: "Fight, conquer, and become a hero. Your journey starts here!",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const goToPrev = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goToNext = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  // Projects Data
  const [projects, setProjects] = useState<(Game & { id: number })[]>([]);
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  // Toggle Wishlist Functionality
  const toggleWishlist = (game: Game) => {
    if (isWishlisted(game.id)) {
      removeFromWishlist(game.id);
      toast.success(`${game.title} removed from wishlist`);
    } else {
      addToWishlist(game);
      toast.success(`${game.title} added to wishlist`);
    }
  };

  useEffect(() => {
    setProjects(
      allGames.slice(0, 6).map((game) => ({
        id: game.id,
        title: game.title,
        description: game.short_description,
        rating: 0,
        imageUrl: game.thumbnail,
      }))
    );
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden"
        style={{
          backgroundImage:
            "url(https://c4.wallpaperflare.com/wallpaper/997/1012/970/world-of-warcraft-battle-for-azeroth-video-games-warcraft-alliance-wallpaper-preview.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="relative z-10 w-full max-w-7xl mt-5">
          <div className="relative w-full h-[600px] flex items-center justify-center select-none">
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              fill
              className="w-full h-full object-cover rounded-2xl border-4 border-green-700 shadow-xl"
              style={{ filter: "brightness(0.7)" }}
            />
            {/* Overlay النصوص والزرار */}
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 rounded-2xl p-6">
              <h1
                className="text-4xl md:text-5xl font-extrabold text-white text-center drop-shadow-lg tracking-tight"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                {slides[current].title}
              </h1>
              <p className="mt-4 max-w-xl text-center text-base md:text-lg text-gray-200 font-medium drop-shadow">
                {slides[current].desc}
              </p>
            </div>
            {/* أزرار التنقل */}
            <button
              onClick={goToPrev}
              className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 bg-green-700/80 hover:bg-green-900 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-20 transition-all duration-300"
              aria-label="Previous slide"
            >
              &#8592;
            </button>
            <button
              onClick={goToNext}
              className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-green-700/80 hover:bg-green-900 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-20 transition-all duration-300"
              aria-label="Next slide"
            >
              &#8594;
            </button>
            {/* مؤشرات السلايدر */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {slides.map((_, idx) => (
                <span
                  key={idx}
                  className={`block w-3 h-3 rounded-full ${
                    idx === current ? "bg-green-400" : "bg-white/40"
                  } border border-green-700`}
                  style={{ transition: "background 0.3s" }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Our Project Section */}
      <section className="relative w-full flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto mt-16 px-4 md:px-8 py-12 overflow-hidden">
        {/* Left: Text */}
        <div className="md:w-1/2 w-full text-left">
          <h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-6 drop-shadow-lg"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            About Our Project
          </h2>
          <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-xl">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Curabitur
            Eget Turpis Purius. Lorem Ipsum Dolor Sit Amet, Consectetur
            Adipiscing Elit. Maecenas Tristique Viverra Quam, Eu Viverra Ex
            Interdum Sed. Praesent Cursus Ultrices Diam Eu Feugiat. In Convallis
            Leo Non Ultrices Vestibulum. Duis Auctor Nulla Et Elit Tincidunt
            Porta. Maecenas Tempus Ex Nec Dui Aliquam Semper. Phasellus Mauris
            Erat, Tempus Sed Dolor In, Imperdiet Sollicitudin Eros. Nunc Quis
            Nibh At Enim Laoreet Scelerisque. Mauris Ut Odio Vitae Ligula Cursus
            Posuere Ac Et Sem. Nulla Facilisi.
          </p>
        </div>
        {/* Right: Video with Play Button */}
        <div className="md:w-1/2 w-full flex justify-center mt-10 md:mt-0">
          <VideoWithPlayButton />
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative w-full max-w-7xl mx-auto mt-20 px-4 md:px-8 pb-16">
        <h2
          className="text-4xl md:text-5xl font-extrabold text-white text-center mb-2 drop-shadow-lg"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Projects
        </h2>
        <div className="mx-auto mb-8 flex justify-center">
          <div className="h-1 w-24 bg-green-500 rounded-full" />
        </div>
        <p className="text-gray-200 text-center max-w-2xl mx-auto mb-10 text-base md:text-lg">
          Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nulla Et Nisi
          Sed Libero Eleifend Semper A Eu Sem. Donec Eget Massa Quis Metus
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {projects.map((game) => (
            <div
              key={game.id}
              className="relative flex flex-col gap-6 sm:gap-0 group cursor-pointer"
            >
              <Image
                src={game.imageUrl as string}
                alt={game.title}
                width={500}
                height={300}
                className="rounded-xl object-cover w-full h-55 bg-black/60 min-h-[220px] max-h-[260px]"
              />
              {/* Overlay النص وزر show more وwishlist */}
              <div className="absolute inset-0 w-full flex flex-col items-center justify-center bg-black/80 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <h3
                  className="text-2xl w-80 text-center md:text-3xl font-extrabold text-white mb-4"
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {game.title}
                </h3>
                <div className="flex gap-3 items-center">
                  <Link href={`/games/${game.id}`}>
                    <button className="bg-green-500 cursor-pointer hover:bg-green-900 text-white px-5 py-2 rounded-xl font-bold shadow-lg transition-all duration-200">
                      Show More
                    </button>
                  </Link>

                  <button
                    className={`flex items-center cursor-pointer justify-center w-10 h-10 rounded-full border-2 
                    transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-md
                    ${
                      isWishlisted(game.id)
                        ? "bg-green-600 border-green-400 text-white hover:bg-green-700"
                        : "bg-white/15 backdrop-blur-sm border-white/70 text-green-400 hover:bg-green-100/20"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(game);
                    }}
                    aria-label={`${
                      isWishlisted(game.id) ? "Remove from" : "Add to"
                    } wishlist`}
                    title={`${
                      isWishlisted(game.id) ? "Remove from" : "Add to"
                    } wishlist`}
                  >
                    <Heart
                      className={`w-6 h-6 transition-all duration-300 
                      ${
                        isWishlisted(game.id)
                          ? "fill-current animate-pulse"
                          : "hover:text-green-300"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <SharedButton
            label="See More"
            className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-8 py-4 text-lg rounded-2xl shadow-xl font-bold tracking-wider border-4 border-green-700"
            iconType="arrow"
            iconPosition="right"
            showIcon={true}
            size="lg"
            onClick={() => (window.location.href = "/games")}
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="relative w-full max-w-7xl mx-auto mt-20 px-4 md:px-8 pb-16">
        <h2
          className="text-4xl md:text-5xl font-extrabold text-white text-center mb-2 drop-shadow-lg"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Services
        </h2>
        <div className="mx-auto mb-8 flex justify-center">
          <div className="h-1 w-24 bg-green-500 rounded-full" />
        </div>
        <p className="text-gray-200 text-center max-w-2xl mx-auto mb-10 text-base md:text-lg">
          Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nulla Et Nisi
          Sed Libero Eleifend Semper A Eu Sem. Donec Eget Massa Quis Metus
        </p>
        <ServicesSlider />
      </section>

      {/* How We Work Section */}
      <section className="relative w-full max-w-7xl mx-auto mt-10 px-4 md:px-8 pb-16">
        <h2
          className="text-4xl md:text-5xl font-extrabold text-white text-center mb-2 drop-shadow-lg"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          How We Work
        </h2>
        <div className="mx-auto mb-8 flex justify-center">
          <div className="h-1 w-25 bg-green-500 rounded-full" />
        </div>
        <HowWeWorkVideo />
      </section>
    </div>
  );
}
