

export interface TableRowProps {
    concept: string;
    amount: number;
    date: string;
    user: string;
    type: "INCOME" | "EXPENSE";
}

export default function TableRow({ concept, amount, date, user, type }: TableRowProps) {
    return (
        <tr className="grid grid-cols-4 bg-white py-2 px-4 border-b items-center">
            <td>{concept}</td>
            <td className={type === 'INCOME' ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
                {amount.toFixed(2)}
            </td>
            <td>{new Date(date).toLocaleDateString()}</td>
            <td>{user}</td>
        </tr>
    );
}