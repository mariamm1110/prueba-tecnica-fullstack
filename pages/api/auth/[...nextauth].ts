// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";


export const authOptions: NextAuthOptions ={
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: `https://${process.env.AUTH0_ISSUER}`,
      authorization: {
        params: {
          prompt: 'login'
        },
      }
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      if (user.email && account) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { accounts: true },
        });

        const defaultRole = await prisma.role.findUnique({
          where: { name: "USER" },
        });

        if (!defaultRole) {
          throw new Error("Default USER role is missing in the database.");
        }

        if (!existingUser) {
          // Create new user if not existing
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name ?? user.email.split("@")[0],
              image: user.image,
              role: {
                connect: { id: defaultRole.id },
              },
              accounts: {
                create: {
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  refresh_token: account.refresh_token,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                  session_state: account.session_state,
                },
              },
            },
            
          });
          console.log("entra 1");
        } else if (existingUser && existingUser.accounts.length === 0) {
          // Create account if existing user but missing account
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
            },
          });
          console.log("entra 2");
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { role: true },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role.name;
        }
      }

      // if (trigger === 'update' && session?.role) {
      //   token.role = session.role;
      // }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      await fetch(`https://${process.env.AUTH0_ISSUER}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}`);
    },
  },
};

export default NextAuth(authOptions);