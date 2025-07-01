import React from "react";
import { Link } from "react-router-dom";
import { NAME } from "../utils/Common";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  let token = sessionStorage.getItem(NAME);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 text-xl font-bold text-blue-900">
            SmartTask Hub
          </div>
          {token ? (
            <div className="hidden md:flex space-x-4">
              <button className="px-4 py-2 rounded hover:bg-blue-50 text-blue-800 font-medium">
                Logout{" "}
              </button>{" "}
            </div>
          ) : (
            <div className="hidden md:flex space-x-4">
              <Link to={"/"}>
                <button className="px-4 py-2 rounded hover:bg-blue-50 text-blue-800 font-medium">
                  Task{" "}
                </button>{" "}
              </Link>
              <Link to={"/login"}>
                <button className="px-4 py-2 rounded hover:bg-blue-50 text-blue-800 font-medium">
                  Login{" "}
                </button>{" "}
              </Link>
              <Link to={"/register"}>
                <button className="px-4 py-2 rounded hover:bg-blue-50 text-blue-800 font-medium">
                  Register{" "}
                </button>{" "}
              </Link>
            </div>
          )}
          <div className="md:hidden">
            {/* Mobile menu button */}
            <button
              className="text-blue-600 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link to={"/"}>
              <button className="px-4 py-2 rounded hover:bg-blue-50 text-blue-800 font-medium">
                Task{" "}
              </button>{" "}
            </Link>
            <Link to={"/register"}>
              <button className="px-4 py-2 rounded hover:bg-blue-50 text-blue-800 font-medium">
                Register{" "}
              </button>{" "}
            </Link>
            <Link to={"/login"}>
              <button className="px-4 py-2 rounded hover:bg-blue-50 text-blue-800 font-medium">
                Login{" "}
              </button>{" "}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
