import { useRouter } from "next/router"
import Button from '../atoms/Button';
import { useSession } from "next-auth/react";


const Header = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const showButton = router.pathname !== "/transactions/new" && session?.user.role === "ADMIN";
    console.log(session?.user);

    return (
        
        <header className="p-6 border-b flex justify-between items-center">
            <h1 className="text-2xl font-bold">
                Sistema de gestión de Ingresos y Gastos
            </h1>

            { showButton && (

                <Button
                    onClick={() => router.push('/transactions/new')}
                    label="Nuevo"
                >

                </Button>
            )}

        </header>
    );
};

export default Header;