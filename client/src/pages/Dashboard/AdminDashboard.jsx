/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import {
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiCheckCircle,
} from "react-icons/fi";

const AdminDashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.firebaseUser) return;

      try {
        const token = await user.firebaseUser.getIdToken();
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin-stats`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (authLoading || statsLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg font-semibold text-gray-500">
        Loading Dashboard...
      </div>
    );
  }

  const StatCard = ({ title, value, icon }) => (
    <div className="bg-white border rounded-2xl p-6 hover:shadow-lg transition flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold mt-2 text-gray-800">{value}</h2>
      </div>
      <div className="text-orange-500 text-4xl">{icon}</div>
    </div>
  );

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Dashboard Overview
        </h2>
        <p className="text-gray-500 mt-2">
          Here’s what’s happening in your platform today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Services"
          value={stats.totalServices}
          icon={<FiShoppingBag />}
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={<FiCheckCircle />}
        />
        <StatCard
          title="Providers"
          value={stats.totalProviders}
          icon={<FiUsers />}
        />
        {/* <StatCard
          title="Revenue"
          value={`৳${stats.totalRevenue}`}
          icon={<FiDollarSign />}
        /> */}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white border rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">
          Recent Bookings
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {stats.recentBookings?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400">
                    No Recent Bookings
                  </td>
                </tr>
              ) : (
                stats.recentBookings.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4 font-medium">
                      {b.customerName}
                    </td>
                    <td className="px-4 py-4">
                      {b.serviceName}
                    </td>
                    <td className="px-4 py-4 font-semibold">
                      ৳{b.price}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          b.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;