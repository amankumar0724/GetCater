/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, fireDB, googleProvider } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { Timestamp, addDoc, collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Login State 
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    /**========================================================================
     *                          User Login Function 
    *========================================================================**/

    const userLoginFunction = async () => {
        // validation 
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required");
            return;
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            // console.log(users.user)

            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user));
                    setUserLogin({
                        email: "",
                        password: ""
                    });
                    toast.success("Login Successfully");
                    setLoading(false);
                    if (user.role === "user") {
                        navigate('/user-dashboard');
                    } else {
                        navigate('/admin-dashboard');
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Login Failed");
        }
    }

    /**========================================================================
     *                          Google Login Function 
    *========================================================================**/

    const googleLoginFunction = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', user.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let userData;
                    QuerySnapshot.forEach((doc) => userData = doc.data());
                    if (!userData) {
                        userData = {
                            name: user.displayName,
                            email: user.email,
                            uid: user.uid,
                            role: "user",
                            time: Timestamp.now(),
                            date: new Date().toLocaleString(
                                "en-US",
                                {
                                    month: "short",
                                    day: "2-digit",
                                    year: "numeric",
                                }
                            )
                        };
                        const userRefrence = collection(fireDB, "user");
                        addDoc(userRefrence, userData);
                    }
                    localStorage.setItem("users", JSON.stringify(userData));
                    toast.success("Login with Google Successfully");
                    setLoading(false);
                    if (userData.role === "user") {
                        navigate('/user-dashboard');
                    } else {
                        navigate('/admin-dashboard');
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Google Login Failed");
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            {/* Login Form  */}
            <div className="login_Form bg-red-50 px-8 py-6 border border-red-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-red-600 '>
                        Login
                    </h2>
                </div>

                {/* Input One  */}
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        placeholder='Email Address'
                        value={userLogin.email}
                        onChange={(e) => {
                            setUserLogin({
                                ...userLogin,
                                email: e.target.value
                            });
                        }}
                        className='bg-red-50 border border-red-200 px-2 py-2 w-96 rounded-md outline-none placeholder-red-300'
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userLogin.password}
                        onChange={(e) => {
                            setUserLogin({
                                ...userLogin,
                                password: e.target.value
                            });
                        }}
                        className='bg-red-50 border border-red-200 px-2 py-2 w-96 rounded-md outline-none placeholder-red-300'
                    />
                </div>

                {/* Login Button  */}
                <div className="mb-3">
                    <button
                        type='button'
                        onClick={userLoginFunction}
                        className='bg-red-600 hover:bg-red-700 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Login
                    </button>
                </div>

                {/* Google Login Button */}
                <div className="mb-5">
                    <button
                        type='button'
                        onClick={googleLoginFunction}
                        className='bg-red-500 hover:bg-red-600 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Login with Google
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Don't Have an account <Link className=' text-red-600 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Login;