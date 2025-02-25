import { signOut } from "next-auth/react";
import Button from "../atoms/Button";
import Logo from "../atoms/Logo"
import SidebarMenu from "../molecules/SidebarMenu"


const Sidebar = () => {
    return(

    <aside className="flex flex-col h-screen overflow-y-auto">
        <div>
            <div className="mb-8">
                <Logo />
                <img src="https://e7.pngegg.com/pngimages/779/61/png-clipart-logo-idea-cute-eagle-leaf-logo-thumbnail.png" alt="" className="w-full h-auto" />
            </div>
            <SidebarMenu />
        </div>
        
    </aside>
    )
}

export default Sidebar;