/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateService = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [service, setService] = useState({});
    const [subServices, setSubServices] = useState([]);
    const [faqList, setFaqList] = useState([]);

    // Sub-service states
    const [subItem, setSubItem] = useState({
        name: "",
        image: "",
        ton: "",
        price: ""
    });
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        loadService();
    }, []);

    const loadService = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/service/${id}`
        );
        setService(data);
        setSubServices(data.subServices || []);
        setFaqList(data.faq || []);
    };

    // 🔹 ADD or UPDATE subService (same button)
    const handleSubService = () => {
        if (!subItem.name) return;

        if (editIndex !== null) {
            const updated = [...subServices];
            updated[editIndex] = subItem;
            setSubServices(updated);
            setEditIndex(null);
        } else {
            setSubServices([...subServices, subItem]);
        }

        setSubItem({ name: "", image: "", ton: "", price: "" });
    };

    // 🔹 FINAL UPDATE (same style as AddService)
    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedData = {
            ...service,
            title: form.title.value,
            bannerImage: form.bannerImage.value,
            rating: parseFloat(form.rating.value),
            category: form.category.value,
            description: form.description.value,
            subServices,
            faq: faqList
        };

        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/update-service/${id}`,
                updatedData
            );
            toast.success("Service Updated Successfully!");
            navigate("/posted-service-list");
        } catch (err) {
            toast.error("Update failed");
        }
    };

    return (
        <div className="max-w-3xl mx-auto my-8 p-6 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Update Service</h2>

            <form onSubmit={handleUpdate}>
                {/* MAIN INFO */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <input
                        name="title"
                        defaultValue={service.title}
                        className="border p-2"
                        placeholder="Service Title"
                    />
                    <input
                        name="bannerImage"
                        defaultValue={service.bannerImage}
                        className="border p-2"
                        placeholder="Banner Image URL"
                    />
                    <input
                        name="rating"
                        type="number"
                        step="0.1"
                        defaultValue={service.rating}
                        className="border p-2"
                        placeholder="Rating"
                    />
                </div>

                {/* CATEGORY */}
                <select
                    name="category"
                    defaultValue={service.category}
                    className="border p-2 w-full mt-4"
                >
                    <option>Ac Solution</option>
                    <option>Cleaning Solution</option>
                    <option>Shifting Solution</option>
                    <option>Health Care</option>
                    <option>Electric Solution</option>
                    <option>Maid Service</option>
                    <option>Painting & Renovation</option>
                </select>

                {/* DESCRIPTION */}
                <textarea
                    name="description"
                    defaultValue={service.description}
                    rows="2"
                    className="border p-2 w-full mt-4"
                ></textarea>

                {/* SUB-SERVICE FORM */}
                <h3 className="text-lg font-semibold mt-6">Sub Service</h3>

                <div className="grid sm:grid-cols-2 gap-3 mt-2">
                    <input
                        placeholder="Name"
                        className="border p-2"
                        value={subItem.name}
                        onChange={(e) =>
                            setSubItem({ ...subItem, name: e.target.value })
                        }
                    />
                    <input
                        placeholder="Image URL"
                        className="border p-2"
                        value={subItem.image}
                        onChange={(e) =>
                            setSubItem({ ...subItem, image: e.target.value })
                        }
                    />
                    <input
                        placeholder="Ton / Type"
                        className="border p-2"
                        value={subItem.ton}
                        onChange={(e) =>
                            setSubItem({ ...subItem, ton: e.target.value })
                        }
                    />
                    <input
                        placeholder="Price"
                        type="number"
                        className="border p-2"
                        value={subItem.price}
                        onChange={(e) =>
                            setSubItem({ ...subItem, price: e.target.value })
                        }
                    />
                </div>

                <button
                    type="button"
                    onClick={handleSubService}
                    className="bg-blue-600 text-white px-4 py-2 mt-3 rounded"
                >
                    {editIndex !== null ? "Update Sub-Service" : "Add Sub-Service"}
                </button>

                {/* SUB-SERVICE LIST */}
                {subServices.map((s, i) => (
                    <div key={i} className="border p-3 mt-3 rounded">
                        <p className="font-bold">{s.name}</p>
                        <p>{s.ton}</p>
                        <p>${s.price}</p>

                        <button
                            type="button"
                            className="bg-yellow-500 text-white px-3 py-1 mr-2 mt-2 rounded"
                            onClick={() => {
                                setEditIndex(i);
                                setSubItem(s);
                            }}
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
                            onClick={() =>
                                setSubServices(
                                    subServices.filter((_, idx) => idx !== i)
                                )
                            }
                        >
                            Remove
                        </button>
                    </div>
                ))}

                {/* SAVE */}
                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-2 rounded"
                    >
                        Update Service
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateService;
