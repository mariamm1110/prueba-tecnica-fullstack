import gql from "graphql-tag";
import { transactionTypes } from "./transactions/types";
import { transactionResolvers } from "./transactions/resolvers";
import { userTypes } from "./users/types";
import { userResolvers } from "./users/resolvers";
import { sessionTypes } from "./session/types";


const defaultTypes = gql`
  scalar DateTime
  type Query
  type Mutation
`;

export const types = [defaultTypes, transactionTypes, userTypes, sessionTypes];
export const resolvers = [transactionResolvers, userResolvers];