import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NewTransactionTemplate from '../../components/ui/templates/NewTransactionTemplate';



export default function NewTransactionPage() {

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return;
      if(!session || session.user.role !== "ADMIN"){ 
        router.push("/api/auth/signin");
      }
    }, [session, status, router]);
    
    return <NewTransactionTemplate />;
}