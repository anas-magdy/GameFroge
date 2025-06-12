import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-20 border-t pt-12 pb-6 text-sm text-muted-foreground bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">About GameVerse</h3>
          <p className="text-muted-foreground">
            GameVerse is your go-to platform for discovering free-to-play games. Browse, explore, and build your wishlist!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">All Games</a></li>
            <li><a href="#" className="hover:underline">Wishlist</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">Contact Us</h3>
          <ul className="space-y-1">
            <li>Email: support@gameverse.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Location: Cairo, Egypt</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-base font-semibold text-foreground mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Facebook</a>
            <a href="#" className="hover:underline">Twitter</a>
            <a href="#" className="hover:underline">Instagram</a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} GameVerse. All rights reserved.
      </div>
    </footer>
  )
}
