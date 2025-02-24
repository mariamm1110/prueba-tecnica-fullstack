import client from "@/lib/apolloClient";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;  

    if (!session) {
      router.push("/api/auth/signin"); 
    }
  }, [session, status, router]);

  if (status === "loading" || !session) {
    return null; 
  }

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      </ApolloProvider>
    </SessionProvider>
  );
}
