import { useEffect, useState } from "react";
import axios from "axios";

const ActiveOrders = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/service-queue`
      );
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-booking-status/${id}`,
        { status: newStatus }
      );
      fetchBookings();
    } catch (error) {
      console.error("Status update failed", error);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <h2 className="text-2xl font-semibold mb-6">
        Active Service Orders
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-100 text-blue-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Service</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {bookings.map((booking, index) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{index + 1}</td>

                <td className="px-6 py-4">
                  <div className="font-semibold">{booking.customerName}</div>
                  <div className="text-gray-500 text-xs">{booking.phone}</div>
                </td>

                <td className="px-6 py-4">{booking.serviceName}</td>

                <td className="px-6 py-4">{booking.area}, {booking.city}</td>

                <td className="px-6 py-4">{booking.date || "-"}</td>

                <td className="px-6 py-4">{booking.time || "-"}</td>

                <td className="px-6 py-4 font-semibold">৳{booking.price}</td>

                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    booking.status === "paid"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}>
                    {booking.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-center space-x-2">
                  {booking.status === "paid" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(booking._id, "processing")
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Processing
                    </button>
                  )}
                  <button
                    onClick={() =>
                      handleStatusUpdate(booking._id, "completed")
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No Active Orders
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveOrders;