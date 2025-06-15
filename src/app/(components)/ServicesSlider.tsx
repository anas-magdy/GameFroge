"use client"
import { useState } from "react";
import Image from 'next/image';
export default function ServicesSlider() {
    const images = [
      "https://png.pngtree.com/background/20230823/original/pngtree-3d-rendered-background-featuring-a-blue-gamepad-in-digital-art-picture-image_4785958.jpg",
      "https://www.vga4a.com/wp-content/uploads/destiny2lightfallfeatured-780x450.webp",
      "https://img.pikbest.com/wp/202408/spade-modern-ace-of-spades-playing-card-with-black-and-white-design-perfect-for-poker-casino-games-3d-rendered-illustration_9780329.jpg!sw800",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkOBl3OlBvZA69qwcRTs9toUvruDLRhMJi3A&s",
      "https://png.pngtree.com/thumb_back/fh260/background/20250327/pngtree-a-woman-wearing-vr-glasses-is-playing-games-in-the-air-image_17144314.jpg",
      "https://img.pikbest.com/wp/202405/game-keyboard-modern-pc-gaming-setup-in-blue-patterned-room-with-white-screen-and-3d-rendering_9828877.jpg!w700wp",
      // يمكنك إضافة أي عدد من الصور هنا
    ];
    const [current, setCurrent] = useState(0);
    const slidesToShow = 3;
    const goTo = (idx: number) => setCurrent(idx);
    const goToPrev = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    const goToNext = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  
    // حساب بداية ونهاية الصور المعروضة
    let start = current - Math.floor(slidesToShow / 2);
    if (start < 0) start = 0;
    let end = start + slidesToShow;
    if (end > images.length) {
      end = images.length;
      start = Math.max(0, end - slidesToShow);
    }
    const visibleImages = images.slice(start, end);
  
    return (
      <div className="w-full flex flex-col items-center">
        <div className="relative w-full max-w-6xl mx-auto flex justify-center items-center">
          {/* زرار الاتجاه لليسار خارج السلايدر */}
          <button
            onClick={goToPrev}
            className="absolute cursor-pointer -left-16 top-1/2 -translate-y-1/2 bg-green-700/80 hover:bg-green-900 text-white rounded-full w-12 h-12 sm:flex hidden items-center justify-center shadow-lg z-20 transition-all duration-300"
            aria-label="Previous slide"
          >
            &#8592;
          </button>
          {/* الصور المعروضة */}
          <div className="flex gap-8 w-full justify-center items-center">
            {visibleImages.map((img, idx) => {
              // احسب الاندكس الحقيقي للصورة
              const realIdx = start + idx;
              return (
                <div
                  key={realIdx}
                  onClick={() => goTo(realIdx)}
                  className={`relative flex-1 h-52 max-w-[220px] sm:h-64 sm:max-w-[300px] lg:h-80 lg:max-w-[400px] rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    realIdx === current
                      ? "border-4 border-green-500 shadow-[0_0_32px_4px_rgba(34,197,94,0.5)]"
                      : "border-2 border-green-900 opacity-60"
                  } bg-black/60 overflow-hidden`}
                  style={{ boxShadow: realIdx === current ? '0 0 32px 4px rgba(34,197,94,0.5)' : undefined }}
                >
                  <Image
                    src={img}
                    alt={`service-${realIdx}`}
                    fill
                    className="object-cover w-full h-full rounded-2xl"
                  />
                </div>
              );
            })}
          </div>
          {/* زرار الاتجاه لليمين خارج السلايدر */}
          <button
            onClick={goToNext}
            className="absolute cursor-pointer -right-16 top-1/2 -translate-y-1/2 bg-green-700/80 hover:bg-green-900 text-white rounded-full w-12 h-12 sm:flex hidden items-center justify-center shadow-lg z-20 transition-all duration-300"
            aria-label="Next slide"
          >
            &#8594;
          </button>
        </div>
        {/* Indicators */}
        <div className="flex gap-3 justify-center mt-8">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-4 h-4 cursor-pointer rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 ${
                idx === current ? "bg-green-500" : "bg-white"
              }`}
              style={{ outline: idx === current ? '2px solid #22c55e' : undefined }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }