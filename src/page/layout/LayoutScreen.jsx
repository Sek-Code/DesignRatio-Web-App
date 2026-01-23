import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import { Outlet } from "react-router-dom";

const LayoutScreen = () => {
    return(
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
};
export default LayoutScreen;
