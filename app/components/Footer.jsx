import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-transparent/10 bg-white/60 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-md bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400" />
              <span className="text-base font-semibold">Darshak</span>
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 max-w-sm">
              Career guidance that meets you where you are. Discover paths, build skills, and take the next step with clarity.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li><Link href="/about" className="hover:text-gray-900 dark:hover:text-white">About</Link></li>
              <li><Link href="/careers" className="hover:text-gray-900 dark:hover:text-white">Careers</Link></li>
              <li><Link href="/resources" className="hover:text-gray-900 dark:hover:text-white">Resources</Link></li>
              <li><Link href="/contact" className="hover:text-gray-900 dark:hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Get Started</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li><Link href="/test" className="hover:text-gray-900 dark:hover:text-white">Take the Test</Link></li>
              <li><Link href="/resources" className="hover:text-gray-900 dark:hover:text-white">Guides</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li><a className="cursor-not-allowed opacity-60">Privacy</a></li>
              <li><a className="cursor-not-allowed opacity-60">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-transparent/10 pt-6 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Darshak. All rights reserved.</p>
          <p>Made with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}


