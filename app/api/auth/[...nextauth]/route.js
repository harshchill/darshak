import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await dbConnect();
        if (!user?.email) return false;

        const existing = await User.findOne({ email: user.email });
        if (!existing) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
        }
        return true;
      } catch (err) {
        console.error("Sign-in callback error:", err);
        return false;
      }
    },
    async session({ session, token, user }) {
      // ensure we include _id
      try {
        if (session?.user?.email) {
          await dbConnect();
          const dbUser = await User.findOne({
            email: session.user.email,
          }).lean();
          if (dbUser) {
            session.user.id = dbUser._id.toString();
            session.user.image = dbUser.image || session.user.image;
            session.user.name = dbUser.name || session.user.name;
          }
        }
      } catch (_) {}
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
