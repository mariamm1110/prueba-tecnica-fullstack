import { PrismaClient } from '@prisma/client';

const databaseUrl = 
    process.env.NODE_ENV === 'test'
        ? process.env.TEST_DATABASE_URL
        : process.env.DATABASE_URL;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        }
    }
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
