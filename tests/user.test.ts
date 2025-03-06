import { ApolloServer } from "@apollo/server";
import { expect, it, beforeAll, afterAll, describe } from "bun:test";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { types, resolvers } from "../graphql/index";
import { setupTestData, cleanupTestData } from "./setup";
import { createContext } from "@/graphql/context";

let server: ApolloServer;
let contextValue: any; // Store context manually

beforeAll(async () => {
    console.log("🚀 Setting up test environment...");

    // ✅ Create Apollo Schema
    const schema = makeExecutableSchema({
        typeDefs: types,
        resolvers,
    });

    // ✅ Initialize Apollo Server (no context here)
    server = new ApolloServer({
        schema,
    });

    await server.start();

    // ✅ Fetch the context manually to pass later
    contextValue = await createContext({ req: {}, res: {} });

    // ✅ Setup test data in the database
    await setupTestData();
});

afterAll(async () => {
    console.log("🧹 Cleaning up test data...");
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

        console.log("🔍 Executing GraphQL Query...");
        const response = await server.executeOperation(
            { query },
            { contextValue } // ✅ Inject context manually
        );

        console.log("GraphQL Response:", JSON.stringify(response, null, 2));

        expect(
            response.body.kind === 'single' &&
              response.body.singleResult?.data?.getUsers
          ).toBeDefined();
        
    });
});
