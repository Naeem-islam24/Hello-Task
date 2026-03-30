/* eslint-disable react/prop-types */
import { NavLink, Outlet } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiPlusCircle,
  FiLogOut,
} from "react-icons/fi";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 grid grid-cols-1 md:grid-cols-[260px_1fr]">

      {/* Sidebar */}
      <aside className="bg-white border-r flex flex-col justify-between">

        {/* Top Section */}
        <div>
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-orange-500">
              HelloTask
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Admin Panel
            </p>
          </div>

          <nav className="p-4 space-y-2">
            <SidebarLink to="/dashboard" icon={<FiHome />} text="Dashboard" />
            <SidebarLink to="/dashboard/add-service" icon={<FiPlusCircle />} text="Add Service" />
            <SidebarLink to="/dashboard/services" icon={<FiShoppingBag />} text="Manage Services" />
            <SidebarLink to="/dashboard/bookings" icon={<FiShoppingBag />} text="Bookings" />
            <SidebarLink to="/dashboard/providers" icon={<FiUsers />} text="Providers" />
            <SidebarLink to="/dashboard/contact-messages"  icon={<FiUsers />} text="User Messages" />
          </nav>
        </div>

        {/* Bottom Logout */}
        <div className="p-4 border-t">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-500 transition font-medium">
            <FiLogOut />
            Logout
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <div className="flex flex-col">

        {/* Top Navbar */}
        <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-700">
            Dashboard
          </h1>

          <div className="text-sm text-gray-500">
            Welcome, Admin!
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

const SidebarLink = ({ to, icon, text }) => (
  <NavLink
    to={to}
    end={to === "/dashboard"}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
        isActive
          ? "bg-orange-50 text-orange-500"
          : "text-blue-600 hover:bg-blue-100"
      }`
    }
  >
    {icon}
    {text}
  </NavLink>
);

export default AdminLayout;