import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email";
import { prisma } from "../../../prisma";

/**
 * Next-auth setup
 */
export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  theme: {
    colorScheme: "light",
  },
}

export default NextAuth(authOptions)