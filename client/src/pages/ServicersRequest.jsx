import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const ServicersRequest = () => {
  const { user, loading } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user?.firebaseUser) return;

    const fetchData = async () => {
      try {
        const token = await user.firebaseUser.getIdToken();
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/my-provider-status`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );

        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [user]);

  const getStatusStyle = (status) => {
    if (status === "approved")
      return "bg-green-500/10 text-green-600";
    if (status === "rejected")
      return "bg-red-500/10 text-red-600";
    return "bg-yellow-500/10 text-yellow-600";
  };

  if (loading || fetching) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-14 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            My Application Status
          </h2>
          <p className="text-gray-500 mt-3">
            Track your provider approval progress
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

          {data.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-gray-500 text-lg">
                No applications submitted yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">

                {/* Table Head */}
                <thead className="bg-indigo-50 text-indigo-700 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-8 py-5 text-left font-semibold">
                      Service
                    </th>
                    <th className="px-8 py-5 text-left font-semibold">
                      Applied
                    </th>
                    <th className="px-8 py-5 text-left font-semibold">
                      Last Updated
                    </th>
                    <th className="px-8 py-5 text-center font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-100">
                  {data.map((item) => {
                    const status = item.status || "pending";

                    return (
                      <tr
                        key={item._id}
                        className="hover:bg-indigo-50/40 transition duration-200"
                      >
                        <td className="px-8 py-6 font-medium text-gray-800">
                          {item.service || "N/A"}
                        </td>

                        <td className="px-8 py-6 text-gray-600">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString()
                            : "—"}
                        </td>

                        <td className="px-8 py-6 text-gray-600">
                          {item.updatedAt
                            ? new Date(item.updatedAt).toLocaleDateString()
                            : "—"}
                        </td>

                        <td className="px-8 py-6 text-center">
                          <span
                            className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold capitalize ${getStatusStyle(
                              status
                            )}`}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicersRequest;