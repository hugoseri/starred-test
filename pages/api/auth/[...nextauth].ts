import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email";
import { prisma } from "../../../prisma";

export default NextAuth({
    providers: [
        EmailProvider({
          server: process.env.EMAIL_SERVER,
          from: process.env.EMAIL_FROM,
        }),
    ],
  adapter: PrismaAdapter(prisma),
})