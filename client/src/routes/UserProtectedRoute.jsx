import { Navigate, Outlet } from "react-router-dom";

const UserProtectedRoute = () => {
  const userToken = localStorage.getItem("userToken");

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;