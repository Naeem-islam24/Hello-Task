import { Link } from "react-router-dom";
import serviceImage from "../assets/images/service-png.avif";

const ServiceProvider = () => {
  return (
    <section className="bg-gray-50 py-10 mt-2">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* Left Content */}
          <div className="lg:w-1/2 space-y-6">
            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 leading-snug 
              animate-fade-in-up">
              Start As <span className="text-orange-500">Service Provider</span>
            </h2>

            {/* Features / Points */}
            <div className="space-y-3 animate-fade-in-up delay-200">
              <div className="flex items-start gap-3">
                <span className="text-orange-500 mt-1 text-xl">✔</span>
                <p className="text-gray-600 text-sm lg:text-base">
                  Join our platform and offer your services to a wide range of customers.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500 mt-1 text-xl">✔</span>
                <p className="text-gray-600 text-sm lg:text-base">
                  Manage your schedule, orders, and earnings efficiently with our dashboard.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500 mt-1 text-xl">✔</span>
                <p className="text-gray-600 text-sm lg:text-base">
                  Grow your business with verified reviews and easy customer access.
                </p>
              </div>
            </div>

            {/* Button */}
            <div className="pt-4 animate-fade-in-up delay-400">
              <Link to='/provider-form' className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 
                text-white px-8 py-3 rounded-lg font-semibold shadow-lg
                transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                Become Service Provider
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 flex justify-center animate-fade-in-up delay-300">
            <img
              src={serviceImage}
              alt="Tools"
              className="w-[400px] lg:w-[500px] rounded-3xl shadow-xl 
                transition-transform duration-700 hover:scale-105 hover:rotate-1 hover:shadow-2xl"
            />
          </div>

        </div>
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          .animate-fade-in-up {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.8s forwards;
          }
          .animate-fade-in-up.delay-200 {
            animation-delay: 0.2s;
          }
          .animate-fade-in-up.delay-300 {
            animation-delay: 0.3s;
          }
          .animate-fade-in-up.delay-400 {
            animation-delay: 0.4s;
          }
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default ServiceProvider;