import AdminOnly from "@/components/ui/atomic-design/organisms/AdminOnly";
import UsersTemplate from "@/components/ui/templates/UsersTemplate";
import { GET_USERS } from "@/graphql/users/frontedQueries";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


export default function UsersPage() {

    const {data: session, status} = useSession();
    const router = useRouter();
    const { loading, error } = useQuery(GET_USERS);

    if (loading) return <p>Cargando...</p>;

    if (!session || session.user.role !== "ADMIN") {
        
        return <AdminOnly/>;
    }

    return (
        <UsersTemplate />
    )
}