"use client"
import { useState } from "react";
import Image from 'next/image';
export default function VideoWithPlayButton() {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
  };

  const thumbnailUrl = "https://img.youtube.com/vi/IkapJ8u1K_0/maxresdefault.jpg";

  return (
    <div className="relative w-[520px] h-[380px] rounded-2xl overflow-hidden flex items-center justify-center border-4 border-green-500">
      {!playing ? (
        <>
          <Image
            src={thumbnailUrl}
            fill
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
          <button
            className="absolute cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-4 border-white/30 transition-all duration-300"
            aria-label="Play Video"
            onClick={handlePlay}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="18" fill="currentColor" fillOpacity="0.2" />
              <polygon points="14,11 27,18 14,25" fill="white" />
            </svg>
          </button>
        </>
      ) : (
        <iframe
          width="520"
          height="320"
          className="w-full h-full object-cover"
          src="https://www.youtube.com/embed/IkapJ8u1K_0?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}