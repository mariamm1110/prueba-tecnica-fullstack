
import { useQuery } from "@apollo/client";
import Header from "../atomic-design/organisms/Header";
import ReportChart from "../atomic-design/organisms/ReportChart";
import Sidebar from "../atomic-design/organisms/Sidebar";
import { GET_REPORT } from "@/graphql/reports/frontedQueries";
import Button from "../atomic-design/atoms/Button";
import SideBarMenu from "../atomic-design/organisms/SidebarMenu-scn";
import { SidebarProvider } from "../sidebar";
import Header2 from "../atomic-design/organisms/Header2";







const ReportTemplate = () => {

    const { data, loading, error } = useQuery(GET_REPORT);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { totalIncome, totalExpenses, balance } = data.getReport.summary;

    const handleDownloadCSV = () => {
        const csvContent = [
            ["Concepto", "Valor"],
            ["Ingresos Totales", totalIncome],
            ["Gastos Totales", totalExpenses],
            ["Saldo", balance],
        ]
            .map((e) => e.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href=url;
        link.download = "reporte-financiero.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex h-screen bg-pink">
            <SidebarProvider>
                <div className="w-[16rem] bg-blue">  
                    <SideBarMenu />
                </div>
    
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header2 />
    
            <main className="flex-1 overflow-auto bg-gray-100 p-4 gap-4 bg-cream">
                <div className="flex gap-4 items-start">
                    <div className="flex-1">
                        <ReportChart />
                    </div>
                    <div className="w-1/4 bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center gap-4">
                        <div>
                            <h3 className="text-xl font-semibold text-pink">Saldo Total</h3>
                            <p className="text-2xl font bold text-db">
                                ${balance.toLocaleString("es-CO")}
                            </p>
                        </div>

                        <Button label="Descargar CSV" onClick={handleDownloadCSV} className="bg-orange"/>
                    </div>
                </div>
            </main>
          </div>
            </SidebarProvider>
        </div>
      );
};

export default ReportTemplate;
