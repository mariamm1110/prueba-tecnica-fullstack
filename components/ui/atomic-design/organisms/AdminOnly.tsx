// AdminOnly.tsx (o .js)

import { useRouter } from "next/router";
import { Button } from "../../button";

export default function AdminOnly() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Función solo para administradores</h1>
      
      <Button
        onClick={() => router.push("/")}
        className="bg-orange text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Regresar
      </Button>
    </div>
  );
}
