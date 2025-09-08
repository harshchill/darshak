const resources = [
  { title: "UX Foundations", type: "Guide", link: "#" },
  { title: "React Roadmap", type: "Roadmap", link: "#" },
  { title: "SQL for Analysis", type: "Course", link: "#" },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Resources</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">Curated guides and roadmaps to level up.</p>
      <div className="mt-8 grid gap-4">
        {resources.map((r) => (
          <a key={r.title} href={r.link} className="card flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <p className="text-xs text-gray-500">{r.type}</p>
            </div>
            <span className="text-sm">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}


