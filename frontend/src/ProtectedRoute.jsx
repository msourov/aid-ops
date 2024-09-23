/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "./utils/getToken";
import isAuthenticated from "./utils/isAuthenticated";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated: isAuth, role } = isAuthenticated();
  const token = getToken();

  if (!token || !isAuth) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
