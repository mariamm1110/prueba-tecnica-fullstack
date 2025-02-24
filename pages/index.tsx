import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function Home() {
    const { session, loading } = useRequireAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Home - Protected</h1>
            <p>Welcome, {session?.user?.name}</p>
        </div>
    );
}

