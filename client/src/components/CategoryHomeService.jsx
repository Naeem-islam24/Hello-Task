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
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/all-services`
        );
        setServices(data);
    };

    // FOR YOUR HOME
    const forYourHomeServices = services.filter(
        (s) => s.category === "Ac Solution" || s.category === "Cleaning Solution" || s.category === "Shifting Solution" || s.category === "Maid Service"
    );

    // TRENDING (temporary: only AC service shown)
    const trendingServices = services.filter(
        (s) => s.category === "Ac Solution" || s.category === "Painting & Renovation"
    );

    // RECOMMENDED
    const recommendedServices = services.filter(
        (s) =>
            s.category !== "Ac Solution" &&
            s.category !== "Cleaning Solution" && 
            s.category !== "Painting & Renovation"
    );
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
                {forYourHomeServices.slice(0, 8).map((service) => (
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
                {trendingServices.slice(0, 4).map((service) => (
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
                {recommendedServices.slice(0, 4).map((service) => (
                    <ServiceCard key={service._id} service={service} />
                ))}
            </div>


        </div>
    );
};

export default CategoryHomeService;