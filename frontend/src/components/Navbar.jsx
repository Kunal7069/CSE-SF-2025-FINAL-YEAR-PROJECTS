import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { UserRound } from "lucide-react";

const Navbar = () => {
  const companyLogo =
    "https://ik.imagekit.io/mcxbnqee6/ChatGPT%20Image%20Apr%2017,%202025,%2002_49_25%20PM.png?updatedAt=1744881620804";

  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    handleStorageChange();
    window.addEventListener("userChanged", handleStorageChange);
    return () => {
      window.removeEventListener("userChanged", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.dispatchEvent(new Event("userChanged"));
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    } else {
      params.delete("search");
    }
    navigate({
      pathname: "/",
      search: params.toString(),
    });
    setMenuOpen(false);
  };

  return (
    <nav className="w-full bg-[#1B4242] shadow-md text-white z-50 relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-nowrap items-center justify-between gap-2 overflow-x-auto">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={companyLogo} alt="Logo" className="w-10 rounded-md" />
          <h1 className="hidden sm:block text-2xl font-bold text-gray-200 hover:text-white">
            GuideCircle
          </h1>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="w-full sm:w-auto flex-1 flex justify-center"
        >
          <div className="flex w-full sm:max-w-xl rounded-full overflow-hidden bg-white shadow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search your requirement here"
              className="flex-1 px-4 py-2 text-black placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#6D8B74] px-4 flex items-center justify-center hover:bg-[#5F7161] transition"
            >
              <FaSearch className="text-white" />
            </button>
          </div>
        </form>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-4 whitespace-nowrap">
          <NavLink
            to="/contact"
            className="hover:text-white font-semibold text-gray-300"
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-white font-semibold text-gray-300"
          >
            About Us
          </NavLink>
          {!user ? (
            <NavLink
              to="/signin/expert"
              className="bg-[#6D8B74] px-4 py-2 rounded-lg hover:bg-[#5F7161] font-semibold"
            >
              Login
            </NavLink>
          ) : (
            <>
              <NavLink
                to={`/profileExport/${user._id}`}
                className="flex items-center gap-2 bg-[#6D8B74] px-4 py-2 rounded-lg hover:bg-[#5F7161] font-semibold text-white"
              >
                <UserRound size={18} />
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 text-white font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-xl focus:outline-none"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
  <div className="absolute top-full right-5  w-60 bg-white text-gray-800 rounded-xl shadow-2xl backdrop-blur-md z-50 flex flex-col divide-y divide-gray-200 overflow-hidden">
    <NavLink
      to="/contact"
      onClick={() => setMenuOpen(false)}
      className="px-5 py-3 hover:bg-gray-100 transition-all duration-200 font-medium"
    >
      Contact Us
    </NavLink>
    <NavLink
      to="/about"
      onClick={() => setMenuOpen(false)}
      className="px-5 py-3 hover:bg-gray-100 transition-all duration-200 font-medium"
    >
      About Us
    </NavLink>
    {!user ? (
      <NavLink
        to="/signin/expert"
        onClick={() => setMenuOpen(false)}
        className="px-5 py-3 bg-[#6D8B74] hover:bg-[#5F7161] font-semibold text-white duration-200"
      >
        Login
      </NavLink>
    ) : (
      <>
        <NavLink
          to={`/profileExport/${user._id}`}
          onClick={() => setMenuOpen(false)}
          className="px-5 py-3 bg-[#6D8B74] hover:bg-[#5F7161] transition-all duration-200 font-semibold flex items-center gap-2"
        >
          <UserRound size={18} />
          Profile
        </NavLink>
        <button
          onClick={() => {
            handleLogout();
            setMenuOpen(false);
          }}
          className="px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold transition-all duration-200"
        >
          Logout
        </button>
      </>
    )}
  </div>
)}

    </nav>
  );
};

export default Navbar;
