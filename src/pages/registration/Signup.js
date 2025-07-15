/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB, googleProvider } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();

    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const userSignupFunction = async () => {
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All Fields are required");
            return;
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
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

            await addDoc(userRefrence, user);

            setUserSignup({
                name: "",
                email: "",
                password: ""
            });

            toast.success("Signup Successfully");

            setLoading(false);
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error("Signup Failed");
            setLoading(false);
        }
    };

    const googleSignupFunction = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const userData = {
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

            await addDoc(userRefrence, userData);

            toast.success("Signup with Google Successfully");

            setLoading(false);
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error("Google Signup Failed");
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className="login_Form bg-red-50 px-8 py-6 border border-red-100 rounded-xl shadow-md">
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-red-600 '>
                        Signup
                    </h2>
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='Full Name'
                        value={userSignup.name}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                name: e.target.value
                            });
                        }}
                        className='bg-red-50 border border-red-200 px-2 py-2 w-96 rounded-md outline-none placeholder-red-300'
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userSignup.email}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                email: e.target.value
                            });
                        }}
                        className='bg-red-50 border border-red-200 px-2 py-2 w-96 rounded-md outline-none placeholder-red-300'
                    />
                </div>

                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userSignup.password}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                password: e.target.value
                            });
                        }}
                        className='bg-red-50 border border-red-200 px-2 py-2 w-96 rounded-md outline-none placeholder-red-300'
                    />
                </div>

                <div className="mb-3">
                    <button
                        type='button'
                        onClick={userSignupFunction}
                        className='bg-red-600 hover:bg-red-700 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Signup
                    </button>
                </div>

                <div className="mb-5">
                    <button
                        type='button'
                        onClick={googleSignupFunction}
                        className='bg-red-500 hover:bg-red-600 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Sign up with Google
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Have an account <Link className=' text-red-600 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    );
}

export default Signup;