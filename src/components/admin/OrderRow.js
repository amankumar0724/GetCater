import React from "react";

const OrderRow = ({ order, item, itemIndex, handleStatusChange, toggleEditing, currentOrderStatus, deleteProduct }) => {
    const { id, productImageUrl, title, category, price, quantity } = item;

    return (
        <tr key={`${order.id}-${itemIndex}`} className="text-red-600">
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 stroke-gray-500 text-gray-600 ">{itemIndex + 1}</td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 stroke-gray-500 text-gray-600 ">{id}</td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 stroke-gray-500 text-gray-600 first-letter:uppercase ">
                <img src={productImageUrl} alt="img" />
            </td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 stroke-gray-500 text-gray-600 first-letter:uppercase ">{title}</td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 stroke-gray-500 text-gray-600 first-letter:uppercase ">{category}</td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 stroke-gray-500 text-gray-600 first-letter:uppercase ">₹{price}</td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 stroke-gray-500 text-gray-600 first-letter:uppercase ">{quantity}</td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 stroke-gray-500 text-gray-600 first-letter:uppercase ">₹{price * quantity}</td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 stroke-gray-500 text-green-600 first-letter:uppercase ">
                {currentOrderStatus.editing ? (
                    <select
                        value={currentOrderStatus.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="text-gray-700"
                    >
                        <option value="Confirm">Confirm</option>
                        <option value="Processing">Processing</option>
                        <option value="wait for 15 mins">15 mins</option>
                        <option value="wait for 5 mins">5 mins</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                ) : (
                    <span onClick={() => toggleEditing(order.id)}>{currentOrderStatus.status}</span>
                )}
            </td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 stroke-gray-500 text-gray-600 first-letter:uppercase ">{order.addressInfo.name}</td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 stroke-gray-500 text-gray-600 first-letter:uppercase ">{order.addressInfo.address}</td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 stroke-gray-500 text-gray-600 first-letter:uppercase ">{order.addressInfo.pincode}</td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 stroke-gray-500 text-gray-600 first-letter:uppercase ">{order.addressInfo.mobileNumber}</td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 stroke-gray-500 text-gray-600 ">{order.email}</td>
            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 stroke-gray-500 text-gray-600 first-letter:uppercase ">{order.date}</td>
            <td onClick={() => deleteProduct(order.id)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-red-200 stroke-gray-500 text-red-600 cursor-pointer ">Delete</td>
        </tr>
    );
};

export default OrderRow;