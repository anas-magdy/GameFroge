"use client";

import React from "react";
import {
  ArrowRight,
  Gamepad2,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/app/(components)/ui/button";

type SharedButtonProps = {
  onClick?: () => void;
  className?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  iconType?: "arrow" | "heart" | "star" | "game" | "cart";
  iconPosition?: "left" | "right";
  showIcon?: boolean;
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isActive?: boolean;
  children?: React.ReactNode;
};

const getIcon = (type: string = "arrow", isActive: boolean = false) => {
  switch (type) {
    case "arrow":
      return <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />;
    case "heart":
      return <Heart className={`w-4 h-4 ${isActive ? "fill-current" : ""}`} />;
    case "star":
      return <Star className="w-4 h-4" />;
    case "game":
      return <Gamepad2 className="w-4 h-4" />;
    case "cart":
      return <ShoppingCart className="w-4 h-4" />;
    default:
      return null;
  }
};

export default function SharedButton(props: SharedButtonProps) {
  const {
    onClick,
    className,
    label = "Show More",
    icon,
    iconType = "arrow",
    iconPosition = "right",
    showIcon = true,
    variant = "default",
    size = "default",
    type = "button",
    disabled = false,
    isActive = false,

    children,
  } = props;

  const finalIcon = icon || getIcon(iconType, isActive);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}

      className={cn(
        buttonVariants({ variant, size }),
        "group relative overflow-hidden font-semibold rounded-xl shadow-md transition-all",
        "hover:shadow-xl hover:-translate-y-[1px]",
        disabled && "opacity-50 cursor-not-allowed",
        isActive && "bg-primary/20 text-primary",
        className
      )}
    >
      <span className="absolute inset-0 z-0 scale-x-0 origin-left bg-neutral-900 dark:bg-neutral-200 transition-transform group-hover:scale-x-100 rounded-xl" />

      <span className="relative z-10 flex items-center justify-center gap-2 text-black dark:text-white group-hover:text-white dark:group-hover:text-black">
        {children ? (
          children
        ) : (
          <>
            {showIcon && iconPosition === "left" && finalIcon}
            {label}
            {showIcon && iconPosition === "right" && finalIcon}
          </>
        )}
      </span>
    </button>
  );
}
