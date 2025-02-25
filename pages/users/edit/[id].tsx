// [id].tsx
import { useRouter } from "next/router";
import EditUserTemplate from "@/components/ui/templates/EditUserTemplate";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "@/graphql/users/frontedQueries";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function EditUserPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id },
    skip: !id,
  });

  useEffect(() => {
        if (status === "loading") return;
        if(!session || session.user.role !== "ADMIN"){ 
          router.push("/api/auth/signin");
        }
      }, [session, status, router]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.getUserById) return <p>No se encontró el usuario</p>;

  return (
    <EditUserTemplate
    />
  );
}
