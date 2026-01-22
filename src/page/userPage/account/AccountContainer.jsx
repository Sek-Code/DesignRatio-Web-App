import { Navigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import AccountPage from "./AccountPage";


export default function AccountContainer () {
    const { currentUser } = useUserStore();

if (!currentUser) {
  return <Navigate to="/signin" />;
}

    return (
        <>
            <AccountPage />
        </>
    );
}