import { connectDatabase } from "@/server/connection";
import User from "@/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true }
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email;
        const password = credentials.password;

        await connectDatabase();
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('User does not exist');
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          throw new Error('Incorrect password')
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.username = user.username
      return token
    },

    async session({ session, token }) {
      session.user.username = token.username
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };