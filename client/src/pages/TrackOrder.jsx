import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import OrderTracker from "../components/OrderTracker";

const TrackOrder = () => {

  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {

      const token = await user.firebaseUser.getIdToken();

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrders(res.data);
    };

    if (user) fetchOrders();

  }, [user]);

  return (

    <div className="max-w-5xl mx-auto py-12 px-4">

      <h2 className="text-3xl font-bold mb-10">
        Track Your Orders
      </h2>

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order._id}
            className="bg-white border rounded-xl p-6 shadow"
          >

            <div className="flex justify-between mb-4">

              <div>

                <h3 className="text-lg font-semibold">
                  {order.serviceName}
                </h3>

                <p className="text-sm text-gray-500">
                  Order ID: #{order._id.slice(-6)}
                </p>

              </div>

              <p className="font-semibold text-indigo-600">
                ৳{order.price}
              </p>

            </div>

            <OrderTracker status={order.status} />

          </div>

        ))}

      </div>

    </div>
  );
};

export default TrackOrder;