import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  session: {
    strategy: "database",
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as { 
          email: string; password: string 
        };
        // perform login logic
        // find user from database
        
        const user = await prisma.user.findUnique({
          where: { 
            email:email
          } 
        });
        
        //const user = { id: 1, name: "J Smith", email: 'john@example.com'}
        if (user && user.password == password) return { id: user.id, name: user.name, email: user.email};
        //if (email == "john@example.com" && password == "1234") return user;
        throw new Error('invalid credentials');
        // if everything is fine
        return null;
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/register",
  }
};

export default NextAuth(authOptions);
