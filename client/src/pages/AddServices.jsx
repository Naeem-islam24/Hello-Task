import { useContext, useState } from "react";
import axios from "axios"
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const AddServices = () => {
    const { user } = useContext(AuthContext)
    const [subServices, setSubServices] = useState([]);
    const [faqList, setFaqList] = useState([]);
    const navigate = useNavigate()
    const [subItem, setSubItem] = useState({
        name: "",
        image: "",
        price: ""
    });

    const [faqItem, setFaqItem] = useState({
        question: "",
        answer: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const bannerImage = form.bannerImage.value;
        const category = form.category.value;
        const email = user?.email;
        const description = form.description.value;
        const rating = parseFloat(form.rating.value) || 0;
        const formData = {
            title,
            bannerImage,
            rating,
            buyer: {
                email,
                name: user?.displayName,
                photo: user?.photoURL
            },
            category,
            description,
            subServices,
            faq: faqList
        };
        console.log(formData);

        // Make a POST Request
        // try {
        //     const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/add-services`, formData)
        //     console.log(data);
        //     form.reset()
        //     navigate('/posted-service-list')
        // } catch (err) {
        //     toast.error(err.message);
        //     console.log(err);
        // }


        try {
            const token = await user?.firebaseUser?.getIdToken(); // firebase token
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/add-services`,formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`   //token attach
                    }
                }
            );

            console.log(data);
            toast.success("✅ Service Added Successfully!");
            form.reset();
            navigate('/posted-service-list');
        } catch (err) {
            toast.error(err.response?.data?.error || err.message);
            console.log(err);
        }
    };

    return (
        <div className="max-w-3xl mt-3 mb-3 mx-auto p-4 bg-gray-100 shadow rounded-md">
            <h2 className="text-xl font-semibold mb-2">Add Service</h2>

            <form onSubmit={handleSubmit}>
                {/* Main Info */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input name="title" className="border p-2" placeholder="Service Title" />
                    <input name="bannerImage" className="border p-2" placeholder="Banner Image URL" />
                    <input name="rating" type="number" step="0.1" className="border p-2" placeholder="Rating" />
                </div>


                <div className='flex flex-col gap-2 '>
                    <label className='text-black font-semibold' htmlFor='category'>
                        Category
                    </label>
                    <select
                        name='category'
                        id='category'
                        className='border p-2 rounded-md'
                    >
                        <option value='Ac Solution'>Ac Solution</option>
                        <option value='Cleaning Solution'>Cleaning Solution</option>
                        <option value='Shifting Solution'>Shifting Solution</option>
                        <option value="Health Care">Health Care</option>
                        <option value="Electric Solution">Electric Solution</option>
                        <option value="Maid Service">Maid Service</option>
                        <option value="Painting & Renovation">Painting & Renovation</option>
                    </select>
                </div>




                {/* Sub Services */}
                <h3 className="text-lg font-semibold mt-3">Add Sub-Service</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <input
                        className="border p-2"
                        placeholder="Name"
                        value={subItem.name}
                        onChange={(e) => setSubItem({ ...subItem, name: e.target.value })}
                    />
                    <input
                        className="border p-2"
                        placeholder="Image URL"
                        value={subItem.image}
                        onChange={(e) => setSubItem({ ...subItem, image: e.target.value })}
                    />
                    <input
                        className="border p-2"
                        placeholder="Price"
                        type="text"
                        value={subItem.price}
                        onChange={(e) => setSubItem({ ...subItem, price: e.target.value })}
                    />
                </div>
                <button
                    type="button"
                    onClick={() => {
                        if (!subItem.name) return;

                        const newSubService = {
                            ...subItem,
                            price: Number(subItem.price),
                            _id: uuidv4()
                        };

                        setSubServices([...subServices, newSubService]);

                        setSubItem({ name: "", image: "", price: "" });
                    }}

                    className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Sub-Service
                </button>

                {/* Preview Sub-Service */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {subServices.map((s) => (
                        <div key={s._id} className="border p-3 rounded shadow">
                            <img src={s.image} className="h-28 w-full object-cover rounded" />
                            <h4 className="font-bold">{s.name}</h4>
                            <p className="font-bold">${s.price}</p>
                            <button
                                type="button"
                                onClick={() => setSubServices(subServices.filter(item => item._id !== s._id))}
                                className="text-white bg-red-500 px-3 py-1 rounded mt-2"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* Description */}
                <div className='mt-3'>
                    <label className='text-gray-700 font-medium' htmlFor='description'>
                        Description
                    </label>
                    <textarea
                        className='mt-1 w-full px-3 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
                        name='description'
                        id='description'
                        rows='2'
                    ></textarea>
                </div>


                {/* FAQ */}
                <h3 className="text-lg font-semibold mt-3">FAQ</h3>
                <input
                    className="border p-2 w-full mt-2"
                    placeholder="Question"
                    value={faqItem.question}
                    onChange={(e) => setFaqItem({ ...faqItem, question: e.target.value })}
                />
                <textarea
                    className="border p-2 w-full mt-2"
                    placeholder="Answer"
                    value={faqItem.answer}
                    onChange={(e) => setFaqItem({ ...faqItem, answer: e.target.value })}
                />
                <button
                    type="button"
                    onClick={() => {
                        if (!faqItem.question) return;
                        setFaqList([...faqList, faqItem]);
                        setFaqItem({ question: "", answer: "" });
                    }}
                    className=" btn-sm mt-1 bg-blue-500 text-white p-2 rounded"
                >
                    Add FAQ
                </button>

                {/* Preview FAQ */}
                <div className="mt-3">
                    {faqList.map((faq, i) => (
                        <div key={i} className="border p-3 rounded mb-2">
                            <p className="font-semibold">Q: {faq.question}</p>
                            <p className="text-gray-700">A: {faq.answer}</p>
                            <button
                                type="button"
                                className="text-white bg-red-500 px-2 py-1 rounded mt-1"
                                onClick={() => setFaqList(faqList.filter((_, idx) => idx !== i))}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* Final Submit */}
                <div className="flex justify-end mt-3">
                    <button className="bg-green-600 text-white px-6 py-2 rounded">
                        Save Service
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddServices;
