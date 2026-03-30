const OrderTracker = ({ status }) => {

  const steps = [
    { id: 1, name: "Pending", key: "pending" },
    { id: 2, name: "Paid", key: "paid" },
    { id: 3, name: "Processing", key: "processing" },
    { id: 4, name: "Completed", key: "completed" }
  ];

  const getCurrentStep = () => {
    if (status === "pending") return 1;
    if (status === "paid") return 2;
    if (status === "processing") return 3;
    if (status === "completed") return 4;
    return 0;
  };

  const currentStep = getCurrentStep();

  if (status === "cancelled") {
    return (
      <div className="mt-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm font-semibold">
        ❌ This order has been cancelled
      </div>
    );
  }

  return (

    <div className="mt-6">

      <div className="flex items-center justify-between relative">

        {steps.map((step, index) => {

          const active = step.id <= currentStep;

          return (

            <div key={step.id} className="flex-1 flex flex-col items-center relative">

              {index !== steps.length - 1 && (
                <div
                  className={`absolute top-4 left-1/2 w-full h-1 
                  ${step.id < currentStep ? "bg-green-500" : "bg-gray-200"}`}
                />
              )}

              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-xs text-white z-10
                ${active ? "bg-green-500" : "bg-gray-300"}`}
              >
                {step.id}
              </div>

              <p className="text-xs mt-2 text-gray-600">
                {step.name}
              </p>

            </div>

          );

        })}

      </div>

    </div>

  );
};

export default OrderTracker;