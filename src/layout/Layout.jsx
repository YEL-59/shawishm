import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { VisibilityProvider } from "../contexts/VisibilityContext";
import { AuthProvider } from "../contexts/AuthProvider";
import "../App.css";
import { PaginationProvider } from "../contexts/PaginationContext";
import { ModalProvider } from "../contexts/ModalContext";
import { DropdownProvider } from "../contexts/DropdownContext";
import { UserProvider } from "../contexts/UserProvider";

const Layout = () => {
  return (
    <AuthProvider>
      <UserProvider>
      <VisibilityProvider>
        <PaginationProvider>
          <ModalProvider>
            <DropdownProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar />
                <main className="flex-1 p-4 bg-gray-100 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
                  <Outlet />
                </main>
              </div>
            </div>
            </DropdownProvider>
          </ModalProvider>
        </PaginationProvider>
      </VisibilityProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default Layout;
