import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { toggleState } from "../redux/toggleSlice";
import { Link } from 'react-router-dom';

export default function SignIn() {
  const signUp = useSelector((state) => state.toggle.signup);
  const dispatch = useDispatch();

  // Local form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState({});

  // prevent scroll
  if (signUp) document.body.classList.add("overflow-hidden");
  else document.body.classList.remove("overflow-hidden");

  const validateForm = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter a valid email address";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Signed in successfully!");
      console.log({ email, password });
    }
  };

  return (
    <>
      <div className="h-screen">
        {signUp && (
          <div className="fixed inset-0 z-40 flex justify-center items-center">

            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div
              className="
                relative z-50 
                bg-white 
                rounded-xl 
                p-7
                w-[90%]
                sm:w-[70%]
                md:w-[40%]
                lg:w-[30%]
                xl:w-[25%]
                min-h-[64vh]
                shadow-lg
                flex justify-center items-center
              "
            >
              <div
                onClick={() => dispatch(toggleState())}
                className="absolute top-3 right-3 w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-200 cursor-pointer"
              >
                <IoMdClose className="text-black text-xl opacity-50" />
              </div>

              <div className="flex justify-center items-center mt-4 flex-col">
                <h1 className="font-bold text-xl text-black">
                  Sign in to LMS
                </h1>

                <p className="mt-2 opacity-50">
                  Welcome back! Please sign in to continue to learning from our platform
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col w-full mt-7 gap-6"
                >
                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label>Email address</label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 
                        focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                        className="w-full border border-gray-300 rounded-md px-3 py-2 
                          focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />

                      {/* Eye Toggle */}
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

                  {/* Submit */}
                  <input
                    type="submit"
                    value="Continue"
                    className="w-full rounded-md bg-black text-white py-2 cursor-pointer hover:bg-gray-800 transition mt-3"
                  />

                  <p className="text-center">
                    Don't have an account?{" "}
                    <Link to="/signup" className="hover:underline">
                      Sign up
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
}
