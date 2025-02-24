import UsersTemplate from "@/components/ui/templates/UsersTemplate";
import { GET_USERS } from "@/graphql/users/frontedQueries";
import { useQuery } from "@apollo/client";


export default function UsersPage() {
    const { loading, error } = useQuery(GET_USERS);

    if (loading) return <p>Cargando...</p>;

    return (
        <UsersTemplate />
    )
}