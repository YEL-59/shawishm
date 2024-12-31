import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { VisibilityProvider } from "../contexts/VisibilityContext";
import { AuthProvider } from "../contexts/AuthProvider";
import "../App.css";

const Layout = () => {
  return (
    <AuthProvider> 
      <VisibilityProvider>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Navbar />
            <main className="flex-1 p-4 bg-gray-100 overflow-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200"> 
              <Outlet />
            </main>
          </div>
        </div>
      </VisibilityProvider>
    </AuthProvider>
  );
};

export default Layout;
