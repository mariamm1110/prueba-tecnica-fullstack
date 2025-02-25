import ReportTemplate from "@/components/ui/templates/ReportTemplate";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ReportsPage: NextPage = () => {
    const {data: session, status} = useSession();
    const router = useRouter();

    if (status === "loading") return <p>Cargando...</p>

    if (!session || session.user.role !== "ADMIN") {
        router.push("/");
        return null;
    }

    return <ReportTemplate />
}

export default ReportsPage;