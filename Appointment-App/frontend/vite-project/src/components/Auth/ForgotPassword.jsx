import React, { useState } from "react";
import { Mail, SendHorizonal, AlertCircle, CheckCircle } from "lucide-react";
import API from "../../../api"; // adjust if needed
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: "", type: "" });
    setLoading(true);

    try {
      const res = await API.post("/api/auth/forgot-password", { email });
      setStatus({ message: res.data.message, type: "success" });
    } catch (err) {
      setStatus({
        message: err.response?.data?.message || "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6 border border-gray-100">
        <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-4">
          Reset Your Password
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Enter your email and we’ll send you instructions to reset your
          password.
        </p>

        {status.message && (
          <div
            className={`p-3 rounded-lg text-sm mb-4 flex items-start ${
              status.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle size={16} className="mr-2 mt-0.5" />
            ) : (
              <AlertCircle size={16} className="mr-2 mt-0.5" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="text-gray-400" size={18} />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 cursor-pointer text-white p-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            <SendHorizonal size={16} className="mr-2" />
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
