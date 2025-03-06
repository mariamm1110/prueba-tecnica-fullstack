import { Context } from "@/types";



export const reportResolvers = {
    Query: {
        getReport: async (_: any, __: any, { db, authData }: Context) => {
            if ( !authData || authData.role !== "ADMIN" ) {
                throw new Error("Not authorized");
            }

            const transactions = await db.transaction.findMany();

            const totalIncome = transactions
                .filter(t => t.type==="INCOME")
                .reduce((acc, t) => acc + parseFloat(t.amount.toString()), 0);

            const totalExpenses = transactions
                .filter(t => t.type==="EXPENSE")
                .reduce((acc, t) => acc + parseFloat(t.amount.toString()), 0);

            const balance = totalIncome - totalExpenses;

            //objeto
            const monthlyData = transactions.reduce((acc: Record<string, { income: number; expenses: number }>, transaction) => {
                const month = new Date(transaction.date).toLocaleString("default", { month: "long" });


                if (!acc[month]) {
                    acc[month] = { income: 0, expenses: 0 };
                }
            
                if (transaction.type === "INCOME") {
                    acc[month].income += parseFloat(transaction.amount.toString());
                } else if (transaction.type === "EXPENSE") {
                    acc[month].expenses += parseFloat(transaction.amount.toString());
                }

                return acc;
            }, {});

            const monthsOrder = [
                "enero", "febrero", "marzo", "abril", "mayo", "junio",
                "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
              ];

              //array
            const monthlyTransactions = Object.entries(monthlyData).map(([month, values]) => ({
                month,
                income: values.income || 0,
                expenses: values.expenses || 0,
            }))
            //posicion de cada mes
            .sort((a, b) => monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month));

            return {
                summary: { totalIncome, totalExpenses, balance },
                monthlyTransactions,
            }
        },
    },
}