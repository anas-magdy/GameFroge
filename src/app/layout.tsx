import { Orbitron } from "next/font/google";
import "./globals.css";
import { WishlistProvider } from "./context/WishlistContext";
import { Toaster } from "sonner";
import Navbar from "./(components)/shared/Navbar";
import Footer from "./(components)/shared/Footer";
import NextAuthProvider from "./providers/NextAuthProvider";
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
          <NextAuthProvider>
            <Navbar />
            <main className="pt-16">{children}</main>
            <Toaster richColors position="top-center" />
            <Footer></Footer>
          </NextAuthProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
