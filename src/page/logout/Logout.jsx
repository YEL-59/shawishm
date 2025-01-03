import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginimg from "../../assets/login.png";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LogoIcon from '../../assets/icons/LogoIcon';
import GoogleIcon from '../../assets/icons/GoogleIcon';

const Logout = () => {
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

    const handleLogin = async (e) => {
        e.preventDefault();  // Prevent the default form submission
        setError(''); 
        
        // Basic form validation
        if (!name || !email || !password) {
            setError('All fields are required');
            console.log('Validation failed: All fields are required');
            return;
        }
    
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            console.log('Validation failed: Invalid email');
            return;
        }
    
        if (!validatePassword(password)) {
            setError('Password must be at least 6 characters long and contain both letters and numbers');
            console.log('Validation failed: Invalid password');
            return;
        }
    
        // Log the form data to the console
        console.log('Form Data:', { name, email, password });
    
        setLoading(true);
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });
    
            console.log('Response:', response);  // Log the response object
    
            if (!response.ok) {
                throw new Error('Invalid email or password');
            }
    
            const data = await response.json();
            console.log('Response Data:', data);  // Log the response data
    
            if (data.token) {
                localStorage.setItem('authToken', data.token);
                navigate('/');
            } else {
                alert('Login failed: Invalid credentials');
            }
        } catch (error) {
            console.error('Error during login:', error);  // Log any errors
            alert(`Login failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col md:flex-row bg-[#e9f1f7]">
            {/* Left Side: Form */}
            <div className="lg:w-1/2 w-full flex justify-center items-center p-4 md:p-8">
                <div className="w-full max-w-lg bg-white rounded-lg p-6 md:p-10 border shadow-lg">
                    <div className="text-center flex flex-col justify-center items-center mb-8 md:mb-12">
                        <LogoIcon />
                        <h2 className="text-xl md:text-2xl font-bold text-primary mt-4">Create an account</h2>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6 w-full">
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
                                <a href="#" className="text-xs md:text-sm text-blue-500 hover:text-blue-700">
                                    Forgot Password?
                                </a>
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
                            <p className="mt-2 mb-4 text-sm text-gray-500">
                                By continuing, you agree to our{' '}
                                <a href="#" className="font-medium text-blue-600 hover:underline">
                                    terms of service
                                </a>.
                            </p>
                            <button
                                type="submit"  onClick={handleLogin}
                                className="w-full py-3 bg-secondary text-white font-semibold rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                            >
                                {loading ? 'Sign in...' : 'Sign up'} 
                            </button>
                        </div>

                        <div>
                            <div className="my-5 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or sign up with email
                                </div>
                            </div>
                        </div>

                        <button className="w-full text-center py-3 my-3 border flex items-center justify-center bg-[#E4E7EB] border-slate-200 rounded-lg text-black">
                            <GoogleIcon className="w-5 h-5 mr-2" />
                            <span className="text-primary font-medium">Login with Google</span>
                        </button>

                        <Link to="/login" className="text-center text-sm text-gray-600 hover:underline">
                        <p className="mt-4 text-sm text-gray-500 text-center">
                            Already have an account?{' '}
                            <a href="#" className="font-medium text-blue-600 hover:underline">
                                Sign in here
                            </a>.
                        </p>

                        </Link>
                    </form>
                </div>
            </div>

            {/* Right Side: Image */}
            <div className="hidden lg:flex w-full md:w-1/2">
                <img src={loginimg} alt="Login" className="w-full h-full object-cover rounded-l-lg" />
            </div>
        </div>
    );
};

export default Logout;
