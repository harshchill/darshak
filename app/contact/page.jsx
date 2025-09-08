export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">We'd love to hear from you.</p>
      <form className="mt-8 card space-y-4">
        <div>
          <label className="text-sm">Name</label>
          <input className="mt-1 w-full rounded-lg border border-transparent/10 bg-white/70 px-3 py-2 text-sm outline-none ring-0 placeholder:text-gray-400 focus:border-transparent/20 dark:bg-neutral-900/60" placeholder="Your name" />
        </div>
        <div>
          <label className="text-sm">Email</label>
          <input type="email" className="mt-1 w-full rounded-lg border border-transparent/10 bg-white/70 px-3 py-2 text-sm outline-none ring-0 placeholder:text-gray-400 focus:border-transparent/20 dark:bg-neutral-900/60" placeholder="you@example.com" />
        </div>
        <div>
          <label className="text-sm">Message</label>
          <textarea rows={5} className="mt-1 w-full rounded-lg border border-transparent/10 bg-white/70 px-3 py-2 text-sm outline-none ring-0 placeholder:text-gray-400 focus:border-transparent/20 dark:bg-neutral-900/60" placeholder="How can we help?" />
        </div>
        <button type="button" className="btn-primary">Send</button>
      </form>
    </div>
  );
}


