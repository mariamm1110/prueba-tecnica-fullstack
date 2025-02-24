
import Header from "../atomic-design/organisms/Header";
import Sidebar from "../atomic-design/organisms/Sidebar";
import TransactionForm from "../atomic-design/organisms/TransactionForm";


export default function NewTransactionTemplate() {
    return (
        <div className="flex min-h-screen">
            <Sidebar/>
            <main className="flex-1 flex flex-col">
                <Header/>
                <section className="p-8 flex-1 flex-justify-center items-center">
                    <TransactionForm/>
                </section>
            </main>
            
        </div>
    )
}