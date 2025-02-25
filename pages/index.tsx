import HomeTemplate from "@/components/ui/templates/HomeTemplate";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function Home() {
    const { session, loading } = useRequireAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <HomeTemplate/>
    );
}

