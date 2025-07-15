import React, { useContext, useState } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, deleteProduct, updateOrderStatus } = context;

    const [orderStatus, setOrderStatus] = useState(getAllOrder.map(order => ({
        id: order.id,
        status: order.status,
        editing: false
    })));

    const handleStatusChange = (orderId, newStatus) => {
        setOrderStatus(prevStatus =>
            prevStatus.map(order =>
                order.id === orderId ? { ...order, status: newStatus, editing: true } : order
            )
        );
    };

    const toggleEditing = (orderId) => {
        setOrderStatus(prevStatus =>
            prevStatus.map(order =>
                order.id === orderId ? { ...order, editing: !order.editing } : order
            )
        );
    };

    const saveStatus = (orderId) => {
        const statusToUpdate = orderStatus.find((status) => status.id === orderId);
        if (statusToUpdate) {
            updateOrderStatus(orderId, statusToUpdate.status);
        }
    };

    const totalProfit = getAllOrder.reduce((acc, order) => {
        const orderTotal = order.cartItems.reduce((orderAcc, item) => {
            return orderAcc + item.price * item.quantity;
        }, 0);
        return acc + orderTotal;
    }, 0);

    return (
        <div>
            <div className="py-5">
                <h1 className="text-xl text-red-600 font-bold">All Orders</h1>
                <h2 className="text-lg text-red-500 font-bold">Total Profit: ₹{totalProfit}</h2>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-collapse sm:border-separate border-red-200 text-red-600">
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-red-200 text-white bg-red-600 font-bold fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-200 text-white bg-red-600">Order Id</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-200 text-white bg-red-600">Image</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-200 text-white bg-red-600">Title</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-200 text-white bg-red-600">Category</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-200 text-white bg-red-600">Price</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-200 text-white bg-red-600">Quantity</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-200 text-white bg-red-600">Total Price</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-200 text-white bg-red-600">Status</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-200 text-white bg-red-600">Name</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-200 text-white bg-red-600">Address</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-200 text-white bg-red-600">Pincode</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-200 text-white bg-red-600">Phone Number</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-200 text-white bg-red-600">Email</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-200 text-white bg-red-600">Date</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-red-200 text-white bg-red-600">Action</th>
                        </tr>
                        {getAllOrder.map((order, orderIndex) => {
                            const currentOrderStatus = orderStatus.find(o => o.id === order.id);
                            return (
                                <React.Fragment key={orderIndex}>
                                    {order.cartItems.map((item, itemIndex) => (
                                        <tr key={`${order.id}-${itemIndex}`} className="text-red-600 hover:bg-red-50">
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 text-gray-700">{orderIndex + 1}</td>
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 text-gray-700">{order.id}</td>
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 text-gray-700 first-letter:uppercase">
                                                <img src={item.productImageUrl} alt="img" className="w-12 h-12 rounded object-cover" />
                                            </td>
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 text-gray-700 first-letter:uppercase">{item.title}</td>
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 text-gray-700 first-letter:uppercase">{item.category}</td>
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 text-gray-700 first-letter:uppercase">₹{item.price}</td>
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 text-gray-700 first-letter:uppercase">{item.quantity}</td>
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 text-gray-700 first-letter:uppercase">₹{item.price * item.quantity}</td>
                                            <td className="h-12 px-6 border-l first:border-l-0 border-red-200">
                                                {currentOrderStatus?.editing ? (
                                                    <input
                                                        type="text"
                                                        value={currentOrderStatus?.status}
                                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                        className="border border-red-300 focus:border-red-500 focus:outline-none p-1 rounded"
                                                    />
                                                ) : (
                                                    <span className="text-green-600 font-medium">{currentOrderStatus?.status}</span>
                                                )}
                                            </td>
                                            {itemIndex === 0 && (
                                                <>
                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 text-gray-700 first-letter:uppercase" rowSpan={order.cartItems.length}>{order.addressInfo.name}</td>
                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 text-gray-700 first-letter:uppercase" rowSpan={order.cartItems.length}>{order.addressInfo.address}</td>
                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 text-gray-700 first-letter:uppercase" rowSpan={order.cartItems.length}>{order.addressInfo.pincode}</td>
                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 text-gray-700 first-letter:uppercase" rowSpan={order.cartItems.length}>{order.addressInfo.mobileNumber}</td>
                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 text-gray-700" rowSpan={order.cartItems.length}>{order.email}</td>
                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 text-gray-700 first-letter:uppercase" rowSpan={order.cartItems.length}>{order.date}</td>
                                                </>
                                            )}
                                            <td className="h-12 px-6 border-l first:border-l-0 border-red-200">
                                                <button
                                                    onClick={() => {
                                                        if (currentOrderStatus?.editing) {
                                                            saveStatus(order.id);
                                                        }
                                                        toggleEditing(order.id);
                                                    }}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded mr-2 transition duration-200"
                                                >
                                                    {currentOrderStatus?.editing ? 'Save' : 'Edit'}
                                                </button>
                                                <button 
                                                    onClick={() => deleteProduct(order.id)} 
                                                    className="bg-red-800 hover:bg-red-900 text-white px-3 py-1 rounded transition duration-200"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderDetail;