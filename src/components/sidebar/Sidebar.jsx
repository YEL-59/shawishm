import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardIcon from "../../assets/icons/DashboardIcon";
import SettingIcon from "../../assets/icons/SettingIcon";
import Logout from "../../assets/icons/Logout";
import LogoIcon from "../../assets/icons/LogoIcon";
import PatientIcon from "../../assets/icons/PatientIcon";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Close the sidebar on route change in responsive mode
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { name: "Dashboard", icon: DashboardIcon, path: "/" },
        { name: "Patients", icon: PatientIcon, path: "/patients" },
        { name: "Settings", icon: SettingIcon, path: "/settings" },
        { name: "Logout", icon: Logout, path: "/logout" },
    ];

    return (
        <>
            {/* Sidebar Toggle Button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-500 text-white rounded-md shadow-md"
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
            >
                ☰
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 w-64 bg-[#ffffff] text-gray-800 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 sidebar-transition z-50 lg:relative lg:flex lg:flex-col shadow-lg`}
            >
                {/* Logo Section with Close Icon */}
                <div className="flex items-center justify-between md:justify-center p-4">
                    <h1 className="text-2xl font-bold flex items-center justify-center">
                        <LogoIcon />
                    </h1>
                    <button
                        className="lg:hidden text-gray-800 text-2xl"
                        onClick={toggleSidebar}
                        aria-label="Close Sidebar"
                    >
                        ×
                    </button>
                </div>

                {/* Navigation Links */}
                <nav aria-label="Sidebar Navigation" className="flex-1 overflow-y-auto p-4">
                    {menuItems.map(({ name, icon: Icon, path }) => (
                        <NavLink
                            key={name}
                            to={path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 p-3 rounded-md mb-4 transition ${
                                    isActive
                                        ? "bg-[#00CCFF] text-white"
                                        : " hover:bg-gray-100 text-[#4C4C4C]"
                                }`
                            }
                        >
                            <span className="text-lg">
                                <Icon isActive={({ isActive }) => isActive} />
                            </span>
                            <span className="text-sm font-medium">{name}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
