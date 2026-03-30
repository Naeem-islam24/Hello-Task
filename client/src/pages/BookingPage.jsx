import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const BookingPage = () => {

  const { user } = useContext(AuthContext)

  const { serviceId, subId } = useParams();

  const [service, setService] = useState(null);
  const [subService, setSubService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("Bangladesh");
  const [city, setCity] = useState("Dhaka");
  const [area, setArea] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/service/${serviceId}`
        );
        setService(res.data);
        const selected = res.data.subServices?.find((s) => s._id === subId);
        if (!selected) setError("Sub Service not found");
        else setSubService(selected);
      } catch (err) {
        setError("Failed to load service data");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [serviceId, subId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!subService) return null;

  const handleBooking = async () => {
    if (!name || !phone || !address || !date || !time || !area) {
      alert("Please fill all fields");
      return;
    }

    const bookingData = {
      serviceId,
      subServiceId: subId,
      serviceName: subService.name,
      serviceImage: subService.image,
      price: subService.price,
      customerName: name,
      customerEmail: user?.firebaseUser?.email,
      phone,
      address,
      country,
      city,
      area,
      date,
      time,
      createdAt: new Date(),
      status: "pending",
    };

    try {
      // 1️⃣ Save booking
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        bookingData
      );

      // Create payment
      const payment = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-payment/${data.insertedId}`
      );

      // Redirect to SSLCommerz
      window.location.href = payment.data.url;

      // Reset form
      setName("");
      setPhone("");
      setAddress("");
      setArea("");
      setDate("");
      setTime("");
    }
    catch (err) {
      console.log(err);
      alert("Booking or Payment failed!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="grid md:grid-cols-6 gap-6">
        {/* LEFT SIDE */}
        <div className="md:col-span-4 space-y-3 ">
          {/* Service Info Card */}
          <div className="flex items-center gap-4 border rounded-lg p-3 shadow-sm">
            <img
              src={subService.image}
              alt={subService.name}
              className="w-40 h-28 object-cover rounded-md"
            />
            <div>
              <h2 className="text-lg font-medium">{subService.name}</h2>
              <p className="text-gray-500 text-xs">{service?.name}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="border rounded-lg p-2 space-y-3 bg-gray-50">
            <h3 className="font-medium text-base">Booking Information</h3>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-1 rounded text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border p-1 rounded text-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Full Address"
              className="w-full border p-1 rounded text-sm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="border rounded-lg p-2 space-y-3 bg-gray-50">
            <h3 className="font-medium text-base">Location</h3>
            <div className="grid md:grid-cols-3 gap-3">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="border p-1 rounded text-sm"
              >
                <option>Bangladesh</option>
              </select>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border p-1 rounded text-sm"
              >
                <option>Dhaka</option>
                <option>Chittagong</option>
              </select>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="border p-1 rounded text-sm"
              >
                <option value="">Select Area</option>
                <option>Dhanmondi</option>
                <option>Mirpur</option>
                <option>Uttara</option>
                <option>Mohammadpur</option>
              </select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="border rounded-lg p-2 space-y-3 bg-gray-50">
            <h3 className="font-medium text-base">Date & Time</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="date"
                className="border p-1 rounded text-sm"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="time"
                className="border p-1 rounded text-sm"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="md:col-span-2 border rounded-lg p-6 bg-gray-50 h-fit shadow-sm">
          <h3 className="font-medium text-base mb-3">Booking Summary</h3>
          <div className="flex justify-between text-sm mb-2">
            <span>{subService.name}</span>
            <span>৳{subService.price}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-sm">
            <span>Total</span>
            <span>৳{subService.price}</span>
          </div>
          <button
            onClick={handleBooking}
            className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-medium text-sm transition"
          >
            Confirm & Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;