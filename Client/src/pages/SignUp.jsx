import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { toggleState } from "../redux/toggleSlice";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../apis/index";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const signUp = useSelector((state) => state.toggle.signup);
  const dispatch = useDispatch();

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  // Show/Hide Password States
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  // Validation Errors
  const [errors, setErrors] = useState({});

  // Validation Function
  const validateForm = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
    else if (name.length < 3) newErrors.name = "Name must be at least 3 characters";

    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter a valid email address";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!cpassword) newErrors.cpassword = "Confirm password is required";
    else if (cpassword !== password)
      newErrors.cpassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = { name, email, password };

    try {
      const response = await fetch(SummaryApi.signup.url, {
        method: SummaryApi.signup.method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.message || "Signup failed!");
        return;
      }

      toast.success("Registration successful!");
      navigate("/signin");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  // Disable space in password
  const handleKeyDown = (e) => {
    if (e.key === " ") e.preventDefault();
  };

  return (
    <>
      <div className="h-screen">
        {signUp && (
          <div className="fixed inset-0 z-40 flex justify-center items-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div
              className="
                relative z-50 bg-white rounded-xl p-7
                w-[90%] sm:w-[70%] md:w-[40%] lg:w-[30%] xl:w-[25%]
                min-h-[64vh] shadow-lg
              "
            >
              {/* Close Button */}
              <div
                onClick={() => dispatch(toggleState())}
                className="absolute top-3 right-3 w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-200 cursor-pointer"
              >
                <IoMdClose className="text-black text-xl opacity-50" />
              </div>

              <div className="flex justify-center items-center mt-4 flex-col">
                <h1 className="font-bold text-xl text-black">Create your account</h1>
                <p className="mt-2 opacity-50">
                  Welcome! Please fill in the details to get started
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col w-full mt-7 gap-6"
                >
                  {/* Name */}
                  <div className="flex flex-col gap-1">
                    <label>Username</label>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label>Email address</label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1">
                    <label>Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-1">
                    <label>Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showCPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={cpassword}
                        onChange={(e) => setCpassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCPassword(!showCPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showCPassword ? (
                          <IoEyeOff size={20} />
                        ) : (
                          <IoEye size={20} />
                        )}
                      </button>
                    </div>
                    {errors.cpassword && (
                      <p className="text-red-500 text-sm">{errors.cpassword}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                  >
                    Continue
                  </button>

                  <p className="text-center">
                    Already have an account?{" "}
                    <Link to="/signin" className="hover:underline">
                      Sign in
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignUp;
