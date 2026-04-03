/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const ReviewForm = ({ refreshReviews }) => {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const reviewData = {
      name: form.name.value,
      image: form.image.value,
      comment: form.comment.value,
      rating
    };

    try {
      await axios.post("http://localhost:9000/reviews", reviewData);
      form.reset();
      setRating(5);
      refreshReviews && refreshReviews(); // auto refresh
      alert("Review Added ✅");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-16 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          required
          placeholder="Your Name"
          className="w-full border p-2 rounded"
        />

        <input
          name="image"
          required
          placeholder="Your Image URL"
          className="w-full border p-2 rounded"
        />

        <textarea
          name="comment"
          required
          placeholder="Your Comment"
          className="w-full border p-2 rounded"
        ></textarea>

        {/* ⭐ Rating Input */}
        <div className="flex gap-2 text-2xl text-orange-400 cursor-pointer">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={star <= rating ? "opacity-100" : "opacity-30"}
            >
              ★
            </span>
          ))}
        </div>

        <button className="bg-orange-500 text-white px-4 py-2 rounded w-full">
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;