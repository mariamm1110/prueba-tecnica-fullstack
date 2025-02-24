// hooks/useRequireAuth.ts
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

export function useRequireAuth() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("auth0"); // redirects to Auth0 login
    }
  }, [status]);

  return { session, loading: status === "loading" };
}
