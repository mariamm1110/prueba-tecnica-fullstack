import { transactionMutations } from "./mutations";
import { transactionQueries } from "./queries";


export const transactionResolvers = {
    Query: {...transactionQueries},
    Mutation: {...transactionMutations},
}