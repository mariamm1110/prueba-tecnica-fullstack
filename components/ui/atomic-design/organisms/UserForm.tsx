// UserForm.tsx (Ajustado para recibir props)
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import InputField from "../atoms/InputField";
import Button from "../atoms/Button";
import { UPDATE_USER } from "@/graphql/users/frontedQueries";
import { useRouter } from "next/router";

type UserFormProps = {
  userId: string;
  initialName: string;
  initialRole: string;
};

const UserForm = ({ userId, initialName, initialRole }: UserFormProps) => {
  const router = useRouter();
  console.log(userId, initialName, initialRole);
  const [name, setName] = useState(initialName);
  const [role, setRole] = useState(initialRole);
  const [error, setError] = useState("");

  useEffect(() => {
    setName(initialName);
    setRole(initialRole);
  }, [initialName, initialRole]);

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: () => alert("Usuario actualizado correctamente"),
    onError: (error) => setError(error.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) {
      setError("Todos los campos son requeridos");
      return;
    }
    updateUser({
      variables: {
        id: userId,
        name,
        role,
      },
    });
  };

  const noChangesMade = name === initialName && role === initialRole;

  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField label="Nombre" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 rounded">
          <option value="USER">Usuario</option>
          <option value="ADMIN">Administrador</option>
        </select>

        <div className="flex gap-2">
          <Button 
            type="submit" 
            disabled={ loading || noChangesMade } 
            label="Actualizar" 
            // onClick={() => router.push("/users")}
          />

          <Button 
            type="button" 
            onClick={() => router.back()} 
            label="Atrás" 
            className="bg-gray-400 hover:bg-gray-500"
          />

        </div>
      </form>
    </div>
  );
};

export default UserForm;
