"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const steps = [
  {
    key: "interests",
    title: "Your Interests",
    subtitle: "What kind of work excites you?",
    options: ["Creative", "Analytical", "People-focused", "Hands-on", "Entrepreneurial", "Research"],
    type: "multi",
  },
  {
    key: "education",
    title: "Education Level",
    subtitle: "What best describes your current education?",
    options: ["High School", "Diploma", "Undergraduate", "Postgraduate", "Self-taught"],
    type: "single",
  },
  {
    key: "skills",
    title: "Your Skills",
    subtitle: "Which skills do you have or want to build?",
    options: ["Design", "Coding", "Data", "Marketing", "Writing", "Management"],
    type: "multi",
  },
];

export default function TestPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({ interests: [], education: "", skills: [] });

  const step = steps[current];

  function toggleMulti(key, value) {
    setAnswers((prev) => {
      const set = new Set(prev[key]);
      if (set.has(value)) set.delete(value); else set.add(value);
      return { ...prev, [key]: Array.from(set) };
    });
  }

  function setSingle(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  const canNext = useMemo(() => {
    if (step.type === "single") return Boolean(answers[step.key]);
    return (answers[step.key] || []).length > 0;
  }, [answers, step]);

  function next() {
    if (current < steps.length - 1) setCurrent((v) => v + 1);
    else router.push(`/results?data=${encodeURIComponent(JSON.stringify(answers))}`);
  }

  function back() {
    if (current > 0) setCurrent((v) => v - 1);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{step.title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">{step.subtitle}</p>
        </div>
        <div className="text-sm text-gray-500">Step {current + 1} of {steps.length}</div>
      </div>

      <div className="card">
        <div className="flex flex-wrap gap-3">
          {step.options.map((opt) => {
            const isActive = step.type === "multi"
              ? (answers[step.key] || []).includes(opt)
              : answers[step.key] === opt;
            return (
              <button
                type="button"
                key={opt}
                onClick={() => (step.type === "multi" ? toggleMulti(step.key, opt) : setSingle(step.key, opt))}
                className={
                  "rounded-full border border-transparent/10 px-4 py-2 text-sm transition shadow-sm " +
                  (isActive ? "bg-gray-900 text-white dark:bg-white dark:text-black" : "bg-white/70 dark:bg-neutral-900/60")
                }
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button type="button" onClick={back} disabled={current === 0} className="rounded-lg px-4 py-2 text-sm text-gray-700 disabled:opacity-50 dark:text-gray-200">
          Back
        </button>
        <button type="button" onClick={next} disabled={!canNext} className="btn-primary disabled:opacity-50">
          {current === steps.length - 1 ? "See Results" : "Next"}
        </button>
      </div>
    </div>
  );
}


