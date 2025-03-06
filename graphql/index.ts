import gql from "graphql-tag";
import { transactionTypes } from "./transactions/types";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { transactionResolvers } from "./transactions/resolvers";
import { userTypes } from "./users/types";
import { userResolvers } from "./users/resolvers";
import { sessionTypes } from "./session/types";
import { reportTypes } from "./reports/types";
import { reportResolvers } from "./reports/resolvers";


const defaultTypes = gql`
  scalar DateTime
  type Query
  type Mutation
`;

export const types = mergeTypeDefs([defaultTypes, transactionTypes, userTypes, sessionTypes, reportTypes]);
export const resolvers = [transactionResolvers, userResolvers, reportResolvers];