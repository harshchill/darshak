export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold">About Darshak</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        We help students and professionals navigate careers with personalized guidance. Our approach blends modern UX, labor data, and curated learning resources.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {["Research-driven", "User-centered", "Outcome-focused"].map((t) => (
          <div key={t} className="card">
            <h3 className="text-lg font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">We continuously refine recommendations to serve your goals.</p>
          </div>
        ))}
      </div>
    </div>
  );
}


