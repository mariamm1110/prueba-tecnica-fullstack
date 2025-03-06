import { prisma } from "@/lib/prisma";
import dotenv from "dotenv";

// dotenv.config();


console.log("Using DATABASE_URL:", process.env.TEST_DATABASE_URL);

async function testPrismaConnection() {
    try {
        await prisma.$connect();
        console.log("Connected to the test database!");
    } catch (error) {
        console.error("Prisma failed to connect:", error);
    }
}
testPrismaConnection();

export const setupTestData = async () => {

    const adminRole = await prisma.role.upsert({
        where: { name: "ADMIN" },
        update: {},
        create: {
            id: "1",
            name: "ADMIN",
        },
    });

    const userRole = await prisma.role.upsert({
        where: { name: "USER" },
        update: {},
        create: { name: "USER" },
    });

    


    const existingUser = await prisma.user.findUnique({
        where: { id: 'user1' },
    });

    if (!existingUser) {

        //crear usuario
        await prisma.user.create({
            data: {
                name: 'User 1',
                email: 'userex@hotmail.com',
                roleId: userRole.id,
                createdAt: new Date(),
                updatedAt: new Date(),
    
                accounts: {
                    create: [
                        {
                            provider: "github",
                            providerAccountId: "github_user_123",
                            type: "oauth",
                            access_token: "dummy_access_token",
                            refresh_token: "dummy_refresh_token",
                            expires_at: Math.floor(Date.now() / 1000) + 3600, //1 hora
                            token_type: "Bearer",
                        },
                    ],
                },
    
                sessions: {
                    create: [
                        {
                            sessionToken: "dummy_session_token",
                            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //24 horas
                        },
                    ],
                },
    
                transactions: {
                    create: [
                        {
                            amount: 100.50,
                            concept: "Test Transaction",
                            date: new Date(),
                            currency: "USD",
                            type: "INCOME",
                        },
                    ],
                },
            },
            include: {
                role: true,
                accounts: true,
                sessions: true,
                transactions: true,
            },
        });
    }


    console.log("Test data created");
};

export const cleanupTestData = async () =>{
    console.log("Cleaning up test data...");

    
    await prisma.transaction.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.account.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.role.deleteMany({});

    console.log("Test data cleaned up");
}