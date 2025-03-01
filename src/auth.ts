import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { connectToMongoDB } from "./db/connection";
import User from "./lib/models/User";
import bcrypt from "bcryptjs"

interface LoginCredentials {
  email: string;
  password: string;
}

declare module 'next-auth' {
  interface User {
    role: string
  }
  
  interface Session {
    user: {
      id: string
      email: string
      role: string
    }
  }
}

export const {  handlers, auth, signIn, signOut  } = NextAuth({
  pages: {
    signIn: "/sign-in"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password"  }
      },
      async authorize(credentials){
        if(!credentials || !credentials.email || !credentials.password) return null
        const { email, password } = credentials as LoginCredentials;

        await connectToMongoDB()
        const user = await User.findOne({
          email: { $regex: email, $options: 'i' }
        }).select("+password");

        if(!user) throw new Error("User does not exist");

        const passwordsMatch = await bcrypt.compare(
          password,
          user.password
        )

        if(!passwordsMatch) throw new Error("Invalid Password");
        return user;

      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user, account}) => {
      if(user){
        await connectToMongoDB()
        let existingUser = await User.findOne({
          email: user.email
        });

        // Create new user if signing in with Google for the first time
        if(!existingUser && account?.provider === 'google') {
          existingUser = await User.create({
            email: user.email,
            provider: 'google',
            role: 'user',
            emailVerified: true,
          });
        }

        if(existingUser) {
          token.role = existingUser.role;
        }
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      session.user.id = token.sub
      session.user.role = token.role
      
      return session
    },
    authorized({ auth, request, token } : any){
      const isLoggedIn = auth?.user
      const { pathname } = request.nextUrl
      const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up') || pathname.startsWith('/forgot-password')
      const protectedPaths = [
        '/admin',
        '/user',
      ]
      // Check if path requires authentication
      const requiresAuth = protectedPaths.some(path => pathname.startsWith(path))


      if (!isLoggedIn && requiresAuth) {
        return false // This will redirect to sign-in
      }

      // If logged in, check role-based access
      if (auth?.user) {
      // Admin route protection
        if (pathname.startsWith('/admin') && auth.user.role !== 'admin') {
          return Response.redirect(new URL('/unauthorized', request.url))
      }}

     },
  },
})