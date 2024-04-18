import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { isExpiredToken } from "@/hooks/useAuth";

function RequireAuth() {
  const token = localStorage.getItem("token");
  const isTokenExpired = isExpiredToken();
  const getUser = () => {
    if (!token) return false;
    if (isTokenExpired) return false;
    if (token === undefined) {
      localStorage.removeItem("token");
    }
    return true;
  };

  return (
    <>
      {getUser() ? <Outlet /> : <Navigate to="/" />}
      <Toaster />
    </>
  );
}

export default RequireAuth;
