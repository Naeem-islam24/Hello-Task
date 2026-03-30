import { Link, useParams } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";

const PaymentFailed = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center border border-red-200">
        {/* Failure Icon */}
        <XCircleIcon className="w-20 h-20 text-red-500 mx-auto" />

        {/* Title */}
        <h1 className="text-3xl font-extrabold mt-6 text-red-700">
          Payment Failed
        </h1>

        {/* Booking ID */}
        <p className="mt-4 text-gray-700 text-lg">
          Your booking ID:{" "}
          <span className="font-mono font-semibold text-red-600">{id}</span> could not be processed.
        </p>

        {/* Description */}
        <p className="mt-2 text-gray-600 text-sm">
          Your payment was unsuccessful. Please try again or contact support for assistance.
        </p>

        {/* Action Button */}
        <Link
          to="/"
          className="mt-6 inline-block bg-red-500 hover:bg-red-600 text-white py-3 px-8 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailed;