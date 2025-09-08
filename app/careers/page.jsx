const roles = [
  { title: "UI/UX Designer", level: "Entry–Mid", skills: ["Figma", "Wireframing", "User Research"], salary: "$50k–$90k" },
  { title: "Frontend Developer", level: "Entry–Mid", skills: ["React", "TypeScript", "CSS"], salary: "$60k–$110k" },
  { title: "Data Analyst", level: "Entry–Mid", skills: ["SQL", "Python", "Dashboards"], salary: "$55k–$100k" },
];

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Explore Careers</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Browse popular roles and the skills that power them.</p>
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {roles.map((r) => (
          <div key={r.title} className="card">
            <h3 className="text-lg font-semibold">{r.title}</h3>
            <p className="mt-1 text-xs text-gray-500">{r.level}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {r.skills.map((s) => (
                <span key={s} className="rounded-full border border-transparent/10 bg-white/50 px-3 py-1 text-xs shadow-sm dark:bg-neutral-900/60">
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-200">Typical salary: {r.salary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


