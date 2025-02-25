import { signOut } from 'next-auth/react';
import Button from '../atoms/Button';
import SidebarButton from '../atoms/SidebarButton';


export default function SidebarMenu() {
    return (
        <div className='flex flex-col w-full bg-gray-200 px-2 py-4 justify-between'>
            <div>

            <div className='text-xl font-bold text-center mb-6'>LOGO</div>
            <nav className='flex flex-col space-y-2'>
                <SidebarButton label='Ingresos y Egresos' href='/transactions' />
                <SidebarButton label='Usuarios' href='/users' />
                <SidebarButton label='Reportes' href='/reports' />
            </nav>
            </div>

            <Button
                className="bg-red-500 hover:bg-red-600"
                label="Cerrar Sesión"
                onClick={() =>
                    signOut({
                    callbackUrl: `https://${process.env.AUTH0_ISSUER}/v2/logout?returnTo=${encodeURIComponent(
                        `https://${process.env.AUTH0_ISSUER}/authorize?response_type=code&client_id=${process.env.AUTH0_CLIENT_ID}&redirect_uri=${encodeURIComponent(
                        'http://localhost:3000/api/auth/callback/auth0'
                        )}`
                    )}&client_id=${process.env.AUTH0_CLIENT_ID}`,
                    })
                }
            />
        </div>
    );
}