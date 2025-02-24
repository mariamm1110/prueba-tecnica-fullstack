import TransactionsTemplate from "@/components/ui/templates/TransactionsTemplate";
import { GET_TRANSACTIONS } from "@/graphql/transactions/frontedQueries";
import { useQuery } from "@apollo/client";


export default function TransactionsPage() {
    const { loading, error } = useQuery(GET_TRANSACTIONS);

    if (loading) return <p>Cargando...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    return (
        <TransactionsTemplate />
    )
}