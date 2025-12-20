const Navbar = () => {
    return (
    <nav>
      <ul className="flex justify-between items-center w-full bg-orange-900 h-20 text-lg font-semibold text-white tracking-widest px-30">
        <div className="content-start">
            <li className="scale-60">
            <Link to="/">
            <img src="public\img\My-signature.png" alt="logo" />
            </Link>
            </li>
        </div>
        <div className="flex justify-center items-center gap-x-10">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/owner" className="hover:underline">
            Products
          </Link>
        </li>
        <li>
          <Link to="/owner" className="hover:underline">
            About
          </Link>
        </li>
        <li>
          <Link to="/owner" className="hover:underline">
            Reviews
          </Link>
        </li>
        </div>
        <li>
          <Link to="/" className="">
            <img src="" alt="cart" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;