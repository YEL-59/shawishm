
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../page/home/Home";
import Setting from "../page/setting/Setting";
import Logout from "../page/logout/Logout";
import Patient from "../page/patient/Patient";
import Login from "../page/login/Login";
import PrivateRoute from "../components/PrivateRoute";
import Profile from "../page/profile/Profile";


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
        element: (
          <PrivateRoute> <Patient /></PrivateRoute>


        ),
      },
      {
        path: "settings",
        element: (
          <PrivateRoute> <Setting /></PrivateRoute>


        ),
       
      },
      {
        path: "/profile",
        element: <Profile />, 
      },

    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;

