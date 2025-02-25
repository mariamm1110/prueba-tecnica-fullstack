import { useRouter } from "next/router";
import Header from "../atomic-design/organisms/Header";
import Header2 from "../atomic-design/organisms/Header2";
import Sidebar from "../atomic-design/organisms/Sidebar";
import SideBarMenu from "../atomic-design/organisms/SidebarMenu-scn";

import TransactionTable from "../atomic-design/organisms/TransactionTable";
import { SidebarProvider } from "../sidebar";
import { useSession } from "next-auth/react";
import { Button } from "../button";




const TransactionsTemplate = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const showButton = router.pathname !== "/transactions/new" && session?.user.role === "ADMIN";
  return (

    
    <div className="flex h-screen bg-gray-50">
      <SidebarProvider>
      <SideBarMenu />

      <div className="flex flex-col flex-1 overflow-hidden bg-cream">
        <Header2 />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 bg-cream">

          { showButton && (
          
              <Button
                  onClick={() => router.push('/transactions/new')}
                  className="bg-orange mb-5"
              >
                  Nuevo
              </Button>
          )}

          <TransactionTable />
        </main>
      </div>

      </SidebarProvider>
    </div>
  );
};

export default TransactionsTemplate;
