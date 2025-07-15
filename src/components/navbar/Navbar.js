import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("users");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user from localStorage", error);
            }
        }
    }, []);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("users");
        setUser(null);
        navigate("/login");
    };

    const CartItems = useSelector((state) => state.cart);

    const navList = (
        <ul className="flex space-x-3 text-white font-medium text-md px-5">
            <li>
                <Link to="/" className="hover:text-red-200 transition-colors">Home</Link>
            </li>
            <li>
                <Link to="/allproduct" className="hover:text-red-200 transition-colors">Menu</Link>
            </li>
            {!user && (
                <>
                    <li>
                        <Link to="/signup" className="hover:text-red-200 transition-colors">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login" className="hover:text-red-200 transition-colors">Login</Link>
                    </li>
                </>
            )}
            {user?.role === "user" && (
                <li>
                    <Link to="/user-dashboard" className="hover:text-red-200 transition-colors">{user?.name}</Link>
                </li>
            )}
            {user?.role === "admin" && (
                <li>
                    <Link to="/admin-dashboard" className="hover:text-red-200 transition-colors">{user?.name}</Link>
                </li>
            )}
            {user && (
                <li className="cursor-pointer hover:text-red-200 transition-colors" onClick={logout}>
                    Logout
                </li>
            )}
            <li>
                <Link to="/cart" className="hover:text-red-200 transition-colors">Cart({CartItems.length})</Link>
            </li>
        </ul>
    );

    return (
        <nav className="bg-red-600 sticky top-0 shadow-md">
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3">
                <div className="left py-3 lg:py-0">
                    <Link to="/">
                        <h2 className="font-bold text-white text-2xl text-center hover:text-red-200 transition-colors">
                            GetCater
                        </h2>
                    </Link>
                </div>
                <div className="right flex justify-center mb-4 lg:mb-0">{navList}</div>
                <SearchBar />
            </div>
        </nav>
    );
};

export default Navbar;