import gql from "graphql-tag";


export const reportTypes = gql`
    type ReportSummary {
        totalIncome: Float!
        totalExpenses: Float!
        balance: Float!
    }
        
    type MonthlyTransaction {
        month: String!
        income: Float!
        expenses: Float!
    }
        
    type Report {
        summary: ReportSummary!
        monthlyTransactions: [MonthlyTransaction!]!
    }
        
    extend type Query {
        getReport: Report!
    }
    `;

    