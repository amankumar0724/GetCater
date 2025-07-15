import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import MyContext from "../../context/myContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
    const { categoryname } = useParams();
    const { getAllProduct, loading } = useContext(MyContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    const [selectedDate, setSelectedDate] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart");
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        if (loading) return;

        const filtered = getAllProduct.filter((product) => {
            const isAvailableOnSelectedDate = selectedDate ? product.availableDates?.includes(selectedDate) : true;
            return product.category.toLowerCase().includes(categoryname.toLowerCase()) && isAvailableOnSelectedDate;
        });

        setFilteredProducts(filtered);
    }, [getAllProduct, cartItems, categoryname, selectedDate, loading]);

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center">
                    <Loader />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="mt-10">
                <div className="">
                    <h1 className="text-center mb-5 text-2xl font-semibold capitalize text-gray-800">{categoryname}</h1>
                </div>
                <div className="flex justify-center items-center mt-5 mb-8">
                    <p className="text-lg text-gray-700 mr-3">Select Date:</p> 
                    <input 
                        type="date" 
                        name="date" 
                        id="date" 
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                </div>

                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-5 mx-auto">
                        <div className="flex flex-wrap -m-4 justify-center">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((item, index) => {
                                    const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);
                                    return (
                                        <div key={index} className="p-4 w-full md:w-1/4">
                                            <div className="h-full border border-gray-200 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
                                                <img
                                                    onClick={() => navigate(`/productinfo/${item.id}`)}
                                                    className="lg:h-80 h-96 w-full object-cover"
                                                    src={item.productImageUrl}
                                                    alt="Product"
                                                />
                                                <div className="p-6">
                                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1 uppercase">
                                                        Food Item
                                                    </h2>
                                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                        {item.title.substring(0, 25)}
                                                    </h1>
                                                    <p className={`text-sm font-medium mb-2 ${isInCart ? 'text-red-600' : 'text-green-600'}`}>
                                                        {isInCart ? 'In Cart' : 'Available'}
                                                    </p>
                                                    <h1 className="title-font text-lg font-bold text-red-600 mb-3">
                                                        ₹{item.price}
                                                    </h1>
                                                    <div className="flex justify-center">
                                                        {isInCart ? (
                                                            <button
                                                                onClick={() => deleteCart(item)}
                                                                className="bg-red-600 hover:bg-red-700 w-full text-white py-2 rounded-lg font-bold transition-colors duration-300"
                                                            >
                                                                Remove From Cart
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => addCart(item)}
                                                                className="bg-red-600 hover:bg-red-700 w-full text-white py-2 rounded-lg font-bold transition-colors duration-300"
                                                            >
                                                                Add To Cart
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center w-full py-12">
                                    <img
                                        className="mb-4 mx-auto w-24 h-24 opacity-50"
                                        src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                                        alt="Not Found"
                                    />
                                    <h1 className="text-gray-600 text-xl">No {categoryname} products found</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default CategoryPage;