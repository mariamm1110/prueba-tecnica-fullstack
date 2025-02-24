import { GET_TRANSACTIONS } from "@/graphql/transactions/frontedQueries";
import { useQuery } from "@apollo/client"
import TableHeader from "../molecules/TableHeader";
import TableRow from "../molecules/TableRow";


const TransactionTable = () => {
    const {loading, error, data} = useQuery(GET_TRANSACTIONS);

    if (loading) return <p>"Cargando..."</p>;
    if (error) return <p>Error :{error.message}</p>;

    return (
        <div className="w-full rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
                <thead>
                    <TableHeader titles={["Concepto", "Monto", "Fecha", "Usuario"]} />

                </thead>
                <tbody>
                    {data.getTransactions.map((transaction: any) => (
                        <TableRow
                            key={transaction.id}
                            concept={transaction.concept}
                            amount={transaction.amount}
                            date={transaction.date}
                            user={transaction.user.name}
                            type={transaction.type}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;