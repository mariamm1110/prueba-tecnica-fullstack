
export default function TableHeaderA({ title }: { title: string }) {

    return (
        <th className="px-2 py-1 font-bold text-left text-blue">
            {title}
        </th>
    );
}
