import { useRouter } from "next/router";
import Header from "../atomic-design/organisms/Header";
import Sidebar from "../atomic-design/organisms/Sidebar";
import UserForm from "../atomic-design/organisms/UserForm";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "@/graphql/users/frontedQueries";
import SideBarMenu from "../atomic-design/organisms/SidebarMenu-scn";
import { SidebarProvider } from "../sidebar";
import Header2 from "../atomic-design/organisms/Header2";


export default function EditUserTemplate() {
    const router = useRouter();
    const { id } = router.query;

    const { data, loading, error } = useQuery(GET_USER_BY_ID, {
        variables: { id },
        skip: !id, 
    });
    console.log(data);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="flex min-h-screen">
            <SidebarProvider>
                <SideBarMenu />
                <main className="flex-1 flex flex-col">
                    <Header2 />
                    <section className="p-8 flex-1 flex justify-center items-center">
                        {data?.getUserById ? (
                            <UserForm
                                userId={data.getUserById.id}
                                initialName={data.getUserById.name}
                                initialRole={data.getUserById.role || ""}
                            />
                        ) : (
                            <p>No user found</p>
                        )}
                    </section>
                </main>
            </SidebarProvider>
        </div>
    );
}
