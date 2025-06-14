"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Gamepad2, Heart, Menu, X } from "lucide-react";
import { Button } from "@/app/(components)/ui/button";
import { signOut, useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { data, status } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Game Store
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/games">
              <Button variant="ghost" className="gap-2 cursor-pointer">
                <Gamepad2 className="w-4 h-4" />
                Games
              </Button>
            </Link>
            <Link href="/watch-list">
              <Button variant="ghost" className="gap-2 cursor-pointer">
                <Heart className="w-4 h-4" />
                Wishlist
              </Button>
            </Link>
            {status === "loading" && <p>Loading...</p>}
            {status === "authenticated" ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Link href="/profile" className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border-2 border-primary/10 hover:border-primary/30 transition-colors">
                        {/* <AvatarImage
                          src={data?.user?.image as string}
                          alt={data?.user?.name as string}
                        /> */}
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {data?.user?.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-sm cursor-pointer"
                    onClick={() =>
                      signOut({
                        callbackUrl: "/auth/login",
                        redirect: true,
                      })
                    }
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="gap-2 cursor-pointer">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="link" className="gap-2 cursor-pointer">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-md border-b">
            <Link
              href="/games"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={toggleMenu}
            >
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                Games
              </div>
            </Link>
            <Link
              href="/watch-list"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={toggleMenu}
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Wishlist
              </div>
            </Link>

            {status === "loading" && <p className="px-3 py-2">Loading...</p>}

            {status === "authenticated" ? (
              <>
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  onClick={toggleMenu}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 border-2 border-primary/10">
                      <AvatarImage
                        src={data?.user?.image as string}
                        alt={data?.user?.name as string}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {data?.user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    Profile
                  </div>
                </Link>
                <button
                  onClick={() => {
                    signOut({
                      callbackUrl: "/auth/login",
                      redirect: true,
                    });
                    toggleMenu();
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
