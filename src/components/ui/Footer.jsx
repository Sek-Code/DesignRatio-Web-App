import { Link } from "react-router-dom"

const Footer = () => {

return (
    <footer className="bg-[#f6efe6] py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-9">
            <div className="flex items-center">
                <img src="image_Empty" alt="LOGO" className="h-25"/>
            </div>
        <div>
            <ul className="flex items-center justify-between gap-20 h-35 text-amber-950">
                <Link
                to="/"
                className="hover:text-[(--matcha-color)] transition-colors">Home
                </Link>

                <Link
                to="/blending"
                className="hover:text-[(--matcha-color)] transition-colors">Blending
                </Link>

                <Link
                to="/products"
                className="hover:text-[(--matcha-color)] transition-colors">Product
                </Link>

                <Link
                to="/contact"
                className="hover:text-[(--matcha-color)] transition-color">Contact
                </Link>
            </ul>
        </div>

            <div className="flex flex-col items-end md:text-right">
                <h3 className="nav-style h-6 rounded-full flex items-center justify-end text-amber-950">Contact Us</h3>
                <p className="flex justify-end">Address: 123 456 789</p>
                <p className="flex justify-end">Call: (+66) 123456789</p>
            </div>
        </div>
    </footer>
    );
};

export default Footer;