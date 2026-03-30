import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { Mail, Phone } from "lucide-react";

const ContactMessages = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user?.firebaseUser) return;

    const fetchMessages = async () => {
      try {
        const token = await user.firebaseUser.getIdToken();

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/contact-messages`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );

        setMessages(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Contact Messages
        </h2>
        <p className="text-gray-500 mt-1">
          Messages submitted from the contact form
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-700">
            No Messages Yet
          </h3>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="p-6 rounded-2xl bg-gradient-to-br from-white to-blue-50 border hover:shadow-xl transition duration-300"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                  {msg.name?.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {msg.name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                <Mail size={16} className="text-blue-500" />
                {msg.email}
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Phone size={16} className="text-green-500" />
                {msg.phone}
              </div>

              {/* Message */}
              <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                {msg.message}
              </p>

              {/* Footer */}
              <div className="mt-4 text-xs text-gray-400">
                {new Date(msg.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactMessages;