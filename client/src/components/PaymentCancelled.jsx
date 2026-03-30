import { Link, useParams } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid"; // Use this instead

const PaymentCancelled = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center border border-yellow-200">
        <XCircleIcon className="w-20 h-20 text-yellow-500 mx-auto" />
        <h1 className="text-3xl font-extrabold mt-6 text-yellow-700">
          Payment Cancelled
        </h1>
        <p className="mt-4 text-gray-700 text-lg">
          Your booking ID:{" "}
          <span className="font-mono font-semibold text-yellow-600">{id}</span> has been cancelled.
        </p>
        <p className="mt-2 text-gray-600 text-sm">
          You can try booking again anytime.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-8 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancelled;