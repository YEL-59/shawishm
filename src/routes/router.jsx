import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../page/home/Home";
import Setting from "../page/setting/Setting";
import Logout from "../page/logout/Logout";
import Patient from "../page/patient/Patient";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "patients",
        element: <Patient/>,
      },
      {
        path: "settings",
        element: <Setting />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
