/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const PostedServiceList = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);

  // Fetch services for logged-in user
  const fetchAllServices = async () => {
    try {
      if (!user?.firebaseUser) return; // safety check
      const token = await user.firebaseUser.getIdToken(); // ✅ Correct

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-services`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setServices(data);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Failed to fetch services");
    }
  };

  useEffect(() => {
    if (user?.firebaseUser) {
      fetchAllServices();
    }
  }, [user]);

  // Delete Functionality
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/service/${id}`);
      setServices((prev) => prev.filter((service) => service._id !== id));
      toast.success("Service Deleted Successfully!");
    } catch {
      toast.error("Delete Failed!");
    }
  };

  // Modern Toast Confirm Delete
  const modernDelete = (id) => {
    toast.custom((t) => (
      <div className="bg-white shadow-xl border rounded-lg px-6 py-4 flex items-center gap-4">
        <p className="text-gray-700 font-medium">
          Are you sure you want to delete?
        </p>
        <div className="flex gap-2 ml-auto">
          <button
            className="bg-red-500 text-white px-4 py-1 text-sm rounded-md hover:bg-red-600"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-1 text-sm rounded-md hover:bg-gray-300"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          My Posted Services
        </h2>
        <span className="px-4 py-1 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full">
          {services.length} Services
        </span>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-100 text-blue-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Description</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {services.length > 0 ? (
                services.map((service) => (
                  <tr key={service._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {service.title}
                    </td>
                   
                    <td className="px-6 py-4 text-indigo-600 font-semibold">
                      ${service?.subServices?.[0]?.price || "0"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                        {service.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                      {service.description}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => modernDelete(service._id)}
                          className="text-red-500 hover:text-red-600 transition"
                        >
                          Delete
                        </button>
                        <Link
                          to={`/update/${service._id}`}
                          className="text-yellow-500 hover:text-yellow-600 transition"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">
                    No Services Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PostedServiceList;