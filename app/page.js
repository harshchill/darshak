
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-10 md:pt-24 md:pb-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-transparent/10 bg-white/60 px-3 py-1 text-xs text-gray-600 shadow-sm backdrop-blur dark:bg-neutral-900/60">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
              Guided by data, tailored to you
            </div>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              Find your <span className="text-gradient">career path</span> with clarity
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base text-gray-600 dark:text-gray-300 md:text-lg">
              Answer a few questions about your interests, education, and skills. We’ll match you with careers and learning paths that fit.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/test" className="btn-primary">Start the Test</Link>
              <Link href="/careers" className="text-sm font-medium text-gray-700 underline underline-offset-4 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white">Explore Careers</Link>
            </div>
          </div>
          <div className="relative">
            <div className="card">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-cyan-400/20 p-6">
                  <p className="text-sm text-gray-700 dark:text-gray-200">Interests</p>
                  <p className="mt-2 text-2xl font-semibold">Creative • Analytical</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-400/20 p-6">
                  <p className="text-sm text-gray-700 dark:text-gray-200">Skills</p>
                  <p className="mt-2 text-2xl font-semibold">Design • Coding</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-400/20 p-6">
                  <p className="text-sm text-gray-700 dark:text-gray-200">Education</p>
                  <p className="mt-2 text-2xl font-semibold">Undergraduate</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-rose-500/20 to-amber-400/20 p-6">
                  <p className="text-sm text-gray-700 dark:text-gray-200">Match</p>
                  <p className="mt-2 text-2xl font-semibold">UI/UX • Frontend</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Personalized Insights", desc: "Recommendations tailored to your profile and goals." },
            { title: "Modern Career Library", desc: "Up-to-date roles, skills, and salary ranges." },
            { title: "Actionable Roadmaps", desc: "Courses and steps to reach your target role." },
          ].map((f) => (
            <div key={f.title} className="card">
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-2xl border border-transparent/10 bg-gradient-to-br from-fuchsia-500/10 via-violet-500/10 to-cyan-400/10 p-8 text-center shadow-sm backdrop-blur">
          <h2 className="text-2xl font-semibold">Ready to discover your next step?</h2>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">Take the fast, free assessment and get guidance in minutes.</p>
          <div className="mt-6">
            <Link href="/test" className="btn-primary">Start Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
