
import { ShieldCheck, Headphones, Hand, HandHeart } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <div className="w-full mt-4 bg-gray-100 py-10 px-6 flex flex-col items-center">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <p className="text-sm tracking-widest text-gray-400 font-medium">
          WHY CHOOSE US
        </p>
        <h2 className="text-4xl font-bold mt-2 text-gray-800">
          Because we care about your safety..
        </h2>
      </div>

      {/* Main Content Layout */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10 items-center">
        {/* Left - Icon Boxes */}
        <div className="grid grid-cols-2 gap-6">
          <div className="shadow-md rounded-xl p-5 border-0 bg-white flex items-center gap-3">
            <ShieldCheck className="w-10 h-10 text-pink-600" />
            <h3 className="font-semibold text-gray-800 text-lg">Ensuring Masks</h3>
          </div>

          <div className="shadow-md rounded-xl p-5 border-0 bg-white flex items-center gap-3">
            <Headphones className="w-10 h-10 text-pink-600" />
            <h3 className="font-semibold text-gray-800 text-lg">24/7 Support</h3>
          </div>

          <div className="shadow-md rounded-xl p-5 border-0 bg-white flex items-center gap-3">
            <Hand className="w-10 h-10 text-pink-600" />
            <h3 className="font-semibold text-gray-800 text-lg">
              Sanitising Hands & Equipment
            </h3>
          </div>

          <div className="shadow-md rounded-xl p-5 border-0 bg-white flex items-center gap-3">
            <HandHeart className="w-10 h-10 text-pink-600" />
            <h3 className="font-semibold text-gray-800 text-lg">Ensuring Gloves</h3>
          </div>
        </div>

        {/* Right - Image */}
        <div className="w-full">
          <img
            src="https://i.ibb.co.com/dJGSFm9j/pest-control-expert-smiling-dressed-professional-uniform-stands-home-845404-989.avif"
            alt="safety workers"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10  w-full mt-4">
        <div className="bg-pink-50 shadow-md p-5 rounded-2xl hover:scale-105 transition duration-300">
          <h3 className="text-4xl font-bold text-pink-600">15,000 +</h3>
          <p className="text-gray-600 mt-2 text-lg">Service Providers</p>
        </div>

        <div className="bg-purple-50 shadow-md p-5 rounded-2xl hover:scale-105 transition duration-300">
          <h3 className="text-4xl font-bold text-purple-600">2,00,000 +</h3>
          <p className="text-gray-600 mt-2 text-lg">Order Served</p>
        </div>

        <div className="bg-blue-50 shadow-md p-5 rounded-2xl hover:scale-105 transition duration-300">
          <h3 className="text-4xl font-bold text-blue-600">1,00,000 +</h3>
          <p className="text-gray-600 mt-2 text-lg">5 Star Received</p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
