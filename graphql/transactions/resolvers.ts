import { Context } from "@apollo/client";
import { transactionMutations } from "./mutations";
import { transactionQueries } from "./queries";


export const transactionResolvers = {
    Query: {...transactionQueries},
    Mutation: {...transactionMutations},
    Transaction: {
        user: async (parent: any, _: any, { db }: Context) => {
            return db.user.findUnique({ where: { id: parent.userId } });
        },
    }
}