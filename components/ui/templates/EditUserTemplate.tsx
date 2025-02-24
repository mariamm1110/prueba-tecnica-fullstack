import { useRouter } from "next/router";
import Header from "../atomic-design/organisms/Header";
import Sidebar from "../atomic-design/organisms/Sidebar";
import UserForm from "../atomic-design/organisms/UserForm";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "@/graphql/users/frontedQueries";


export default function EditUserTemplate() {

    const router = useRouter();
      const { id } = router.query;
    
      const { data } = useQuery(GET_USER_BY_ID, {
        variables: { id },
        skip: !id,
      });
    return (
        <div className="flex min-h-screen">
            <Sidebar/>
            <main className="flex-1 flex flex-col">
                <Header/>
                <section className="p-8 flex-1 flex-justify-center items-center">
                    <UserForm
                        userId={data.getUserById.id}
                        initialName={data.getUserById.name}
                        initialRole={data.getUserById.role.name}
                     />
                </section>
            </main>
        </div>
    )

}