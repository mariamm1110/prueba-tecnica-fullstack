import { Context } from "@/types";


export const userQueries = {
    getUsers: async (_:any, __:any, { db, authData }: Context) => {
        if (!authData || authData.role !== "ADMIN") {
            throw new Error("Not authorized");
        }

        if (!db) {
            throw new Error("Database connection is missing.");
          }

        return db.user.findMany({
            include: { role: true }
        });
    },

    getUserByEmail: async (_:any, { email }: { email: string }, { db, authData }: Context) => {
        if (!authData || authData.role !== "ADMIN") {
            throw new Error("Not authorized");
        }
        return db.user.findUnique({ where: { email } });
    },

    getUserById: async (_: any, { id }: { id: string }, { db, authData }: Context) => {
        if (!authData || authData.role !== "ADMIN") {
            throw new Error("Not authorized");
        }
        return db.user.findUnique({ where: { id }, include: { role: true } });
    }
    
}