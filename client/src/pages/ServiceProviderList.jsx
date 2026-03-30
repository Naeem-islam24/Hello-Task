import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ServiceProviderList = () => {
  const [providers, setProviders] = useState([]);

  const fetchProviders = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/form-data`
    );
    setProviders(res.data);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-provider-status/${id}`,
        { status }
      );
      toast.success(`Provider ${status} successfully`);
      fetchProviders();
    } catch {
      toast.error("Status update failed");
    }
  };

  const getStatusStyle = (status) => {
    if (status === "approved")
      return "bg-green-100 text-green-700";
    if (status === "rejected")
      return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h2 className="text-3xl font-bold text-center mb-2">
        Provider Management
      </h2>

      <p className="text-center text-gray-500 mb-8">
        Total Applications: {providers.length}
      </p>

      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="min-w-full">

          <thead className="bg-blue-50 text-sm uppercase text-blue-600 border-b">
            <tr>
              <th className="py-4 px-6 text-left">Provider</th>
              <th className="py-4 px-6 text-left">Service</th>
              <th className="py-4 px-6 text-left">Applied Date</th>
              <th className="py-4 px-6 text-center">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {providers.map((provider) => {
              const status = provider.status || "pending";

              return (
                <tr key={provider._id} className="border-b hover:bg-gray-50">

                  {/* Provider Info */}
                  <td className="py-4 px-6 flex items-center gap-3">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-medium">{provider.name}</p>
                      <p className="text-sm text-gray-500">
                        {provider.email}
                      </p>
                    </div>
                  </td>

                  {/* Service */}
                  <td className="py-4 px-6">
                    {provider.service}
                  </td>

                  {/* Applied Date */}
                  <td className="py-4 px-6">
                    {provider.createdAt
                      ? new Date(provider.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(status)}`}
                    >
                      {status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right space-x-2">

                    <button
                      disabled={status === "approved"}
                      onClick={() =>
                        handleStatus(provider._id, "approved")
                      }
                      className={`px-4 py-1 rounded-md text-sm text-white transition ${
                        status === "approved"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      Accept
                    </button>

                    <button
                      disabled={status === "rejected"}
                      onClick={() =>
                        handleStatus(provider._id, "rejected")
                      }
                      className={`px-4 py-1 rounded-md text-sm text-white transition ${
                        status === "rejected"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      Reject
                    </button>

                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ServiceProviderList;