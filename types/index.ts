import { PrismaClient } from "@prisma/client";


export interface AuthData {
    id: string;
    role: "ADMIN" | "USER";
}

export interface Context {
    db: PrismaClient;
    authData: AuthData;
}