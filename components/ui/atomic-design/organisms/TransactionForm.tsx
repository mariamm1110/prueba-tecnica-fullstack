import { CREATE_TRANSACTION } from "@/graphql/transactions/frontedQueries";
import { useMutation } from "@apollo/client";
import { useState } from "react"
import { transactionTypes } from '../../../../graphql/transactions/types';
import { Currency, TransactionType } from "@prisma/client";
import InputField from "../atoms/InputField";
import Button from "../atoms/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


const TransactionForm = () => {
    const {data: session} = useSession();
    const router = useRouter();

    const [amount, setAmount] = useState("");
    const [concept, setConcept] = useState("");
    const [date, setDate] = useState('');
    const [type, setType] = useState("INCOME");
    const [error, setError] = useState("");


    const [createTransaction, {loading}] = useMutation(CREATE_TRANSACTION, {
        onCompleted: () => {
            alert("Transacción creada");
            setAmount("");
            setConcept("");
            setDate('');
            setType("INCOME");
        },
        onError: (error) => {
            setError(error.message);
        }
    });

    const handleSumbit = (e: React.FormEvent) => {
        e.preventDefault();

        const numericAmount = parseFloat(amount);
        
        if (!amount || !concept || !date || !type) {
            setError("Todos los campos son requeridos");
            return;
        }

        if (numericAmount <= 0) {
            setError("El monto debe ser mayor a 0");
            return;
        }

        createTransaction({
            variables: {
                amount: numericAmount,
                concept,
                currency: 'COP' as Currency,
                type: type as TransactionType,
                userId: session?.user.id,
                date: new Date(date)
            }
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4 text-pink">Nuevo Movimiento de Dinero</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSumbit} className="flex flex-col gap-4 text-orange">
                <InputField label="Monto" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <InputField label="Concepto" type="string" value={concept} onChange={(e) => setConcept(e.target.value)} />
                <InputField label="Fecha"  type="date" value={date} onChange={(e) => setDate(e.target.value)} />

                <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded">
                    <option value="INCOME">Ingreso</option>
                    <option value="EXPENSE">Egreso</option>
                </select>

                <Button type="submit" disabled={loading} label="Ingresar" className="bg-orange">
                    
                </Button>
                <Button type="button" disabled={loading} label="Regresar" className="bg-orange" onClick={() => router.push("/transactions")}>
                    
                </Button>

                
            </form>
        </div>
    );
}

export default TransactionForm;