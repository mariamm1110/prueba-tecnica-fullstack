import { useRouter } from "next/router";
import Button from "../atoms/Button";



export default function TableRowU({ user }: { user: any}) {

    const router = useRouter();
    

    return (
        <tr className="grid grid-cols-4 bg-white py-2 px-4 border-b items-center">
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td className="text-dblue">
                {/* <img src={user.image} alt={user.name} className=""/> */}
                {user.role}
            </td>
            <td>
                <Button
                    label="Editar"
                    onClick={() => router.push(`users/edit/${user.id}`)}
                    className="bg-orange"
                >
                </Button>
            </td>
        </tr>
    );
}