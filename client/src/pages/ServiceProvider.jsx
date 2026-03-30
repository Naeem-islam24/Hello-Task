import { Link } from "react-router-dom";
import serviceImage from "../assets/images/service-png.avif";

const ServiceProvider = () => {
  return (
    <section className="bg-gray-100 py-8 mt-2 mb-2">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-6 animate-fade-in-up">
            
            <h2 className="text-4xl font-bold text-gray-800 leading-snug">
              Start As <span className="text-orange-500">Service Provider</span>
            </h2>

            <div className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">✔</span>
              <p className="text-gray-500 text-sm">
                It is a long established fact that a reader will be distracted 
                by the readable content of a page.
              </p>
            </div>

            <button  className="bg-orange-500 text-white px-6 py-3 rounded 
              transition-all duration-300 
              hover:bg-orange-600 
              hover:scale-105 
              hover:shadow-xl"> 
              <Link to='/provider-form'>Become Service Provider</Link>
              
            </button>

          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={serviceImage}
              alt="Tools"
              className="w-[480px] rounded-2xl shadow-lg 
              transition-all duration-500 
              hover:scale-105 hover:shadow-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceProvider;
