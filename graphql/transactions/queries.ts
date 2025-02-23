import { Context } from "@/types";
import { GraphQLError } from "graphql";

export const transactionQueries = {
    getTransactions: async (_: any, __: any, { db, authData} : Context) => {
        if (!authData) throw new  GraphQLError("Not authenticated");

        return db.transaction.findMany({
            include: { user: true },
            orderBy: { date: "desc" }
        });
    },

    getTransactionById: async (_:any, { id }: { id: string }, { db, authData }: Context) => {
        if (!authData) throw new GraphQLError("Not authenticated");

        return db.transaction.findUnique({
            where: { id },
            include: { user: true }
        });
    }
}