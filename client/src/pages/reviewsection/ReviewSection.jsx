import { useEffect, useState } from "react";
import axios from "axios";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const res = await axios.get("http://localhost:9000/reviews");
    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center gap-10 my-20 px-5">

      {/* LEFT IMAGE */}
      <div className="md:w-1/2">
        <img
          src="https://i.ibb.co.com/fY18JJZX/happy-female-courier-delivering-order-working-post-service-smiling-deliverywoman-red-cap-shirt-carry.jpg"
          className="rounded-xl shadow-lg w-full h-[470px] object-cover"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="md:w-1/2 overflow-hidden">

        <h3 className="text-orange-500 font-semibold flex items-center gap-2">
          ✨ Testimonials
        </h3>

        <h2 className="text-4xl font-bold mb-8 leading-snug">
          Trusted feedback from <span className="italic">HelloTask users!</span>
        </h2>

        {/* SCROLL AREA */}
        <div className="relative overflow-hidden">

         <div className="flex gap-6 w-max animate-scroll hover:[animation-play-state:paused]">
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="min-w-[350px] max-w-[350px] bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                {/* ⭐ Stars */}
                <div className="flex text-orange-400 mb-3 text-lg">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-600 mb-5 italic">
                  “{review.comment}”
                </p>

                {/* User */}
                <div className="flex items-center gap-3">
                  <img
                    src={review.image}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-sm text-gray-400">Verified User</p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;