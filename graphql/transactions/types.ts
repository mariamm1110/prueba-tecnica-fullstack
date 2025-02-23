import gql from "graphql-tag";


export const transactionTypes = gql`
  type Transaction {
    id: ID!
    amount: Float!
    concept: String!
    date: DateTime!
    currency: Currency!
    type: TransactionType!
    user: User!
    iduser: ID
}

enum Currency {
    USD
    EUR
    COP
    MXN
}
    
enum TransactionType {
    INCOME
    EXPENSE
}

extend type Query {
    getTransactions: [Transaction!]!
    getTransactionById(id: ID!): Transaction
}

extend type Mutation {
    createTransaction(amount: Float!, concept: String!, date: DateTime, type: TransactionType!, currency: String ): Transaction
    deleteTransaction(id: ID!): Boolean
}
    
`;