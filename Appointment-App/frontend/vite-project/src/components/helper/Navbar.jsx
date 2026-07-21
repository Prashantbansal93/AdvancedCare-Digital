import { jwtDecode } from "jwt-decode";
import React from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) navigate("/");
      const decoded = jwtDecode(token);
      if (decoded.isAdmin) navigate("/adminDashBoard");
      else navigate("/userDashboard");
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/");
    }
  };

  return (
    <div className="mb-20">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md px-4 py-3 border-b border-blue-100 dark:border-gray-700">
        <div className="container mx-auto flex items-center justify-between flex-wrap gap-4">
          <button
            onClick={handleLogoClick}
            className="group flex cursor-pointer items-center focus:outline-none"
            aria-label="Navigate to dashboard"
          >
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-white dark:from-gray-700 dark:to-gray-800 shadow-sm border-2 border-blue-100 dark:border-gray-600">
              <img src="/LOGO.jpeg" className="rounded-4xl" alt="Logo" />{" "}
            </div>
          </button>

          <div className="flex-1 flex flex-col items-center justify-center space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl text-blue-500 font-serif">
                Advanced Cardiac Care
              </h1>
            </div>
          </div>

          <div className="hidden sm:block text-right space-y-0.5">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
              Dr. Dhara Singh
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              MBBS, MD (Medicine), DM (Cardiology)
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AIIMS New Delhi
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Consultant Cardiologist
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-300">
              <span className="font-normal">Contact:</span> +91-9643071159
            </p>
          </div>
        </div>
      </nav>
      <div className="mb-25"></div>
    </div>
  );
};

export default Navbar;
