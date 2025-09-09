import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionProvider from "./providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Darshak — Career Guidance",
  description: "Discover your path with a modern career guidance experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full bg-white text-gray-900 dark:bg-neutral-950 dark:text-gray-100`}
      >
        <div className="relative flex min-h-screen flex-col">
          <SessionProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </SessionProvider>
        </div>
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div
            className="absolute left-1/2 top-[-10%] -translate-x-1/2 blur-3xl"
            style={{
              background:
                "radial-gradient(600px 300px at 50% 0%, rgba(168,85,247,0.15), rgba(59,130,246,0.05) 60%, transparent)",
              width: "1200px",
              height: "600px",
            }}
          />
        </div>
      </body>
    </html>
  );
}
