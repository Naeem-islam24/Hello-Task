import { useState } from "react";
import ActiveOrders from "./ActiveOrders";
import CompletedOrders from "./CompletedOrders";

const AdminBookings = () => {
    const [activeTab, setActiveTab] = useState("active");

    const tabs = [
        { key: "active", label: "Active Orders" },
        { key: "completed", label: "Completed Orders" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-xl sm:text-4xl font-bold text-gray-900 mb-2">
                Bookings Control Panel
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mb-4">
                View and manage all active and completed service bookings.
            </p>

            {/* Tabs */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 mb-3 border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2 rounded-t-lg font-normal text-sm sm:text-base transition-colors ${activeTab === tab.key
                                ? "bg-orange-500 text-white shadow"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-2">
                {activeTab === "active" && <ActiveOrders />}
                {activeTab === "completed" && <CompletedOrders />}
            </div>
        </div>
    );
};

export default AdminBookings;