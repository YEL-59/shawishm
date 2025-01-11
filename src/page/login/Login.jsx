import loginimg from "../../assets/login.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LogoIcon from "../../assets/icons/LogoIcon";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";
import "../../App.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [setToken, setTokens] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   toast.info("Toast is working!");
  // }, []);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    const { name, password } = data;

    setLoading(true);

    try {
      const response = await axiosInstance.post("/users/signin/", {
        username: name,
        password,
      });

      const { access, refresh } = response.data;

      // Store tokens using your cookie helper
      setTokens(access, refresh);

      toast.success("Login successful!");
      navigate("/"); // Redirect to the home page or dashboard
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.detail || "Invalid email or password";
        toast.error(errorMessage);
      } else {
        toast.error(`Login failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />


      <div className="h-screen flex flex-col justify-center md:flex-row bg-[#e9f1f7]">
        {/* Left Side: Form */}
        <div className="lg:w-1/2 w-full flex justify-center items-center p-4">
          <div className="w-full max-w-md bg-white rounded p-6 md:p-16 border shadow-lg">
            <div className="text-center flex flex-col justify-center items-center mb-8 md:mb-14">
              <LogoIcon />
              <h2 className="text-xl md:text-2xl font-bold text-primary">
                Login to your account
              </h2>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm md:text-md font-bold text-primary"
                >
                  User Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block text-sm md:text-md font-bold text-primary"
                  >
                    Password
                  </label>
                  <Link
                    to={"/forgotpassword"}
                    className="text-xs md:text-sm text-[#00CCFF] hover:text-blue-700"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
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
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 md:py-3 bg-secondary text-white font-semibold rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      Login
                      <span className="animate-[fadeInOut_1s_ease-in-out_infinite]">
                        .
                      </span>
                      <span className="animate-[fadeInOut_1s_ease-in-out_infinite] delay-200">
                        .
                      </span>
                      <span className="animate-[fadeInOut_1s_ease-in-out_infinite] delay-400">
                        .
                      </span>
                    </>
                  ) : (
                    "Log in"
                  )}
                </button>
                <Link
                  to={"/signup"}
                  className="text-center text-xs text-secondary hover:underline"
                >
                  <p className="mt-4 text-sm text-gray-500 text-center">
                    Don't have an account?{" "}
                    <span className="font-medium text-xs text-secondary hover:underline">
                      Sign up here
                    </span>
                    .
                  </p>
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hidden lg:flex w-full md:w-1/2">
          <img
            src={loginimg}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
