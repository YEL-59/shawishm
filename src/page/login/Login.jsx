

import loginimg from "../../assets/login.png";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LogoIcon from '../../assets/icons/LogoIcon';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('authToken') || '');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('authToken', data.token);

        // Fetch user profile data
        const profileResponse = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        const profileData = await profileResponse.json();

        // Store user data in context
        setUser(profileData);

        navigate('/');
      } else {
        alert('Login failed: Invalid credentials');
      }
    } catch (error) {
      setError(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Optional: You can use the token in other parts of your component as needed
  console.log('Current token:', token);

  return (
    <div className="h-screen flex flex-col justify-center md:flex-row bg-[#e9f1f7]">
      {/* Left Side: Form */}
      <div className="lg:w-1/2 w-full flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded p-6 md:p-16 border shadow-lg">
          <div className="text-center flex flex-col justify-center items-center mb-8 md:mb-14">
            <LogoIcon />
            <h2 className="text-xl md:text-2xl font-bold text-primary">Login your account</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-6 w-full">
            <div>
              <label htmlFor="email" className="block text-sm md:text-md font-bold text-primary">
                User Name
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm md:text-md font-bold text-primary">
                  Password
                </label>
                <Link to={'/forgotpassword'} className="text-xs md:text-sm text-[#00CCFF]  hover:text-blue-700">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative mt-1">
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
              <button
                type="submit"
                className="w-full py-2 md:py-3 bg-secondary text-white font-semibold rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
              <Link to={'/signup'}  className="text-center text-xs text-secondary hover:underline">
                <p className="mt-4 text-sm text-gray-500 text-center">
                  Already have an account?
                  <a href="#" className="font-medium text-xs text-secondary hover:underline">
                    Signin here
                  </a>.
                </p>

              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="hidden lg:flex w-full md:w-1/2">
        <img src={loginimg} alt="Login" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;
