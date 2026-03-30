import { useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const ServiceProviderForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // logged-in user

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.firebaseUser) {
      toast.error("You must be logged in!");
      return;
    }

    const form = e.target;

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const password = form.password.value.trim();
    const service = form.service.value;
    const address = form.address.value.trim();
    const imageFile = form.image.files[0];

    if (!name || !phone || !service || !address || !imageFile) {
      toast.error("Please fill all required fields and select an image");
      return;
    }

    try {
      // ✅ Step 1: Upload image to imgbb
      const imageData = new FormData();
      imageData.append("image", imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        imageData
      );

      const imageUrl = imgRes.data?.data?.url;

      if (!imageUrl) {
        toast.error("Image upload failed");
        return;
      }

      // ✅ Step 2: Get Firebase token
      const token = await user.firebaseUser.getIdToken();

      // ✅ Step 3: Send data to backend
      const providerData = {
        name,
        phone,
        password,
        service,
        address,
        image: imageUrl,
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/provider-formdata`,
        providerData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Provider Registered Successfully ✅");
      form.reset();
      navigate("/");

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <section className="bg-gray-100 py-16 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-lg">

        <h2 className="text-center text-3xl font-extrabold mb-10 
        bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 
        bg-clip-text text-transparent">
          Register & Join as a Service Provider
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Full Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          {/* Service Select */}
          <select
            name="service"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            required
          >
            <option value="">Select Service</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrician">Electrician</option>
            <option value="Cleaning">Cleaning</option>
            <option value="AC Repair">AC Repair</option>
            <option value="Car Wash">Car Wash</option>
          </select>

          {/* Address */}
          <input
            type="text"
            name="address"
            placeholder="Full Address"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          {/* Image Upload */}
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg 
            hover:bg-orange-600 transition duration-300 font-semibold text-lg"
          >
            Register Now
          </button>

        </form>
      </div>
    </section>
  );
};

export default ServiceProviderForm;