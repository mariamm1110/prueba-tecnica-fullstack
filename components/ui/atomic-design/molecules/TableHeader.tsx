import TableHeaderA from "../atoms/TableHeaderA";

interface TableHeaderProps {
    titles: string[];
}

export default function TableHeader({ titles }: TableHeaderProps) {
    return (
        <tr className="grid grid-cols-4 bg-gray-200 py-2 px-4 rounded-t-lg">
            {titles.map((title) => (
                <TableHeaderA key={title} title={title} />
            ))}
        </tr>
    );
}
