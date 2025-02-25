import { useQuery } from "@apollo/client";

import { useSession } from "next-auth/react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { PiggyBank } from "lucide-react";
import { Avatar, AvatarImage } from "../../avatar";


const Header2 = () => {

    const { data: session } = useSession();

    return (

    <header className="flex items-center justify-between px-6 py-3 bg-amarillito shadow-md">
      
      
      <div className="flex items-center">
        <PiggyBank size={50} strokeWidth={2} color="#FD5C32"/> 
      </div>

      
      <nav className="flex gap-6">
        <a className="text-3xl font-josefin font-bold text-dblue">Sistema de gestion de Ingresos y Gastos</a>
      </nav>

      
      <div className="flex items-center">
        <Avatar>
            <AvatarImage src={session?.user.image ?? undefined}/>
            <AvatarFallback>{session?.user.name[0]}</AvatarFallback>
        </Avatar>
      </div>

    </header>
    )

}

export default Header2;