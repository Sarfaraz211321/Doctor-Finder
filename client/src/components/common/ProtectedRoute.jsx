import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role = "user" }) => {
  const token =
    role === "admin"
      ? localStorage.getItem("adminToken")
      : localStorage.getItem("userToken");

  if (!token) {
    return (
      <Navigate
        to={role === "admin" ? "/admin/login" : "/login"}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;