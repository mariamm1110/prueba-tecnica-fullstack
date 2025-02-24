import { types, resolvers } from '@/graphql';
import { createContext } from '@/graphql/context';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { gql } from 'graphql-tag';




const schema = makeExecutableSchema ({
  typeDefs: types ,
  resolvers,
});

const server = new ApolloServer({
  schema,
  
})

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => createContext({ req, res }),
});


