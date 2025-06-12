import { Orbitron } from "next/font/google";
import "./globals.css";
import { WishlistProvider } from "./context/WishlistContext";
import { Toaster } from "sonner";
import Navbar from "./(components)/shared/Navbar";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Game App",
  description: "This is a game web app",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={orbitron.className}>
        <WishlistProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Toaster richColors position="top-center" />
        </WishlistProvider>
      </body>
    </html>
  );
}