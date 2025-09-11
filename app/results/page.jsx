import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Answer from "@/models/Answer";

async function fetchLatestAnswerForUser(userId) {
  await dbConnect();
  const doc = await Answer.findOne({ userId }).sort({ createdAt: -1 }).lean();
  return doc;
}

function toReadableSummary(answer) {
  if (!answer) return "";
  const parts = [];
  if (answer.pastProject) parts.push(`Past project: ${answer.pastProject}`);
  if (answer.workPreference) parts.push(`Work preference: ${answer.workPreference}`);
  if (answer.cityConstraints?.length) parts.push(`City constraints: ${answer.cityConstraints.join(", ")}`);
  if (answer.confidentSkills?.length) parts.push(`Confident skills: ${answer.confidentSkills.join(", ")}`);
  if (answer.skillRatings?.length) {
    parts.push(
      `Skill ratings: ${answer.skillRatings
        .map((s) => `${s.name}=${s.rating}${s.proof ? ` (${s.proof})` : ""}`)
        .join(", ")}`
    );
  }
  if (answer.values?.length) parts.push(`Values: ${answer.values.join(", ")}`);
  if (answer.futureVision) parts.push(`Future vision (3y): ${answer.futureVision}`);
  if (answer.proudProject) parts.push(`Proud project: ${answer.proudProject}`);
  if (answer.enjoyedSubjects) parts.push(`Enjoyed subjects: ${answer.enjoyedSubjects}`);
  return parts.join("\n");
}

async function getCareerGuidanceLLM(content) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return { text: "LLM not configured. Set GROQ_API_KEY to enable AI guidance." };
  }

  const system =
    "You are a seasoned career guide for early-career software engineers. Provide concise, practical guidance: 1) 2–3 likely career directions with rationale mapping to user's skills, values, and preferences; 2) a 4-week learning and project plan; 3) 3 concrete portfolio project ideas; 4) key topics to revise for interviews; 5) suggested job search query strings. Keep it actionable and friendly.";

  const user = `User profile and answers:\n\n${content}`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        temperature: 0.4,
      }),
      cache: "no-store",
    });
    const json = await res.json();
    const text = json?.choices?.[0]?.message?.content || "";
    return { text };
  } catch (e) {
    return { text: "Unable to fetch AI guidance right now." };
  }
}

export default async function ResultsPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Your Results</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Please sign in to view your personalized results.</p>
      </div>
    );
  }

  const answer = await fetchLatestAnswerForUser(userId);
  if (!answer) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Your Results</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">No answers found. Fill the questionnaire to get guidance.</p>
      </div>
    );
  }

  const readable = toReadableSummary(answer);
  const ai = await getCareerGuidanceLLM(readable);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Your Results</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">Personalized guidance based on your latest answers.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="card md:col-span-2">
          <h2 className="text-lg font-semibold">Career guidance (AI)</h2>
          <div className="prose prose-sm mt-3 whitespace-pre-wrap dark:prose-invert">
            {ai.text}
          </div>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">Your answers (summary)</h2>
          <div className="mt-3 text-sm whitespace-pre-wrap">
            {readable}
          </div>
        </div>
      </div>
    </div>
  );
}

