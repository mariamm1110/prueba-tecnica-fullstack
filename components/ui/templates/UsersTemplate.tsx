import Header from "../atomic-design/organisms/Header";
import Header2 from "../atomic-design/organisms/Header2";
import Sidebar from "../atomic-design/organisms/Sidebar";
import SideBarMenu from "../atomic-design/organisms/SidebarMenu-scn";
import UserTable from "../atomic-design/organisms/UserTable";
import { SidebarProvider } from "../sidebar";


const UsersTemplate = () => {
    return (
        <div className="flex h-screen bg-gray-50">
          <SidebarProvider>
          <SideBarMenu />
    
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header2 />
    
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
              <UserTable />
            </main>
          </div>
            
          </SidebarProvider>
        </div>
      );
}

export default UsersTemplate;