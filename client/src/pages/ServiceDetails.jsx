// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const ServiceDetails = () => {
//   const { id } = useParams();
//   const [service, setService] = useState(null);
//   const [activeTab, setActiveTab] = useState("Overview");
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_API_URL}/service/${id}`)
//       .then((res) =>{

//         setService(res.data);
//         console.log("Service Data:", res.data);
//       } );

//   }, [id]);

//   if (!service) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   const { title, bannerImage, rating, subServices, description, faq } = service;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       {/* Header */}
//       <h1 className="text-2xl font-semibold">{title}</h1>
//       <p className="text-sm text-gray-600 mt-1">
//         ⭐ {rating} | 5 services available
//       </p>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
//         {/* LEFT SIDEBAR */}
//         <div className="border rounded-md p-4">
//           <h2 className="font-semibold mb-3">Select a service</h2>

//           <div className="space-y-3">
//             {subServices?.map((item, i) => (
//               <div
//                 key={i}
//                 className="flex items-center gap-3 border rounded p-2 cursor-pointer hover:bg-gray-50"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-12 h-12 object-cover rounded"
//                 />
//                 <div>
//                   <p className="text-sm font-medium">{item.name}</p>
//                   <p className="text-xs text-gray-500">Starts from ৳{item.price}</p>
//                   <button onClick={() => navigate(`/booking/${id}/${item._id}`)} className="btn btn-primary btn-xs">
//                     Book Appointment
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT CONTENT */}
//         <div className="lg:col-span-3">

//           <img
//             src={bannerImage}
//             alt={title}
//             className="w-full h-72 object-center rounded-md"
//           />

//           {/* Tabs */}
//           <div className="flex gap-3 mt-4 border-b">
//             {["Overview", "FAQ", "How to Order", "Review"].map(
//               (tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-4 py-2 text-sm font-medium ${activeTab === tab
//                     ? "border-b-2 border-blue-600 text-blue-600"
//                     : "text-gray-600"
//                     }`}
//                 >
//                   {tab}
//                 </button>
//               )
//             )}
//           </div>

//           {/* TAB CONTENT */}
//           <div className="mt-5">
//             {/* OVERVIEW */}
//             {activeTab === "Overview" && (
//               <div className="border rounded-md p-5 bg-green-50">
//                 <h3 className="font-semibold mb-2">Overview of {title}</h3>
//                 <p className="text-sm text-gray-700 mb-3">{description}</p>

//                 <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
//                   <li>Only service charge</li>
//                   <li>7 days service warranty</li>
//                   <li>Transportation cost may apply</li>
//                 </ul>
//               </div>
//             )}

//             {/* FAQ */}
//             {activeTab === "FAQ" && (
//               <div className="space-y-3 border rounded-md p-5 bg-green-50">
//                 {faq?.map((f, i) => (
//                   <div key={i}>
//                     <p className="text-sm font-semibold">Q. {f.question}</p>
//                     <p className="text-sm text-gray-700 mt-1">{f.answer}</p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* HOW TO ORDER FULL SECTION */}
//             {activeTab === "How to Order" && (
//               <div className="space-y-6 text-sm text-gray-700">

//                 {/* How to Order Section */}
//                 <div className="border rounded-md p-5 bg-green-50">
//                   <h3 className="text-lg font-semibold mb-3 ">How to order</h3>

//                   <ul className="space-y-2 leading-6">
//                     <li>• Select service: From the category, select the service you are looking for.</li>
//                     <li>• Book your schedule: Select your convenient time slot.</li>
//                     <li>• Place order: Confirm your order by clicking ‘Place order’.</li>
//                   </ul>
//                 </div>

//                 {/* Safety Box */}
//                 <div className="border rounded-md p-5 bg-green-50">
//                   <div className="flex items-center gap-4 mb-3">
//                     <img
//                       src="https://i.ibb.co.com/S450Yfbh/badge.png"
//                       alt="Safety Badge"
//                       className="w-44"
//                     />
//                   </div>

//                   <ul className="space-y-2 leading-6">
//                     <li>• Checked Health condition of service specialist</li>
//                     <li>• Ensuring use of masks, hand sanitisers, gloves, etc</li>
//                     <li>• Disinfecting equipment before and after the work</li>
//                     <li>• Maintaining social distancing</li>
//                   </ul>
//                 </div>
//               </div>
//             )}

//             {/* REVIEW */}
//             {activeTab === "Review" && (
//               <p className="text-sm text-gray-700">No reviews available yet.</p>
//             )}


//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceDetails;


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/service/${id}`)
      .then((res) => {
        setService(res.data);
        console.log("Service Data:", res.data);
      })
      .catch(err => console.error("Error fetching service:", err));
  }, [id]);

  if (!service) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const { title, bannerImage, rating, subServices, description, faq } = service;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-gray-600 mt-1">
        ⭐ {rating} | {subServices?.length || 0} services available
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        {/* LEFT SIDEBAR */}
        <div className="border rounded-md p-4">
          <h2 className="font-semibold mb-3">Select a service</h2>

          <div className="space-y-4">
            {subServices?.map((item) => {
              const subServiceId = item._id || crypto.randomUUID(); // Temporary ID
              return (
                <div
                  key={subServiceId}
                  className="flex items-center gap-6 border rounded p-2 cursor-pointer hover:bg-gray-50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-14 object-cover rounded"
                  />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Starts from ৳{item.price}
                    </p>
                    <button
                      onClick={() => navigate(`/booking/${id}/${subServiceId}`)}
                      className="btn btn-primary btn-xs"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-3 space-y-5">
          <img
            src={bannerImage}
            alt={title}
            className="w-full h-72 object-center rounded-md"
          />

          {/* Tabs */}
          <div className="flex gap-3 border-b">
            {["Overview", "FAQ", "How to Order", "Review"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium ${activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div>
            {activeTab === "Overview" && (
              <div className="border rounded-md p-5 bg-green-50">
                <h3 className="font-semibold mb-2">Overview of {title}</h3>
                <p className="text-sm text-gray-700 mb-3">{description}</p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>Only service charge</li>
                  <li>7 days service warranty</li>
                  <li>Transportation cost may apply</li>
                </ul>
              </div>
            )}

            {activeTab === "FAQ" && (
              <div className="space-y-3 border rounded-md p-5 bg-green-50">
                {faq?.map((f, i) => (
                  <div key={i}>
                    <p className="text-sm font-semibold">Q. {f.question}</p>
                    <p className="text-sm text-gray-700 mt-1">{f.answer}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "How to Order" && (
              <div className="space-y-6 text-sm text-gray-700">
                <div className="border rounded-md p-5 bg-green-50">
                  <h3 className="text-lg font-semibold mb-3">How to order</h3>
                  <ul className="space-y-2 leading-6">
                    <li>
                      • Select service: From the category, select the service you
                      are looking for.
                    </li>
                    <li>
                      • Book your schedule: Select your convenient time slot.
                    </li>
                    <li>
                      • Place order: Confirm your order by clicking ‘Place order’.
                    </li>
                  </ul>
                </div>

                <div className="border rounded-md p-5 bg-green-50">
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src="https://i.ibb.co.com/S450Yfbh/badge.png"
                      alt="Safety Badge"
                      className="w-44"
                    />
                  </div>
                  <ul className="space-y-2 leading-6">
                    <li>• Checked Health condition of service specialist</li>
                    <li>• Ensuring use of masks, hand sanitisers, gloves, etc</li>
                    <li>• Disinfecting equipment before and after the work</li>
                    <li>• Maintaining social distancing</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "Review" && (
              <p className="text-sm text-gray-700">No reviews available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
