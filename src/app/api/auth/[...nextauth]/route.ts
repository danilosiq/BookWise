import { buildNextAuthOptions } from "@/core/lib/nextAuth/buildNextAuth";
import NextAuth from "next-auth";



const handler =  NextAuth(buildNextAuthOptions())

export { handler as GET, handler as POST };
