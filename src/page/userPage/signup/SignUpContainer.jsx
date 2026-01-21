import { useUserStore } from "@/store/userStore";
import SignUpPage from "./SignUpPage";



export default function SignUpContainer () {
    const { currentUser } = useUserStore();

if (currentUser) {
  return <Navigate to="/account" />;
}

    return (
    <>
        <SignUpPage />
    </>
    );
}