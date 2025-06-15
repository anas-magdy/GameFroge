"use client"

import { useState } from "react";
import Image from "next/image";

export default function HowWeWorkVideo() {
    const [playing, setPlaying] = useState(false);
  
    const handlePlay = () => {
      setPlaying(true);
    };

    const thumbnailUrl = "https://www.cairo24.com/Upload/libfiles/79/4/940.jpg";
  
    return (
      <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden flex items-center justify-center bg-black/40 shadow-2xl p-1" style={{ minHeight: 380 }}>
        {/* Border Gradient */}
        <div className="absolute inset-0 z-0 rounded-2xl pointer-events-none" style={{
          padding: 0,
          background: 'linear-gradient(135deg, #22c55e 0%, #bbf7d0 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          border: 'none',
        }} />
        
        {!playing ? (
          <>
            <Image
              src={thumbnailUrl}
              width={100}
              height={100}
              alt="Video thumbnail"
              className="w-full h-[450px] object-cover relative z-10 rounded-2xl border-4 border-green-500 shadow-xl"
            />
            <button
              className="absolute cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white rounded-full w-20 h-20 flex items-center justify-center shadow-2xl border-4 border-white/30 transition-all duration-300 z-20 ring-4 ring-green-300/40"
              aria-label="Play Video"
              onClick={handlePlay}
            >
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="22" fill="currentColor" fillOpacity="0.2" />
                <polygon points="18,14 34,22 18,30" fill="#22c55e" />
              </svg>
            </button>
          </>
        ) : (
          <iframe
            width="900"
            height="450"
            className="w-full h-[450px] object-cover relative z-10 rounded-2xl border-4 border-green-500 shadow-xl"
            src="https://www.youtube.com/embed/eHhCwrbz3Gw?autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    );
  }