
import Header from "../atomic-design/organisms/Header";
import Header2 from "../atomic-design/organisms/Header2";
import Sidebar from "../atomic-design/organisms/Sidebar";
import SideBarMenu from "../atomic-design/organisms/SidebarMenu-scn";
import TransactionForm from "../atomic-design/organisms/TransactionForm";
import { SidebarProvider } from "../sidebar";



export default function NewTransactionTemplate() {
    return (
        <div className="flex min-h-screen bg-cream">
            <SidebarProvider>
            <SideBarMenu/>
            <main className="flex-1 flex flex-col">
                <Header2/>
                <section className="p-8 flex-1 flex-justify-center items-center">
                    <TransactionForm/>
                </section>
            </main>
            </SidebarProvider>
            
        </div>
    )
}