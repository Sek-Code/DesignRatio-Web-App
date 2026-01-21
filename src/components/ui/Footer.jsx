import { Link } from "react-router-dom";
import Logo from "@/assets/img/Design-Ratio-logo.png";

const Footer = () => {
  return (
    <footer className="bg-(--color-cream) py-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-5 flex flex-col lg:flex-row items-center justify-between gap-9">
        <div className="flex flex-row items-center shrink-0">
          <Link to="/">
            <img
              src={Logo}
              alt="LOGO"
              className="h-16 w-16 object-contain drop-shadow-sm sm:h-20 sm:w-20"
            />
          </Link>
        </div>
        <div>
          <nav className="flex flex-col lg:px-4 px-6 lg:flex-row items-center lg:gap-x-20 gap-y-3 text-(--color-brown) mb-6 lg:mb-0">
            <Link to="/" className="hover:text-(--color-matcha) transition">
              Home
            </Link>

            <Link
              to="/blending"
              className="hover:text-(--color-matcha) transition"
            >
              Blending
            </Link>

            <Link
              to="/product"
              className="hover:text-(--color-matcha) transition"
            >
              Product
            </Link>

            <Link
              to="/contact"
              className="hover:text-(--color-matcha) transition"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex flex-col lg:px-1 h-auto px-3 lg:text-xl justify-center items-center lg:items-end lg:text-center text-right gap-y-1">
          <p className="rounded-full flex items-center lg:justify-center justify-end text-(--color-brown) font-bold font-display">
            Contact Us
          </p>
          <p className="flex">Address: 123 456 789</p>
          <p className="flex">Call: (+66) 123456789</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
