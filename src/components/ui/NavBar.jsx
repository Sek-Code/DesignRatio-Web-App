import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, User, ShoppingCart, Menu, X } from "lucide-react";
import logoMark from "@/assets/img/Design-Ratio-logo.png";

const navLinks = [
  { label: "Blending", to: "/blending" },
  { label: "Product", to: "/product" },
  { label: "Contact", to: "/contact" },
];

const adminLinks = [
  { label: "Revenue", to: "/admin/revenue" },
  { label: "Orders", to: "/admin/orders" },
  { label: "Edit Product", to: "/admin/edit-product" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative bg-lightCream text-brown font-body shadow-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-4 py-4 sm:flex sm:justify-between sm:px-6">
        <div className="col-start-2 col-end-3 flex items-center justify-center gap-2 sm:col-auto sm:justify-start sm:gap-3">
          <img
            src={logoMark}
            alt="Design Ratio mark"
            className="h-16 w-16 object-contain drop-shadow-sm sm:h-20 sm:w-20"
          />
        </div>

        <div className="ml-auto flex items-center justify-end gap-3 sm:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-matcha transition hover:text-brown focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-matcha"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-8 text-[15px] font-semibold text-matcha sm:flex">
          <Link to="/" className="nav-link flex items-center gap-2 transition">
            <Home className="size-4" />
            Home
          </Link>

          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="nav-link transition"
            >
              {item.label}
            </Link>
          ))}

          {adminLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="nav-link text-orange-600 transition hover:text-orange-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 text-matcha sm:flex">
          <Link
            to="/account"
            aria-label="Profile"
            className="rounded-full p-2 transition hover:text-brown"
          >
            <User className="size-5" />
          </Link>

          <Link
            to="/checkout"
            aria-label="Cart"
            className="relative rounded-full p-2 transition hover:text-brown"
          >
            <ShoppingCart className="size-5" />
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e45353] px-1 text-[11px] font-semibold text-white">
              2
            </span>
          </Link>
        </div>
      </div>

      {open && (
        <div className="sm:hidden">
          <div className="mx-4 mb-4 rounded-lg border border-border bg-white shadow-sm">
            <nav className="flex flex-col divide-y divide-border text-matcha text-center">
              <Link
                to="/"
                className="nav-link flex items-center justify-center gap-2 px-4 py-3 transition hover:bg-cream"
                onClick={() => setOpen(false)}
              >
                <Home className="size-4" />
                Home
              </Link>

              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="nav-link flex items-center justify-center px-4 py-3 transition hover:bg-cream"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-border px-4 py-2 text-sm font-semibold text-orange-600">
                Admin Pages
              </div>

              {adminLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="nav-link flex items-center justify-center px-4 py-3 text-orange-600 transition hover:bg-cream"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="flex items-center justify-between px-4 py-3">
                <Link
                  to="/account"
                  aria-label="Profile"
                  className="rounded-full p-2 text-matcha transition hover:text-brown"
                  onClick={() => setOpen(false)}
                >
                  <User className="size-5" />
                </Link>

                <Link
                  to="/checkout"
                  aria-label="Cart"
                  className="relative rounded-full p-2 text-matcha transition hover:text-brown"
                  onClick={() => setOpen(false)}
                >
                  <ShoppingCart className="size-5" />
                  <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e45353] px-1 text-[11px] font-semibold text-white">
                    2
                  </span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
