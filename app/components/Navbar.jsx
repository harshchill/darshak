"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-transparent/10 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-white/70 dark:bg-neutral-900/60">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 shadow-sm transition-transform group-hover:scale-105" />
            <span className="text-lg font-semibold tracking-tight">Darshak</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    "text-sm transition-colors hover:text-gray-900 dark:hover:text-gray-100 " +
                    (active ? "text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-300")
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            {status === "authenticated" ? (
              <button
                onClick={() => signOut()}
                className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition"
              >
                Sign out
              </button>
            ) : (
              <button
                className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition"
              >
               <Link href={"/signIn"}>Sign in</Link>  
              </button>
            )}
            <Link
              href="/test"
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-black/5 transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100"
            >
              Take the Test
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}


