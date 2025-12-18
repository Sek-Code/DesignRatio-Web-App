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

// ใน Layout Screen มี NavBar และ Footer คือ “ช่องว่าง” ที่เอาไว้แสดงหน้า ลูก ถ้าไม่มีช่องนี้ → หน้าไม่โผล่