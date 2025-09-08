"use client";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

function parseData(search) {
  try {
    return JSON.parse(search.get("data") || "{}");
  } catch {
    return {};
  }
}

export default function ResultsPage() {
  const search = useSearchParams();
  const answers = useMemo(() => parseData(search), [search]);

  const highlights = [
    ...(answers.interests || []),
    answers.education ? `Edu: ${answers.education}` : null,
    ...(answers.skills || []),
  ].filter(Boolean);

  // Simple heuristic recommendations
  const recs = [];
  const hasDesign = (answers.skills || []).includes("Design") || (answers.interests || []).includes("Creative");
  const hasCode = (answers.skills || []).includes("Coding") || (answers.interests || []).includes("Analytical");
  const hasData = (answers.skills || []).includes("Data") || (answers.interests || []).includes("Research");
  if (hasDesign && hasCode) recs.push("Frontend Developer", "Product Designer");
  else if (hasDesign) recs.push("UI/UX Designer");
  if (hasData) recs.push("Data Analyst");
  if (recs.length === 0) recs.push("Project Coordinator", "Business Analyst");

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Your Results</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">Based on your answers, here are some paths to explore.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="card md:col-span-2">
          <h2 className="text-lg font-semibold">Recommended careers</h2>
          <ul className="mt-3 space-y-2">
            {recs.map((r) => (
              <li key={r} className="rounded-lg bg-white/60 px-3 py-2 text-sm shadow-sm dark:bg-neutral-900/60">{r}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">Your profile</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {highlights.map((h) => (
              <span key={h} className="rounded-full border border-transparent/10 bg-white/70 px-3 py-1 text-xs shadow-sm dark:bg-neutral-900/60">{h}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


