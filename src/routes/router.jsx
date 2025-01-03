
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../page/home/Home";
import Setting from "../page/setting/Setting";
import Logout from "../page/logout/Logout";
import Patient from "../page/patient/Patient";
import Login from "../page/login/Login";
import PrivateRoute from "../components/PrivateRoute";
import Profile from "../page/profile/Profile";
import Editstudy from "../components/editstydy/Editstudy";
import AssignStudy from "../components/assignstudy/AssignStudy";
import MergePatient from "../components/mergepatient/MergePatient";


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
          // <PrivateRoute> <Patient /></PrivateRoute>
          <Patient />

        ),
      },
      {
        path: "settings",
        element: (
          // <PrivateRoute> <Setting /></PrivateRoute>

          <Setting />
        ),

      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/editstudy",
        element: <Editstudy />,
      },
      {
        path: "/assignstudy",
        element: <AssignStudy />,
      },
      {
        path: "/mergepatient",
        element: <MergePatient />,
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

