import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import API from "../../../api";
import {
  User,
  Calendar,
  LogOut,
  Menu,
  Edit,
  Clipboard,
  HeartPulse,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Stethoscope,
  Activity,
  CheckCircle,
  Home,
} from "lucide-react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { jwtDecode } from "jwt-decode";
import ServiceCard from "../helper/ServiceCard";
import { ChevronDown } from "lucide-react";

const UserDashboard = () => {
  const [userData, setUserData] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const API_BASE_URL = "https://healthcare-9uj8.onrender.com";
  // const API_BASE_URL = "http://localhost:8001";

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle sidebar for mobile
  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  // Close mobile sidebar when clicking outside
  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const decodedToken = jwtDecode(token);
        const res = await API.get(`/api/user/get/${decodedToken?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserDropdownOpen) {
        const dropdown = document.querySelector(".user-dropdown-container");
        const button = document.querySelector(".user-dropdown-button");

        if (
          dropdown &&
          button &&
          !dropdown.contains(event.target) &&
          !button.contains(event.target)
        ) {
          setIsUserDropdownOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await API.get(`/api/appointment/myAppointments`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAppointments(res.data.appointments);
        setRecentAppointments(res.data.appointments);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointments();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logging Out!");
    setTimeout(() => {
      navigate("/");
    }, 1300);
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);

      if (isMobileView) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
        setMobileSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [welcomeCardColor, setWelcomeCardColor] = useState(() => {
    const savedColor = localStorage.getItem("welcomeCardColor");
    if (savedColor) {
      return savedColor;
    }
    const colors = ["blue", "green", "indigo", "purple", "teal"];
    const initialColor = colors[Math.floor(Math.random() * colors.length)];
    localStorage.setItem("welcomeCardColor", initialColor);
    return initialColor;
  });
  const colorVariants = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    indigo: "bg-indigo-600",
    purple: "bg-purple-600",
    teal: "bg-teal-600",
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Mobile Sidebar Toggle Button */}
      {isMobile && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all active:scale-95"
          onClick={toggleMobileSidebar}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} ${
          mobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        } bg-white shadow-lg p-4 flex flex-col fixed inset-y-0 left-0 z-30 transition-all duration-300 ease-in-out border-r pt-30 border-gray-200`}
      >
        <div className="flex-1 flex flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-8 pt-2">
            {sidebarOpen ? (
              <div className="flex items-center space-x-2 transition-all duration-200">
                <HeartPulse className="text-red-600 w-8 h-8 transition-transform hover:scale-110" />
                <span className="text-xl font-bold text-gray-800 animate-fadeIn">
                  HeartCare
                </span>
              </div>
            ) : (
              <HeartPulse className="text-red-600 w-8 h-8 mx-auto transition-transform hover:scale-110" />
            )}
            {/* Desktop Toggle Button */}
            <button
              className="hidden md:flex items-center justify-center p-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-all active:scale-95"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? (
                <ChevronLeft className="text-gray-600" size={18} />
              ) : (
                <ChevronRight className="text-gray-600" size={18} />
              )}
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 space-y-1">
            <button
              className={`flex items-center space-x-3 p-3 w-full rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-all duration-200 transform hover:translate-x-1 ${
                !sidebarOpen ? "justify-center" : ""
              }`}
              onClick={() => {
                navigate("/user/profile");
                closeMobileSidebar();
              }}
            >
              <User className="min-w-[20px]" size={20} />
              {sidebarOpen && <span className="font-medium">Profile</span>}
            </button>
            <button
              className={`flex items-center space-x-3 p-3 w-full rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-all duration-200 transform hover:translate-x-1 ${
                !sidebarOpen ? "justify-center" : ""
              }`}
              onClick={() => {
                navigate("/user/book-appointment");
                closeMobileSidebar();
              }}
            >
              <Calendar className="min-w-[20px]" size={20} />
              {sidebarOpen && (
                <span className="font-medium">Book Appointment</span>
              )}
            </button>
            <button
              className={`flex items-center space-x-3 p-3 w-full rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-all duration-200 transform hover:translate-x-1 ${
                !sidebarOpen ? "justify-center" : ""
              }`}
              onClick={() => {
                navigate("/user/edit-profile");
                closeMobileSidebar();
              }}
            >
              <Edit className="min-w-[20px]" size={20} />
              {sidebarOpen && <span className="font-medium">Edit Profile</span>}
            </button>
            <button
              className={`flex items-center space-x-3 p-3 w-full rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-all duration-200 transform hover:translate-x-1 ${
                !sidebarOpen ? "justify-center" : ""
              }`}
              onClick={() => {
                navigate("/user/about-doctor");
                closeMobileSidebar();
              }}
            >
              <Clipboard className="min-w-[20px]" size={20} />
              {sidebarOpen && <span className="font-medium">About Doctor</span>}
            </button>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="mt-auto">
          <div className="border-t border-gray-200 pt-4">
            <button
              className={`flex items-center space-x-3 p-3 w-full rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-200 transform hover:translate-x-1 ${
                !sidebarOpen ? "justify-center" : ""
              }`}
              onClick={handleLogout}
            >
              <LogOut className="min-w-[20px]" size={20} />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {/* Header */}
        <div className="bg-white mt-6 shadow-sm p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              Patient Dashboard
            </h1>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none group user-dropdown-button"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors overflow-hidden">
                  {userData.profileImage ? (
                    <img
                      src={`${API_BASE_URL}/${userData.profileImage}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "";
                      }}
                    />
                  ) : (
                    <User className="text-blue-600" size={16} />
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700 font-medium">
                    {userData.username || "User"}
                  </span>
                  <ChevronDown
                    className={`ml-1 text-gray-500 transition-transform duration-200 ${
                      isUserDropdownOpen ? "transform rotate-180" : ""
                    }`}
                    size={16}
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 animate-scaleIn user-dropdown-container">
                  <button
                    onClick={() => {
                      navigate("/user/profile");
                      setIsUserDropdownOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 w-full text-left flex items-center"
                  >
                    <User className="mr-2" size={16} />
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate("/user/edit-profile");
                      setIsUserDropdownOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 w-full text-left flex items-center"
                  >
                    <Edit className="mr-2" size={16} />
                    Edit Profile
                  </button>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsUserDropdownOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left flex items-center"
                  >
                    <LogOut className="mr-2" size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Welcome Card */}
          <div
            className={`${colorVariants[welcomeCardColor]} text-white rounded-xl p-6 mb-6 shadow-md hover:shadow-lg transition-all`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Welcome, {userData.username}
                </h2>
                <p className="opacity-90">
                  Manage your appointments and health profile
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => navigate("/user/book-appointment")}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all transform hover:-translate-y-0.5"
                >
                  Book New Appointment
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Recent Appointments</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {appointments.length}
                  </h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg transition-transform hover:scale-110">
                  <Calendar className="text-blue-600" size={20} />
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Completed</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {
                      appointments.filter(
                        (a) =>
                          new Date(a.slot.date) < new Date() &&
                          a.status === "Completed"
                      ).length
                    }
                  </h3>
                </div>
                <div className="bg-green-100 p-3 rounded-lg transition-transform hover:scale-110">
                  <CheckCircle className="text-green-600" size={20} />
                </div>
              </div>
            </div>
            <Link to="/services">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Services</p>
                    <h3 className="text-2xl font-bold mt-1">13</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg transition-transform hover:scale-110">
                    <HeartPulse className="text-purple-600" size={20} />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Appointments Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 transition-all hover:shadow-md">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Appointments
              </h2>
              <button
                onClick={() => navigate("/user/book-appointment")}
                className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
              >
                + Book New
              </button>
            </div>
            {/* Cancellation Notice */}
            {!loading &&
              recentAppointments.filter(
                (a) => new Date(a.slot.date) >= new Date()
              ).length > 0 && (
                <div className="px-6 py-3 bg-yellow-50 border-b border-yellow-100">
                  <p className="text-sm text-yellow-800">
                    <span className="font-medium">Need to cancel?</span> Please
                    contact our admin at {}
                    <a
                      href="tel:+919893210862"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      (+91)-9893210862
                    </a>
                    <br />
                    At least 24 hours before your appointment.
                  </p>
                </div>
              )}
            {loading ? (
              <div className="p-6">
                <Skeleton height={80} count={3} className="mb-4 rounded-lg" />
              </div>
            ) : appointments.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {appointments
                  .filter((appt) => {
                    const appointmentDate = new Date(appt.slot.date);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return appointmentDate >= today;
                  })
                  .map((appt) => (
                    <div
                      key={appt._id}
                      className="p-5 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-3 sm:mb-0">
                          <div className="flex items-center">
                            <Calendar
                              className="text-blue-500 mr-2 transition-transform group-hover:scale-110"
                              size={18}
                            />
                            <span className="font-medium text-gray-800">
                              {formatDate(appt.slot.date)}
                            </span>
                          </div>
                          <div className="flex items-center mt-1 ml-7">
                            <Clock className="text-gray-400 mr-2" size={16} />
                            <span className="text-gray-600">
                              {formatTime(appt.slot.startTime)} -{" "}
                              {formatTime(appt.slot.endTime)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`
                              px-3 py-1 rounded-full text-xs font-medium transition-all 
                              ${
                                appt.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : appt.status === "Pending"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            `}
                          >
                            {appt.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                No upcoming appointments.
              </div>
            )}
          </div>

          {/* Services Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ServiceCard
                title="Heart Checkup"
                description="Comprehensive heart health evaluation"
                icon={<HeartPulse className="text-blue-600" size={20} />}
                price="700"
                duration="30 mins"
              />
              <ServiceCard
                title="ECG"
                description="Electrocardiogram test"
                icon={<Activity className="text-blue-600" size={20} />}
                price="700"
                duration="20 mins"
              />
              <ServiceCard
                title="Echocardiogram"
                description="Heart ultrasound imaging"
                icon={<Stethoscope className="text-blue-600" size={20} />}
                price="700"
                duration="45 mins"
              />
              <ServiceCard
                title="ECG"
                description="Electrocardiogram test"
                icon={<Activity className="text-blue-600" size={20} />}
                price="700"
                duration="20 mins"
              />
              <ServiceCard
                title="ECG"
                description="Electrocardiogram test"
                icon={<Activity className="text-blue-600" size={20} />}
                price="700"
                duration="20 mins"
              />
              <ServiceCard
                title="ECG"
                description="Electrocardiogram test"
                icon={<Activity className="text-blue-600" size={20} />}
                price="700"
                duration="20 mins"
              />
            </div>
          </div>

          {/* Health Tip */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 transition-all hover:shadow-sm">
            <div className="flex items-start">
              <Clipboard
                className="text-blue-500 mt-1 mr-3 transition-transform hover:scale-110"
                size={18}
              />
              <div>
                <h3 className="font-medium text-blue-800 mb-1">
                  Health Tip of the Day
                </h3>
                <p className="text-gray-700">
                  Regular cardiovascular exercise for at least 30 minutes daily
                  can significantly improve heart health and reduce the risk of
                  heart disease.
                </p>
              </div>
            </div>
          </div>
        </div>

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
          toastClassName="rounded-lg shadow-md transition-all"
          progressClassName="bg-blue-500"
        />
      </div>

      {/* Global Styles for Animations */}
      <style global="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out forwards;
        }
        @media (max-width: 767px) {
          body {
            overflow-x: hidden;
          }
          .mobile-toggle-button {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;
