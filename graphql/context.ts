// graphql/context.ts
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';

export const createContext = async ({ req, res }: { req: any; res: any }) => {
  const session = await getServerSession(req, res, authOptions);

  return {
    db: prisma,
    authData: session?.user ?? null,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
