import { useContext } from "react";
import logo from "../assets/images/Logo-Gpt.png";
import { AuthContext } from "../providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg font-medium transition ${
      isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-base-300"
    }`;

  return (
    <div className="navbar bg-base-100 shadow-md px-5 sticky top-0 z-50">

      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2">
          <img className="h-9" src={logo} alt="Logo" />
          <span className="font-bold text-lg">HelloTask</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-2">
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
        <NavLink to="/all-services" className={navLinkClass}>All Services</NavLink>
        <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

        {!user && (
          <NavLink
            to="/registration"
            className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-focus transition"
          >
            Register
          </NavLink>
        )}
      </div>

      {/* User Profile Dropdown */}
      {user && (
        <div className="dropdown dropdown-end ml-3">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full border">
              <img
                referrerPolicy="no-referrer"
                src={user?.firebaseUser?.photoURL || "/fallback-avatar.png"}
                alt="User"
              />
            </div>
          </div>

          {/* Dropdown Menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-64 p-2 shadow-xl bg-base-100 rounded-xl border"
          >
            {/* User Info */}
            <div className="px-3 py-2 border-b mb-2">
              <p className="font-semibold text-gray-800">
                {user?.firebaseUser?.displayName || "User"}
              </p>
              <p className="text-xs text-gray-400">
                {user?.firebaseUser?.email}
              </p>
            </div>

            {/* Dropdown Links */}
            <li>
              <Link
                to="/servicers-approval"
                className="flex items-center gap-3 hover:bg-base-200 rounded-lg"
              >
                📄 My Applications
              </Link>
            </li>

            <li>
              <Link
                to="/my-orders"
                className="flex items-center gap-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
              >
                🧾 My Orders
              </Link>
            </li>

            <li>
              <NavLink
                to="/track-orders"
                className="flex items-center gap-3 hover:bg-green-50 hover:text-green-600 rounded-lg"
              >
                🚚 Track Order
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/review-form"
                className="flex items-center gap-3 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg"
              >
                ⭐ Write Review
              </NavLink>
            </li>

            {user?.role === "admin" && (
              <>
                <div className="divider my-1"></div>
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 text-red-500 font-semibold hover:bg-red-50 rounded-lg"
                  >
                    ⚙️ Admin Dashboard
                  </Link>
                </li>
              </>
            )}

            <div className="divider my-1"></div>
            <li>
              <button
                onClick={logOut}
                className="flex items-center gap-3 hover:bg-base-200 rounded-lg"
              >
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Menu */}
      <div className="dropdown lg:hidden ml-2">
        <label tabIndex={0} className="btn btn-ghost">☰</label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content right-0 mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/all-services">All Services</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          {!user && <li><NavLink to="/registration">Register</NavLink></li>}

          {/* Mobile User Dropdown Links */}
          {user && (
            <>
              <li><Link to="/servicers-approval">📄 My Applications</Link></li>
              <li><Link to="/my-orders">🧾 My Orders</Link></li>
              <li><Link to="/track-orders">🚚 Track Order</Link></li>
              <li><Link to="/review-form">⭐ Write Review</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;