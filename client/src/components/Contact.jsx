import axios from "axios";
import toast from "react-hot-toast";
const Contact = () => {
  const handleSubmit =async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      message: form.message.value,
    };

    try {
    await axios.post(`${import.meta.env.VITE_API_URL}/contact-messages`,data);
    toast.success("Message Sent Successfully ✅");
    form.reset();
  } catch (error) {
    toast.error("Failed to send message ❌");
  }
  };

  return (
    <div className="w-full py-10 bg-white">

      {/* ==== TOP INFO CARDS ==== */}
      <div className="w-full grid  grid-cols-1 md:grid-cols-3 gap-6 mb-10 px-4">

        {/* Call Card */}
        <div className="card bg-gray-100 shadow p-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-200 text-orange-600 text-2xl">
              📞
            </div>
          </div>
          <h3 className="font-bold text-lg mb-1">Call Us</h3>
          <p className="text-sm">09638-300700</p>
          <p className="text-sm">01793-819047</p>
        </div>

        {/* Mail Card */}
        <div className="card bg-orange-50 shadow p-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-200 text-orange-600 text-2xl">
              ✉️
            </div>
          </div>
          <h3 className="font-bold text-lg mb-1">Mail Address</h3>
          <p className="text-sm">support@hellotaskbd.com</p>
          <p className="text-sm">support.hello@taskbd.com</p>
        </div>

        {/* Support Time */}
        <div className="card bg-blue-50 shadow p-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-200 text-blue-600 text-2xl">
              ⏰
            </div>
          </div>
          <h3 className="font-bold text-lg mb-1">Support Time</h3>
          <p className="text-sm">08.00am to 11.00pm</p>
        </div>

      </div>

      {/* ==== CONTACT FORM ==== */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 bg-gray-100 shadow rounded-lg"
      >
        <div className="mb-5">
          <label className="font-semibold">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-5">
          <label className="font-semibold">Your Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-5">
          <label className="font-semibold">Your Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Your Phone"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-5">
          <label className="font-semibold">Your Address</label>
          <input
            type="text"
            name="address"
            placeholder="Your Address"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="mb-6">
          <label className="font-semibold">Message</label>
          <textarea
            name="message"
            placeholder="Message"
            className="textarea textarea-bordered w-full mt-1 h-32"
          ></textarea>
        </div>

        <button className="btn bg-orange-500 hover:bg-orange-600 text-white px-6">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
