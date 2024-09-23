import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import Donation from "./pages/Donation";
import Crisis from "./pages/Crisis";
import Volunteer from "./pages/Volunteer";
import Inventory from "./pages/Inventory";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import VolunteerManagement from "./pages/AdminManagement/VolunteerManagement";
import CrisisManagement from "./pages/AdminManagement/CrisisManagement";
import ReportManagement from "./pages/AdminManagement/ReportManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "donation",
        element: <Donation />,
      },
      {
        path: "crisis",
        element: <Crisis />,
      },
      {
        path: "volunteer",
        element: <Volunteer />,
      },
      {
        path: "inventory",
        element: <ProtectedRoute allowedRoles={["admin", "volunteer"]} />,
        children: [
          {
            index: true,
            element: <Inventory />,
          },
        ],
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "admin",
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "volunteer",
            element: <VolunteerManagement />,
          },

          {
            path: "crisis",
            element: <CrisisManagement />,
          },

          {
            path: "report",
            element: <ReportManagement />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

export default router;
