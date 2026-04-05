import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "./ServiceCard";

const CategoryHomeService = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    try {
      // Fetch all services for Home page without limit
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/home-services` // <- new backend endpoint
      );
      setServices(Array.isArray(data.services) ? data.services : []);
    } catch (err) {
      console.error("Failed to fetch services:", err);
      setServices([]);
    }
  };

  // FOR YOUR HOME (8 cards)
  const forYourHomeServices = services
    .filter(
      (s) =>
        s.category === "Ac Solution" ||
        s.category === "Cleaning Solution" ||
        s.category === "Shifting Solution" ||
        s.category === "Maid Service" ||
        s.category === "Health Care"      
    )
    .slice(0, 8); // only first 8 cards

  // TRENDING (4 cards)
  const trendingServices = services
    .filter(
      (s) => s.category === "Ac Solution" ||
             s.category === "Painting & Renovation" ||
             s.category === "Health Care"      

    )
    .slice(0, 4);

  // RECOMMENDED (4 cards)
  const recommendedServices = services
    .filter(
      (s) =>
        s.category !== "Ac Solution" &&
        s.category !== "Cleaning Solution" &&
        s.category !== "Painting & Renovation"
    )
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-6">

      {/* FOR YOUR HOME */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">For Your Home</h2>
        <Link
          to="/all-services"
          className="text-blue-600 text-sm font-semibold hover:underline"
        >
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {forYourHomeServices.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>

      {/* TRENDING */}
      <div className="flex justify-between items-center mt-8 mb-3">
        <h2 className="text-lg font-bold">Trending</h2>
        <Link
          to="/all-services"
          className="text-blue-600 text-sm font-semibold hover:underline"
        >
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trendingServices.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>

      {/* RECOMMENDED */}
      <div className="flex justify-between items-center mt-8 mb-3">
        <h2 className="text-lg font-bold">Recommended</h2>
        <Link
          to="/all-services"
          className="text-blue-600 text-sm font-semibold hover:underline"
        >
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendedServices.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>

    </div>
  );
};

export default CategoryHomeService;