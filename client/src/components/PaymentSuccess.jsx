import { Link, useParams } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const PaymentSuccess = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center border border-green-200">
        {/* Success Icon */}
        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto" />

        {/* Title */}
        <h1 className="text-3xl font-extrabold mt-6 text-green-700">
          Payment Successful!
        </h1>

        {/* Booking ID */}
        <p className="mt-4 text-gray-700 text-lg">
          Your booking ID:{" "}
          <span className="font-mono font-semibold text-green-600">{id}</span>
        </p>

        {/* Description */}
        <p className="mt-2 text-gray-600 text-sm">
          Thank you for your payment. Your booking has been confirmed. You will receive a confirmation email shortly.
        </p>

        {/* Action Button */}
        <Link
          to="/"
          className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;