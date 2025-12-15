import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../apis";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
    step: "email",
  });

  const [errors, setErrors] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === " ") e.preventDefault();
  };

  const validateField = (field, value) => {
    if (field === "email") {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        return "Please enter a valid email address.";
      }
    }

    if (field === "otp") {
      if (value.length !== 6) return "OTP must be exactly 6 digits.";
    }

    if (field === "password") {
      if (!value.trim()) return "Password is required.";
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
      ) {
        return "Password must be 8+ chars, include uppercase, number & symbol.";
      }
    }

    if (field === "confirmPassword") {
      if (!value.trim()) return "Please confirm your password.";
      if (value !== data.password) return "Passwords do not match.";
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e;
    if (name === "otp" && !/^\d{0,6}$/.test(value)) return;

    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!data.email.trim()) return toast.error("Please enter your email.");

    try {
      const res = await fetch(SummaryApi.changepassword.url, {
        method: SummaryApi.changepassword.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("OTP sent successfully!");
        setData((prev) => ({ ...prev, step: "otp" }));
      } else toast.error(result.message || "Invalid email");
    } catch {
      toast.error("Email not sent");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (data.otp.length !== 6) return toast.error("Enter valid OTP");

    try {
      const res = await fetch(SummaryApi.verifyOtp.url, {
        method: SummaryApi.verifyOtp.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, otp: data.otp }),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("OTP verified!");
        setData((prev) => ({ ...prev, step: "password" }));
      } else toast.error(result.message || "OTP invalid or expired");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(SummaryApi.ResetPassword.url, {
        method: SummaryApi.ResetPassword.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          newPassword: data.password,
        }),
      });

      const result = await res.json();
      if (res.status === 201) {
        toast.success("Password updated successfully");
        navigate("/signin");
      } else toast.error(result.message || "Try again");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-gray-50">
      <div className="bg-white w-full sm:w-3/4 md:w-1/2 lg:w-1/3 max-w-md p-6 sm:p-8 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl text-blue-600 mb-6">
          {data.step === "email"
            ? "Enter Your Email"
            : data.step === "otp"
            ? "Enter OTP"
            : "Reset Password"}
        </h1>

        <form className="space-y-6">
          {data.step === "email" && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => handleChange(e.target)}
                onKeyDown={handleKeyDown}
                className="w-full border-b-2 border-blue-600 py-2 outline-none"
              />
              <button
                onClick={sendOtp}
                className="w-full py-2 bg-blue-600 text-white rounded-md"
              >
                Send OTP
              </button>
            </>
          )}

          {data.step === "otp" && (
            <>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={data.otp}
                onChange={(e) => handleChange(e.target)}
                maxLength="6"
                className="w-full border-b-2 border-blue-600 py-2 outline-none"
              />
              <button
                onClick={verifyOtp}
                className="w-full py-2 bg-blue-600 text-white rounded-md"
              >
                Verify OTP
              </button>
            </>
          )}

          {data.step === "password" && (
            <>
              <input
                type="password"
                name="password"
                placeholder="New Password"
                value={data.password}
                onChange={(e) => handleChange(e.target)}
                className="w-full border-b-2 border-blue-600 py-2 outline-none"
              />

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={data.confirmPassword}
                  onChange={(e) => handleChange(e.target)}
                  className="w-full border-b-2 border-blue-600 py-2 outline-none"
                />
                <span
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              <button
                onClick={resetPassword}
                className="w-full py-2 bg-blue-600 text-white rounded-md"
              >
                Reset Password
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
