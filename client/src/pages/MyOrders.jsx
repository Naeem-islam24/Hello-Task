import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const MyOrders = () => {

  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const token = await user.firebaseUser.getIdToken();

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/my-orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOrders(res.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }

    };

    if (user) fetchOrders();

  }, [user]);


  const getStatusStyle = (status) => {

    switch (status) {

      case "paid":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "completed":
        return "bg-indigo-100 text-indigo-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-600";
    }

  };


  const handleCancel = async (id) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/cancel-order/${id}`
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? { ...order, status: "cancelled" }
            : order
        )
      );

    } catch (error) {
      console.log(error);
    }

  };


  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading your orders...
      </p>
    );
  }


  return (

    <div className="max-w-6xl mx-auto py-12 px-4">

      {/* Header */}

      <div className="flex justify-between items-center mb-10">

        <h2 className="text-3xl font-bold text-gray-800">
          My Orders
        </h2>

        <span className="px-4 py-1 bg-indigo-100 text-indigo-600 text-sm font-semibold rounded-full">
          {orders.length} Orders
        </span>

      </div>


      {orders.length === 0 ? (

        <div className="flex flex-col items-center justify-center text-center py-20 border rounded-xl bg-gray-50">

          <div className="text-6xl mb-4">📭</div>

          <h3 className="text-xl font-semibold text-gray-700">
            No Orders Yet
          </h3>

          <p className="text-gray-500 mt-2">
            When you book a service it will appear here.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="grid md:grid-cols-3 bg-white border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >

              {/* Image */}

              <div className="w-full md:w-64 h-52 bg-gray-100 flex-shrink-0">
                <img className="w-full h-full object-cover" src={order.serviceImage || "https://via.placeholder.com/400"} alt={order.serviceName} />
              </div>


              {/* Details */}
              <div className="md:col-span-2 p-6 flex flex-col justify-between">

                {/* Top */}

                <div>

                  <div className="flex justify-between items-start">

                    <h3 className="text-xl font-semibold text-gray-800">
                      {order.serviceName}
                    </h3>

                    <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </div>


                  {/* Info Grid */}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">

                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-500 text-xs">Date</p>
                      <p className="font-medium">{order.date}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-500 text-xs">Time</p>
                      <p className="font-medium">{order.time}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-500 text-xs">Area</p>
                      <p className="font-medium">{order.area}</p>
                    </div>

                    <div className="bg-indigo-50 p-3 rounded">
                      <p className="text-gray-500 text-xs">Price</p>
                      <p className="font-bold text-indigo-600">
                        ৳{order.price}
                      </p>
                    </div>

                  </div>

                </div>


                {/* Bottom */}

                <div className="flex justify-between items-center mt-6 text-sm text-gray-500">

                  <span>
                    Order ID: #{order._id.slice(-6)}
                  </span>

                  <div className="flex items-center gap-4">

                    <span>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>

                    {order.status !== "completed" &&
                      order.status !== "cancelled" && (

                        <button
                          onClick={() => handleCancel(order._id)}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1.5 rounded-md transition"
                        >
                          Cancel
                        </button>

                      )}

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default MyOrders;