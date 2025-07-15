import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";

const categoryList = [
    { name: 'room' },
    { name: 'hall' },
    { name: 'table' },
    { name: 'food' }
];

const AddProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity: 1,
        availableDates: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const addProductFunction = async () => {
        if (product.title === "" || product.price === "" || product.productImageUrl === "" || product.category === "" || product.description === "" || (["room", "hall", "table"].includes(product.category) && product.availableDates === "")) {
            return toast.error("All fields are required");
        }

        setLoading(true);
        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, product);
            toast.success("Product added successfully");
            navigate('/admin-dashboard');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Add product failed");
        }
    };

    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                <div className="login_Form bg-white px-8 py-6 border border-gray-200 rounded-xl shadow-md">
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-red-600'>
                            Add Product
                        </h2>
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    title: e.target.value
                                });
                            }}
                            placeholder='Product Title'
                            className='bg-gray-50 border text-gray-700 border-gray-300 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    price: e.target.value
                                });
                            }}
                            placeholder='Product Price'
                            className='bg-gray-50 border text-gray-700 border-gray-300 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="productImageUrl"
                            value={product.productImageUrl}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    productImageUrl: e.target.value
                                });
                            }}
                            placeholder='Product Image Url'
                            className='bg-gray-50 border text-gray-700 border-gray-300 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        />
                    </div>
                    <div className="mb-3">
                        <select
                            value={product.category}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    category: e.target.value
                                });
                            }}
                            className="w-full px-1 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500">
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => (
                                <option className="first-letter:uppercase" key={index} value={value.name}>{value.name}</option>
                            ))}
                        </select>
                    </div>
                    {["room", "hall", "table"].includes(product.category) && (
                        <div className="mb-3">
                            <input
                                type="date"
                                name="availableDates"
                                value={product.availableDates}
                                onChange={(e) => {
                                    setProduct({
                                        ...product,
                                        availableDates: e.target.value
                                    });
                                }}
                                className='bg-gray-50 border text-gray-700 border-gray-300 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                            />
                        </div>
                    )}
                    <div className="mb-3">
                        <textarea
                            value={product.description}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    description: e.target.value
                                });
                            }} 
                            name="description" 
                            placeholder="Product Description" 
                            rows="5" 
                            className="w-full px-2 py-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-md outline-none placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500">
                        </textarea>
                    </div>
                    <div className="mb-3">
                        <button
                            onClick={addProductFunction}
                            type='button'
                            className='bg-red-600 hover:bg-red-700 w-full text-white text-center py-2 font-bold rounded-md transition-colors duration-200'>
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductPage;