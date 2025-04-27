import { loginRequest } from "@/app/login/api";
import { TLoginResponse } from "@/app/modules/login/type";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Credentials",
      credentials: {
        username: {
          label: "Name",
          type: "text",
          placeholder: "your cool username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your cool password",
        },
      },
      async authorize(credentials) {
        try {
          const data = await loginRequest({
            username: credentials?.username as string,
            password: credentials?.password as string,
          });

          if (!data.access_token) throw new Error("acces_token not found");
          return data;
        } catch (error) {
          throw new Error(error as string);
        } // Add logic here to look up the user from the credentials supplied
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (user) return true;
      return false;
    },
    async jwt({ token, user, account }) {
      const currentUser = user as unknown as TLoginResponse;
      if (account?.provider === "login" && currentUser) {
        token.accessToken = currentUser.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // Inject accessToken tanpa hapus data bawaan
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
};
