"use client";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const defaultSkillList = [
  { name: "JavaScript", rating: 0, proof: "" },
  { name: "React", rating: 0, proof: "" },
  { name: "Node", rating: 0, proof: "" },
  { name: "Python", rating: 0, proof: "" },
  { name: "SQL", rating: 0, proof: "" },
  { name: "Data structures", rating: 0, proof: "" },
];

export default function TestPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    pastProject: "",
    workPreference: "remote",
    cityConstraints: [],
    confidentSkills: [],
    skillRatings: defaultSkillList,
    values: [],
    futureVision: "",
    proudProject: "",
    enjoyedSubjects: "",
  });
  const [status, setStatus] = useState({ submitting: false, success: null, error: null });
  const [step, setStep] = useState(0);

  const steps = [
    { key: "pastProject", title: "Past actions", subtitle: "Tell me a small project or assignment you enjoyed — what exactly did you build?" },
    { key: "workPreference", title: "Work preference", subtitle: "Would you prefer remote, hybrid, or onsite?" },
    { key: "cityConstraints", title: "City constraints", subtitle: "Any city constraints?" },
    { key: "confidentSkills", title: "Confident skills", subtitle: "Which technical skills can you confidently use in a real project?" },
    { key: "skillRatings", title: "Rate skills", subtitle: "Rate these skills 0–5 and add a short proof." },
    { key: "values", title: "Values", subtitle: "What motivates you — learning, salary, stability, leadership, solving problems?" },
    { key: "futureVision", title: "Future vision", subtitle: "Where do you want to be in 3 years?" },
    { key: "proudProject", title: "Proud project", subtitle: "What’s one project you built that you were proud of?" },
    { key: "enjoyedSubjects", title: "Enjoyed subjects", subtitle: "Which subjects/classes did you enjoy most in college and why?" },
  ];

  const isLast = step === steps.length - 1;

  function handleChange(field, value) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  function toggleArray(field, value) {
    setForm((p) => {
      const set = new Set(p[field]);
      if (set.has(value)) set.delete(value); else set.add(value);
      return { ...p, [field]: Array.from(set) };
    });
  }

  function updateSkillRating(index, key, value) {
    setForm((p) => {
      const next = [...p.skillRatings];
      next[index] = { ...next[index], [key]: value };
      return { ...p, skillRatings: next };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!isLast) {
      setStep((s) => Math.min(s + 1, steps.length - 1));
      return;
    }
    if (!session?.user?.id) {
      await signIn();
      return;
    }
    setStatus({ submitting: true, success: null, error: null });
    try {
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save");
      setStatus({ submitting: false, success: "Saved!", error: null });
      router.push("/results");
    } catch (err) {
      setStatus({ submitting: false, success: null, error: "Something went wrong" });
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tell us about you</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">{steps[step].title} — {steps[step].subtitle}</p>
        </div>
        <div className="text-sm text-gray-500">Step {step + 1} of {steps.length}</div>
      </div>
      {!session && (
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          You are not signed in. Your answers will be linked to your account.
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-6">
        {steps[step].key === "pastProject" && (
          <section className="space-y-2">
            <textarea
              className="w-full rounded-md border border-gray-300 dark:border-neutral-700 bg-transparent p-3 text-sm"
              rows={5}
              value={form.pastProject}
              onChange={(e) => handleChange("pastProject", e.target.value)}
              placeholder="1–3 sentences, link if any"
            />
          </section>
        )}

        {steps[step].key === "workPreference" && (
          <section className="space-y-2">
            <div className="flex gap-4 items-center">
              {[
                { key: "remote", label: "Remote" },
                { key: "hybrid", label: "Hybrid" },
                { key: "onsite", label: "Onsite" },
              ].map((opt) => (
                <label key={opt.key} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="workPreference"
                    value={opt.key}
                    checked={form.workPreference === opt.key}
                    onChange={(e) => handleChange("workPreference", e.target.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </section>
        )}

        {steps[step].key === "cityConstraints" && (
          <section className="space-y-2">
            <div className="flex flex-wrap gap-3">
              {["No constraint", "Delhi", "Bengaluru", "Mumbai", "Pune", "Hyderabad"].map((city) => (
                <label key={city} className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.cityConstraints.includes(city)}
                    onChange={() => toggleArray("cityConstraints", city)}
                  />
                  {city}
                </label>
              ))}
            </div>
          </section>
        )}

        {steps[step].key === "confidentSkills" && (
          <section className="space-y-2">
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 dark:border-neutral-700 bg-transparent p-2 text-sm"
              placeholder="e.g. React, Express, MongoDB"
              value={form.confidentSkills.join(", ")}
              onChange={(e) => handleChange("confidentSkills", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
            />
          </section>
        )}

        {steps[step].key === "skillRatings" && (
          <section className="space-y-3">
            <div className="space-y-3">
              {form.skillRatings.map((s, i) => (
                <div key={s.name} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <div className="text-sm font-medium">{s.name}</div>
                  <input
                    type="range"
                    min={0}
                    max={5}
                    step={1}
                    value={s.rating}
                    onChange={(e) => updateSkillRating(i, "rating", Number(e.target.value))}
                  />
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 dark:border-neutral-700 bg-transparent p-2 text-sm"
                    placeholder="Short proof (project/line of code)"
                    value={s.proof}
                    onChange={(e) => updateSkillRating(i, "proof", e.target.value)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {steps[step].key === "values" && (
          <section className="space-y-2">
            <div className="flex flex-wrap gap-3">
              {[
                { key: "learning", label: "Learning" },
                { key: "salary", label: "Salary" },
                { key: "stability", label: "Stability" },
                { key: "leadership", label: "Leadership" },
                { key: "solving_problems", label: "Solving problems" },
              ].map((v) => (
                <label key={v.key} className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.values.includes(v.key)}
                    onChange={() => toggleArray("values", v.key)}
                  />
                  {v.label}
                </label>
              ))}
            </div>
          </section>
        )}

        {steps[step].key === "futureVision" && (
          <section className="space-y-2">
            <textarea
              className="w-full rounded-md border border-gray-300 dark:border-neutral-700 bg-transparent p-3 text-sm"
              rows={4}
              value={form.futureVision}
              onChange={(e) => handleChange("futureVision", e.target.value)}
            />
          </section>
        )}

        {steps[step].key === "proudProject" && (
          <section className="space-y-2">
            <textarea
              className="w-full rounded-md border border-gray-300 dark:border-neutral-700 bg-transparent p-3 text-sm"
              rows={4}
              value={form.proudProject}
              onChange={(e) => handleChange("proudProject", e.target.value)}
            />
          </section>
        )}

        {steps[step].key === "enjoyedSubjects" && (
          <section className="space-y-2">
            <textarea
              className="w-full rounded-md border border-gray-300 dark:border-neutral-700 bg-transparent p-3 text-sm"
              rows={4}
              value={form.enjoyedSubjects}
              onChange={(e) => handleChange("enjoyedSubjects", e.target.value)}
            />
          </section>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            disabled={step === 0 || status.submitting}
            className="rounded-lg px-4 py-2 text-sm text-gray-700 disabled:opacity-50 dark:text-gray-200"
          >
            Back
          </button>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="btn-primary disabled:opacity-50"
              disabled={status.submitting}
            >
              {status.submitting ? "Saving..." : isLast ? "Submit" : "Next"}
            </button>
            {status.success && <span className="text-green-600 text-sm">{status.success}</span>}
            {status.error && <span className="text-red-600 text-sm">{status.error}</span>}
          </div>
        </div>
      </form>
    </div>
  );
}

