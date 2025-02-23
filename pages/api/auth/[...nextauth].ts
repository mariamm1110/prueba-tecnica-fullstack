import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: `https://${process.env.AUTH0_ISSUER}`,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await prisma.user.findUnique({ where: { email: user.email! } });

      if (!existingUser) {
        const role = await prisma.role.findUnique({ where: { name: "USER" } });

        if (!role) throw new Error("Default USER role is missing.");

        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name ?? "Default User",
            image: user.image,
            role: { connect: { id: role.id } },
          },
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (await prisma.user.findUnique({
          where: { id: user.id },
          include: { role: true },
        }))?.role.name;
      }
      return token;
    },

    async session({ session, token }) {
      console.log(token);
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
