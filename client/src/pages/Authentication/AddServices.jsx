import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createService } from "../api/serviceApi";

const AddServices = () => {
  const [startDate, setStartDate] = useState(new Date());

  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
    packages: []
  });

  const [packageItem, setPackageItem] = useState({
    name: "",
    price: "",
    packageImage: "",
    schedule: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createService(form);
    alert("Service Added Successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className="p-2 md:p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          Add Service
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Service Fields */}
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="title">
                Service Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-gray-700" htmlFor="image">
                Service Image URL
              </label>
              <input
                id="image"
                name="image"
                type="text"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>

            {/* Schedule (Date Picker) */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700">Schedule</label>
              <DatePicker
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setPackageItem({
                    ...packageItem,
                    schedule: date.toLocaleString(),
                  });
                }}
              />
            </div>

            <div>
              <label className="text-gray-700">Description</label>
              <textarea
                name="description"
                id="description"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
          </div>

          {/* Package Section */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-3">Add Package</h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="text-gray-700">Package Title</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setPackageItem({
                      ...packageItem,
                      name: e.target.value,
                    })
                  }
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                />
              </div>

              <div>
                <label className="text-gray-700">Package Image URL</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setPackageItem({
                      ...packageItem,
                      packageImage: e.target.value,
                    })
                  }
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                />
              </div>

              <div>
                <label className="text-gray-700">Price</label>
                <input
                  type="number"
                  onChange={(e) =>
                    setPackageItem({
                      ...packageItem,
                      price: e.target.value,
                    })
                  }
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                />
              </div>
            </div>

            {/* Add Package Button */}
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  packages: [...form.packages, packageItem],
                })
              }
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
            >
              Add Package
            </button>
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 bg-gray-700 text-white rounded-md hover:bg-gray-600">
              Save Service
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddServices;
