import { gql } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    getTransactions {
      id
      amount
      concept
      date
      currency
      type
      user {
        id
        name
      }
    }
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $amount: Float!, 
    $concept: String!, 
    $type: TransactionType!, 
    $currency: Currency!, 
    $userId: String!
    $date: DateTime!
  ) {
    createTransaction(
      amount: $amount, 
      concept: $concept, 
      type: $type, 
      currency: $currency, 
      userId: $userId
      date: $date
    ) {
      id
      amount
      concept
      date
      type
      currency
    }
  }
`;
