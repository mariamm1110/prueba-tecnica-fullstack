import { Context } from "@/types";
import { Currency, TransactionType } from "@prisma/client";
import { GraphQLError } from "graphql";
import { useSession } from "next-auth/react";

export const transactionMutations = {

    

    createTransaction: async (_:any, 
        { 
            amount, 
            concept, 
            type, 
            currency, 
            userId,
            date
        }: { 
            amount: number, 
            concept: string, 
            type: string, 
            currency: string, 
            userId:string,
            date: Date}, 
            { db, authData }: Context
        ) => {
        
        if (!authData || authData.role !== "ADMIN") {
            throw new Error("Not authorized");
        }

        if (!Object.values(TransactionType).includes(type as TransactionType)) {
            throw new Error("Invalid transaction type");
        }
      
        if (!Object.values(Currency).includes(currency as Currency)) {
            throw new Error("Invalid currency");
        }

        return db.transaction.create({
            data: {
                amount,
                concept,
                type: type as TransactionType,
                currency: currency as Currency,
                date,
                userId: authData.id
            },
        });
    },

    deleteTransaction: async (_:any, { id }: { id: string }, { db, authData }: Context) => {
        if (!authData || authData.role !== "ADMIN") {
            throw new Error("Not authorized");
        }

        const transaction = await db.transaction.findUnique({ where: { id } });
        if (!transaction) throw new GraphQLError("Transaction not found");

        await db.transaction.delete({ where: { id } });
        return true;
    }
}