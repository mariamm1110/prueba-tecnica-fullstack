import { useRouter } from "next/router";
import Header from "../atomic-design/organisms/Header";
import Header2 from "../atomic-design/organisms/Header2";
import Sidebar from "../atomic-design/organisms/Sidebar";
import SideBarMenu from "../atomic-design/organisms/SidebarMenu-scn";

import TransactionTable from "../atomic-design/organisms/TransactionTable";
import { SidebarProvider } from "../sidebar";
import { useSession } from "next-auth/react";
import { Button } from "../button";
import HCard from "../atomic-design/organisms/HCard";




const HomeTemplate = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const showButton = router.pathname !== "/transactions/new" && session?.user.role === "ADMIN";
  return (

    
    <div className="flex h-screen bg-gray-50">
      <SidebarProvider>
      <SideBarMenu />

      <div className="flex flex-col flex-1 overflow-hidden bg-cream">
        <Header2 />

        <main className="flex items-center justify-center min-h-screen bg-cream">
            <div className="grid grid-cols-3 gap-6">
                <HCard title={"Gestión de ingresos y gastos"} description={"Visualiza los ingresos y egresos"} icon={""} url={"/transactions"}/>

                {session && session.user.role === "ADMIN" && (
                    <>
                    <HCard
                      title="Gestión de usuarios"
                      description="Administra tus usuarios"
                      icon=""
                      url="/users"
                    />
                    <HCard
                      title="Reportes"
                      description="Visualiza reportes detallados"
                      icon=""
                      url="/reports"
                    />
                  </>
                )}

            </div>

        </main>
      </div>

      </SidebarProvider>
    </div>
  );
};

export default HomeTemplate;
