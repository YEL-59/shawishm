


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginimg from "../../assets/login.png";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LogoIcon from '../../assets/icons/LogoIcon';
import GoogleIcon from '../../assets/icons/GoogleIcon';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Basic email validation
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    // Password validation (minimum 6 characters, must contain both letters and numbers)
    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return regex.test(password);
    };
    // check the error message
    // useEffect(() => {
    //     toast.error("Test error message!");
    // }, []);

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);

        try {
            const response = await axiosInstance.post(
                "users/signup/",
                {
                    username: name,
                    email: email,
                    password: password,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.status === 201) {
                toast.success("Sign-up successful! Please log in.");
                navigate("/login"); // Redirect to the login page after successful sign-up
                const accessToken = Cookies.get("accessToken");
                const refreshToken = Cookies.get("refreshToken");
                console.log("Access Token:", accessToken);
                console.log("Refresh Token:", refreshToken);
            } else {
                toast.error("Sign-up failed. Please try again.");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = error.response.data;

                // Extract and display error messages
                for (const key in errors) {
                    if (errors[key] instanceof Array) {
                        errors[key].forEach((msg) => toast.error(msg));
                    } else {
                        toast.error(errors[key]);
                    }
                }
            } else {
                // Handle generic errors
                toast.error(`Sign-up failed: ${error.message}`);
            }
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }
    };










    const [ellipsis, setEllipsis] = useState('');

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setEllipsis((prev) => (prev === '...' ? '' : prev + '.'));
            }, 500); // Change ellipsis every 500ms
            return () => clearInterval(interval);
        } else {
            setEllipsis('');
        }
    }, [loading]);

    return (

        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            <div className="h-screen flex flex-col md:flex-row bg-[#e9f1f7]">
                {/* Left Side: Form */}
                <div className="lg:w-1/2 w-full flex justify-center items-center p-4 md:p-8">
                    <div className="w-full max-w-lg bg-white rounded-lg p-6 md:p-10 border shadow-lg">
                        <div className="text-center flex flex-col justify-center items-center mb-8 md:mb-12">
                            <LogoIcon />
                            <h2 className="text-xl md:text-2xl font-bold text-primary mt-4">Create an account</h2>
                        </div>
                        <form onSubmit={handleSignUp} className="space-y-6 w-full">
                            {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}

                            <div>
                                <label htmlFor="name" className="block text-sm md:text-md font-bold text-primary">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm md:text-md font-bold text-primary">
                                    Email Address / Phone Number
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="password" className="block text-sm md:text-md font-bold text-primary">
                                        Password
                                    </label>

                                </div>
                                <div className="relative mt-2">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div>

                                <div class="flex items-start mb-6">
                                    <div class="flex items-center h-5">
                                        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 " required />
                                    </div>
                                    <label for="remember" class="ms-2 text-sm font-medium text-gray-900 "> By continuing, you agree to our <a href="#" class="text-secondary hover:underline ">terms and conditions</a>.</label>
                                </div>
                                <button
                                    type="submit" onClick={handleSignUp}
                                    className="w-full py-3 bg-secondary text-white font-semibold rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                                >
                                    {loading ? `Signing in${ellipsis}` : 'Sign up'}
                                    {/*   {loading ? (
    <>
        Signing in
        <span className="animate-[fadeInOut_1s_ease-in-out_infinite]">.</span>
        <span className="animate-[fadeInOut_1s_ease-in-out_infinite] delay-200">.</span>
        <span className="animate-[fadeInOut_1s_ease-in-out_infinite] delay-400">.</span>
    </>
) : (
    'Sign up'
)} */}
                                </button>
                            </div>

                            {/* <div>
                                <div className="my-5 border-b text-center">
                                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Or sign up with email
                                    </div>
                                </div>
                            </div> */}

                            {/* <button className="w-full text-center py-3  border flex items-center justify-center bg-[#E4E7EB] border-slate-200 rounded-lg text-black">
                                <GoogleIcon className="w-5 h-5 mr-2" />
                                <span className="text-primary font-medium text-xs ms-2">Signup with Google</span>
                            </button> */}


                        </form>
                    </div>
                </div>

                {/* Right Side: Image */}
                <div className="hidden lg:flex w-full md:w-1/2">
                    <img src={loginimg} alt="Login" className="w-full h-full object-cover rounded-l-lg" />
                </div>
            </div>



        </>

    );
};

export default SignUp;
