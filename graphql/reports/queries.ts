import gql from "graphql-tag";

export const GET_REPORT = gql`
    query GetReport {
        getReport {
            summary {
                totalIncome
                totalExpenses
                balance
            }
            monthlyTransactions {
                month
                income
                expenses
            }
        }
    }
    ;`
