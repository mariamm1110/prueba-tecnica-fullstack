import Header from "../atomic-design/organisms/Header";
import Sidebar from "../atomic-design/organisms/Sidebar";
import UserTable from "../atomic-design/organisms/UserTable";


const UsersTemplate = () => {
    return (
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
    
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
    
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
              <UserTable />
            </main>
          </div>
        </div>
      );
}

export default UsersTemplate;