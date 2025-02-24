import gql from "graphql-tag";


export const userTypes = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    emailVerified: DateTime
    image: String
    sessions: [Session]
    role: Role!
    }

    enum Role {
        ADMIN
        USER
    }
        
    extend type Query {
        getUsers: [User!]!
        getUserByEmail(email: String!): User
        getUserById(id: ID!): User
    }
        
    extend type Mutation {
        updateUser(id: ID!, name: String, role: Role): User
        deleteUser(id: ID!): Boolean
    }`

    