import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Answer from "@/models/Answer";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    const doc = await Answer.create({
      userId: session.user.id,
      pastProject: body.pastProject,
      workPreference: body.workPreference,
      cityConstraints: Array.isArray(body.cityConstraints) ? body.cityConstraints : [],
      confidentSkills: Array.isArray(body.confidentSkills) ? body.confidentSkills : [],
      skillRatings: Array.isArray(body.skillRatings) ? body.skillRatings : [],
      values: Array.isArray(body.values) ? body.values : [],
      futureVision: body.futureVision,
      proudProject: body.proudProject,
      enjoyedSubjects: body.enjoyedSubjects,
    });

    return new Response(JSON.stringify({ id: doc._id }), { status: 201 });
  } catch (err) {
    console.error("POST /api/answers error", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}


