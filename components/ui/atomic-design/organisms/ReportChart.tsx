import { GET_REPORT } from "@/graphql/reports/frontedQueries"
import { useQuery } from "@apollo/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const ReportChart = () => {
    const { loading, error, data } = useQuery(GET_REPORT);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const chartData = data.getReport.monthlyTransactions.map((item:any) => ({
        month: item.month,
        Ingresos: item.income,
        Gastos: -Math.abs(item.expenses)
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-dblue text-xl">Reporte Financiero</CardTitle>
                <CardDescription className="text-[#F88DD5]">Movimientos mensuales</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="month"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="Ingresos" fill="#0F7055"/>
                        <Bar dataKey="Gastos" fill="#EC1D25"/>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default ReportChart;