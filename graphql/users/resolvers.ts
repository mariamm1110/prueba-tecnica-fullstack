import { Context } from "@/types";
import { userQueries } from "./queries";
import { userMutations } from "./mutations";


export const userResolvers = {
    User: {
        sessions: async (parent: any, _: any, { db }: Context) => {
            return db.session.findMany({
                where: { userId: parent.id }
            });
        },
    },

    Query: {...userQueries},
    Mutation: {...userMutations},
};