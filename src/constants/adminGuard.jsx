import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AdminGuard() {
  const { currentUser, loading, authChecked, checkAuth } = useUserStore();
  const location = useLocation();

  // On hard refresh, App triggers checkAuth in an effect (after first render).
  // This guard must wait until auth has been checked, otherwise it will
  // redirect to /signin and then bounce to /account.
  useEffect(() => {
    if (!authChecked && !loading) {
      checkAuth();
    }
  }, [authChecked, loading, checkAuth]);

  if (!authChecked || loading) return <div>Loading...</div>;

  if (!currentUser) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
