import { Link } from "react-router-dom"
import Logo from "@/assets/img/Design-Ratio-logo.png"

const Footer = () => {

return (
    <footer className="bg-[#f6efe6] py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-5 flex flex-col md:flex-row items-center justify-between gap-9">

            <div className="flex flex-row items-center">
                <Link to="/"><img src={Logo} alt="LOGO" className="h-28 w-42"/></Link>
            </div>
        <div>
            <nav className="flex flex-col px-4 sm:px-6 md:flex-row items-center gap-x-24 lg:gap-y-16 text-amber-950">
                <Link
                to="/"
                className="hover:text-(--color-matcha) transition">Home
                </Link>

                <Link
                to="/blending"
                className="hover:text-(--color-matcha) transition">Blending
                </Link>

                <Link
                to="/product"
                className="hover:text-(--color-matcha) transition text-(--nav-size)">Product
                </Link>

                <Link
                to="/contact"
                className="hover:text-(--color-matcha) transition">Contact
                </Link>
            </nav>
        </div>

            <div className="flex flex-col px-1 h-auto sm:px-3 sm:text-xl items-center justify-center md:items-end text-center md:text-right">
                <h3 className="rounded-full flex items-center justify-center md:justify-end text-amber-950">Contact Us</h3>
                <p className="flex">Address: 123 456 789</p>
                <p className="flex">Call: (+66) 123456789</p>
            </div>
        </div>
    </footer>
    );
};

export default Footer;
