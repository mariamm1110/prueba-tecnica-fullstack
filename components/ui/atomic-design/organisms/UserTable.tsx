import { GET_USERS } from "@/graphql/users/frontedQueries";
import { useQuery } from "@apollo/client";
import TableHeader from "../molecules/TableHeader";
import TableRowU from "../molecules/TableRowU";


const UserTable = () => {
    const {loading, error, data} = useQuery(GET_USERS);

    if (loading) return <p>"Cargando..."</p>;
    if (error) return <p>Error :{error.message}</p>;

    return (
        <div className="w-full rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <TableHeader titles={["Nombre", "Correo", "Rol", "Accion"]} />
        
                        </thead>
                        <tbody>
                            {data.getUsers.map((user: any) => (
                                <TableRowU
                                    user={user}
                                    key={user.id}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
    )
}

export default UserTable;