import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import API from "../../../api";
import { jwtDecode } from "jwt-decode";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await API.post(`/api/auth/reset-password/${token}`, {
        newPassword,
      });
      setMessage(res.data.message);
      toast.success("Password Changed Successfully, Redirecting Back");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
      toast.error("Some Error Occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full transition-all duration-300">
        <div className="flex items-center justify-center text-blue-600 mb-4">
          <FaLock className="text-3xl" />
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 transition duration-300 text-white py-3 rounded-lg font-semibold shadow-md"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-5 text-center text-base font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        toastClassName="rounded-lg shadow-md"
        progressClassName="bg-blue-500"
      />
    </div>
  );
};

export default ResetPassword;
