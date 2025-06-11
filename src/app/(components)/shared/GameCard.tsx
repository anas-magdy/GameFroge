"use client";
import { toast } from 'sonner';

import React, { MouseEvent, ReactNode } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star, Trash2 } from "lucide-react";
import SharedButton from "./SharedButton";

interface GameCardProps {
  title?: string;
  description?: string;
  rating?: string | number;
  price?: string;
  imageUrl?: string;
  showButton?: boolean;
  deleteIcon?: boolean;
  wishIcon?: boolean;
  customButton?: ReactNode;
  onWishlistToggle?: (title: string) => void;
  isWishlisted?: boolean;
  buttonProps?: React.ComponentProps<typeof SharedButton>;
  insideImageOnly?: boolean;
  className?: string;
}

export default function GameCard({
  title = "Untitled",
  description,
  rating,
  wishIcon = true,
  deleteIcon = false,
  price,
  imageUrl,
  showButton = true,
  customButton,
  onWishlistToggle,
  isWishlisted = false,
  buttonProps = {},
  insideImageOnly = false,
  className = "",
}: GameCardProps) {
const handleWishlistToggle = (e: MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation();
  if (onWishlistToggle && title) {
    onWishlistToggle(title);
    toast.success(
      isWishlisted
        ? `${title} removed from wishlist`
        : `${title} added to wishlist`
    );
  }
};


  const wishButtonStyle = deleteIcon ? "top-3 right-12" : "top-3 right-3";

  return (
    <div className={`group relative w-full max-w-sm sm:max-w-xs mx-auto ${className}`}>
      <Card
        className={`
          border border-transparent hover:border-primary transition-colors duration-300 
          cursor-pointer relative rounded-2xl shadow-lg 
          ${imageUrl && !insideImageOnly ? "mt-24" : insideImageOnly ? "mt-0" : "mt-6"}
          ${insideImageOnly ? "p-0" : ""}
        `}
      >
        {imageUrl && !insideImageOnly && (
          <div className="absolute top-0 left-1/2 w-[90%] h-40 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl shadow-md group-hover:scale-105 transition-transform duration-500">
            <Image
              src={imageUrl}
              alt={title}
              width={320}
              height={160}
              priority
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {rating && (
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-md bg-primary px-3 py-1 text-xs font-semibold text-white shadow-md">
                {rating} <Star className="inline h-4 w-4" />
              </div>
            )}

            {wishIcon && (
              <Button
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                size="icon"
                variant="ghost"
                onClick={handleWishlistToggle}
                className={`absolute z-10 h-9 w-9 rounded-full backdrop-blur-md transition-colors ${wishButtonStyle} ${
                  isWishlisted
                    ? 'bg-destructive/20 text-destructive hover:bg-destructive/30'
                    : 'bg-background/80 hover:bg-destructive/10 hover:text-destructive'
                }`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
            )}

            {deleteIcon && (
              <Button
                aria-label="Remove item"
                size="icon"
                variant="ghost"
                onClick={handleWishlistToggle}
                className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full backdrop-blur-md bg-background/80 hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-5 w-5 text-destructive" />
              </Button>
            )}
          </div>
        )}

        <CardContent className={insideImageOnly && imageUrl ? "p-0" : "pt-20 text-center px-6 pb-4"}>
          {insideImageOnly && imageUrl ? (
            <div className="border border-transparent hover:border-primary transition-colors duration-300 relative w-full h-full group rounded-2xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={title}
                width={320}
                height={192}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl">
                <h3 className="text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {title}
                </h3>
              </div>

              {rating && (
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-md bg-primary px-3 py-1 text-xs font-semibold text-white shadow-md">
                  {rating} <Star className="inline h-4 w-4" />
                </div>
              )}

              {wishIcon && (
                <Button
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  size="icon"
                  variant="ghost"
                  onClick={handleWishlistToggle}
                  className={`absolute z-10 h-9 w-9 rounded-full backdrop-blur-md transition-colors ${wishButtonStyle} ${
                    isWishlisted
                      ? "bg-destructive/20 text-destructive hover:bg-destructive/30"
                      : "bg-background/80 hover:bg-destructive/10 hover:text-destructive"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
              )}

              {deleteIcon && (
                <Button
                  aria-label="Remove item"
                  size="icon"
                  variant="ghost"
                  onClick={handleWishlistToggle}
                  className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full backdrop-blur-md bg-background/80 hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
              )}
            </div>
          ) : (
            <>
              {price && (
                <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                  {price}
                </p>
              )}
              <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                {title}
              </h3>
              {description && (
                <p className="text-sm text-muted-foreground break-words whitespace-normal overflow-hidden">
                  {description}
                </p>
              )}
            </>
          )}
        </CardContent>

        {showButton && !insideImageOnly && (
          <CardFooter className="justify-center px-6 pb-6 mt-auto">
            {customButton ?? <SharedButton {...buttonProps} />}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
