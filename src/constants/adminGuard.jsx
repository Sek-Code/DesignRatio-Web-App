import { useUserStore } from "@/store/userStore";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminGuard() {
  const { currentUser, loading } = useUserStore();

  if (loading) return <div>Loading...</div>;

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/403" replace />; // หรือหน้า home
  }

  return <Outlet />;
}
