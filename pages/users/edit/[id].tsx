// [id].tsx
import { useRouter } from "next/router";
import EditUserTemplate from "@/components/ui/templates/EditUserTemplate";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "@/graphql/users/frontedQueries";

export default function EditUserPage() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.getUserById) return <p>No se encontró el usuario</p>;

  return (
    <EditUserTemplate
    />
  );
}
