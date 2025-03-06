import { ApolloServer } from "@apollo/server";
import { expect, it, beforeAll, afterAll, describe } from "bun:test";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { types, resolvers } from "../graphql/index";
import { setupTestData, cleanupTestData } from "./setup";
import { createContext } from "@/graphql/context";

let server: ApolloServer;
let contextValue: any; 

beforeAll(async () => {
    console.log("setting up test environment...");

    
    const schema = makeExecutableSchema({
        typeDefs: types,
        resolvers,
    });

    
    server = new ApolloServer({
        schema,
    });

    await server.start();

    
    contextValue = await createContext({ req: {}, res: {} });

   
    await setupTestData();
});

afterAll(async () => {
    console.log(" Cleaning up test data...");
    await cleanupTestData();
});

describe("User Queries", () => {
    it("should fetch all users", async () => {
        const query = `
            query {
                getUsers {
                    image
                    id
                    name
                    email
                    role {
                        name
                    }
                }
            }
        `;

        console.log(" executing GraphQL Query...");
        const response = await server.executeOperation(
            { query },
            { contextValue } 
        );

        console.log("GraphQL Response:", JSON.stringify(response, null, 2));

        expect(
            response.body.kind === 'single' &&
              response.body.singleResult?.data?.getUsers
          ).toBeDefined();
        
    });
});
