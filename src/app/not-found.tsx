"use client";

import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { Button } from "@/app/(components)/ui/button";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsAnimated(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated game controller icon */}
        <div className={`transition-all duration-1000 ${isAnimated ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="relative mx-auto w-32 h-32 mb-4">
            <Gamepad2 className="w-full h-full text-primary" />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <span className="text-2xl font-bold">404</span>
            </div>
          </div>
        </div>

        {/* Error message with staggered animation */}
        <h1 
          className={`text-4xl font-extrabold tracking-tight transition-all duration-700 delay-300 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          Game Over!
        </h1>
        
        <p 
          className={`text-xl text-muted-foreground transition-all duration-700 delay-500 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          The level you&apos;re looking for doesn&apos;t exist.
        </p>

        {/* Pixel art-style divider */}
        <div 
          className={`flex justify-center transition-all duration-700 delay-700 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex space-x-1">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="w-2 h-2 rounded-sm bg-primary"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-1000 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <Button asChild size="lg">
            <Link href="/">
              <Gamepad2 className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/games">
              Browse Games
            </Link>
          </Button>
        </div>

        {/* Easter egg message */}
        <p 
          className={`text-sm text-muted-foreground italic transition-all duration-700 delay-1200 ${isAnimated ? 'opacity-70' : 'opacity-0'}`}
        >
          Achievement unlocked: Found the secret 404 page!
        </p>
      </div>
    </div>
  );
}