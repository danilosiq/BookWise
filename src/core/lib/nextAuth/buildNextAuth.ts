import { NextAuthOptions } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "./prisma-adapter";


export function buildNextAuthOptions(): NextAuthOptions {
  return {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(),
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_SECRET_KEY!,

        profile(profile: GithubProfile) {
          return {
            id: profile.id.toString(),
            name: profile.name!,
            avatar_url: profile.avatar_url,
          };
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_SECRET_KEY!,

        profile(profile: GoogleProfile) {
            return {
              id: profile.sub,
              name: profile.name,
              avatar_url: profile.avatar_url,
            };
          },
      }),
    ],

    callbacks: {
      async signIn() {
        return true;
      },

      async session({ session, user }) {
        return {
          ...session,
          user
        }
      }
    },
  };
}
