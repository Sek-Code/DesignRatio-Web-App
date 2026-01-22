import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, User, ShoppingCart, Menu, X } from "lucide-react";
import logoMark from "@/assets/img/Design-Ratio-logo.png";
import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import { Button } from "./button";

const navLinks = [
  { label: "Blending", to: "/blending" },
  { label: "Product", to: "/products" },
  { label: "Contact", to: "/contact" },
];

const adminLinks = [
  { label: "Revenue", to: "/admin/revenue" },
  { label: "Orders", to: "/admin/orders" },
  { label: "Members", to: "/admin/members" },
  { label: "Before-edit", to: `/admin/edit-products/` },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const currentUser = useUserStore((state) => state.currentUser);

  // Calculate total cart count
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Determine profile link based on login state
  const profileLink = currentUser ? "/account" : "/signin";
  const profileAriaLabel = currentUser ? "Profile" : "Sign In";

  // Show admin links only if user is logged in
  const showAdminLinks = !!currentUser;

  return (
    <header className="relative bg-lightCream text-brown font-body shadow-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-4 py-4 sm:flex sm:justify-between sm:px-6">
        <div className="col-start-2 col-end-3 flex items-center justify-center gap-2 sm:col-auto sm:justify-start sm:gap-3">
          <img
            src={logoMark}
            alt="Design Ratio logo"
            className="h-16 w-16 object-contain drop-shadow-sm sm:h-20 sm:w-20"
          />
        </div>

        <div className="ml-auto flex items-center justify-end gap-3 sm:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            className="cursor-pointer rounded-md p-2 text-matcha transition hover:text-brown focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-matcha"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-8 text-[16px] font-semibold text-matcha sm:flex">
          <Link to="/" className="nav-link flex items-center gap-2 transition cursor-pointer">
            <Home className="size-4" />
          </Link>

          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="nav-link transition cursor-pointer"
            >
              {item.label}
            </Link>
          ))}

          {showAdminLinks && adminLinks.map((item) => (
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
            to="/signin">
            <Button
                  type="button"
                  className="cursor-pointer bg-(--color-brown) hover:bg-(--color-matcha) text-white px-8 rounded-3xl text-base"
                >Login
            </Button>
          </Link>

          <Link
            to={profileLink}
            aria-label={profileAriaLabel}
            className="cursor-pointer rounded-full p-2 transition hover:text-brown"
          >
            <User className="size-5" />
          </Link>

          <Link
            to="/checkout"
            aria-label="Cart"
            className="cursor-pointer relative rounded-full p-2 transition hover:text-brown"
          >
            <ShoppingCart className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e45353] px-1 text-[11px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="sm:hidden">
          <div className="mx-4 mb-4 rounded-lg border border-border bg-white shadow-sm">
            <nav className="flex flex-col divide-y divide-border text-matcha text-center">
              <Link
                to="/"
                className="nav-link flex items-center justify-center gap-2 px-4 py-3 transition text-(--nav-size)"
                onClick={() => setOpen(false)}
              >
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

              {showAdminLinks && adminLinks.map((item) => (
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
                  to={profileLink}
                  aria-label={profileAriaLabel}
                  className="cursor-pointer rounded-full p-2 text-matcha transition hover:text-brown"
                  onClick={() => setOpen(false)}
                >
                  <User className="size-5" />
                </Link>

                <Link to="/signin">
                <button
                  type="button"
                  className="cursor-pointer text-(--color-brown) hover:text-(--color-matcha) px-6 py-0 rounded-3xl text-base"
                >Login</button>
                </Link>

                <Link
                  to="/checkout"
                  aria-label="Cart"
                  className="relative rounded-full p-2 text-matcha transition hover:text-brown"
                  onClick={() => setOpen(false)}
                >
                  <ShoppingCart className="size-5" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e45353] px-1 text-[11px] font-semibold text-white">
                      {cartCount}
                    </span>
                  )}
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
