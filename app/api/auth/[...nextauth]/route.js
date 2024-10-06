import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID, // Check if GOOGLE_ID is set correctly in .env.local
      clientSecret: process.env.GOOGLE_SECRET, // Check if GOOGLE_SECRET is set correctly in .env.local
    }),
  ],
  debug: true,  // Enable NextAuth debug mode
  secret: process.env.NEXTAUTH_SECRET, // Add the secret for extra security
});

export { handler as GET, handler as POST };
