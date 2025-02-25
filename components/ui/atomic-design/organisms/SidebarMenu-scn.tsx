import {
    Sidebar,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
  } from '@/components/ui/sidebar';
  import SidebarButton from '../atoms/SidebarButton';
  import Button from '../atoms/Button';
  import { signOut, useSession } from 'next-auth/react';
  import Image from 'next/image';
import { Calendar, ChartColumnBig, ContactRound, HandCoins, Home, HomeIcon, Inbox } from 'lucide-react';
import { NavUser } from '../molecules/nav-user';


  const SideBarMenu = () => {

    const { data: session } = useSession();

      const items = [
          {
            title: "Ingresos y Gastos",
            url: "/transactions",
            icon: HandCoins,
          },
          {
            title: "Usuarios",
            url: "/users",
            icon: ContactRound,
          },
          {
            title: "Reportes",
            url: "/reports",
            icon: ChartColumnBig,
          },
          {
            title: "Inicio",
            url: "/",
            icon: HomeIcon,
          },
        ]

    return (
        <Sidebar className='!bg-blue '>
            <SidebarHeader >
                <img src="https://comunidad.retorn.com/wp-content/uploads/cache/2018/09/gatitos/1583254719.jpg" alt="gatito" />
            </SidebarHeader>

            <SidebarContent className="flex-1 py-10 text-dblue font-josefin">

                <SidebarGroup>
                    <SidebarGroupLabel className="text-lg font-semibold text-pink mb-4">Aplicación</SidebarGroupLabel>
                        <SidebarGroupContent className="flex-1 py-2">
                            <SidebarMenu>
                                {items.map((item) => (
                                  <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton 
                                    asChild 
                                    className='w-full flex items-center gap-4 text-gray-700 hover:bg-white hover:shadow-md hover:text-pink transition-all p-5 rounded-lg text-lg font-semibold whitespace-normal break-words'>
                                      <a href={item.url}  >
                                        <item.icon  className="h-6 w-6"/>
                                        <span className="break-words whitespace-normal text-left w-full">{item.title}</span>
                                      </a>
                                    </SidebarMenuButton>
                                          </SidebarMenuItem>
                                ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter>
                {/* <Button
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
                /> */}
                
                <NavUser user={{
                    name: session?.user.name || 'Guest',
                    email: session?.user.email || 'guest@example.com',
                    avatar: session?.user.image || '/default-avatar.png'
                }}/>
            </SidebarFooter>
        </Sidebar>
    );
  };

  export default SideBarMenu;