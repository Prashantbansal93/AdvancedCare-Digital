import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../../api";
import {
  Home,
  Calendar,
  LogOut,
  Menu,
  User,
  Edit,
  Heart,
  X,
  Clock,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Activity,
  AlertCircle,
  CheckCircle,
  Plus,
  TrendingUp,
  FileText,
  Shield,
} from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminDashboard = () => {
  // State declarations remain the same
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [thoughtOfTheDay, setThoughtOfTheDay] = useState("");

  const navigate = useNavigate();

  // Helper functions remain the same
  const toggleSideBar = () => setSidebarOpen(!sidebarOpen);
  const closeMobileSidebar = () => setMobileSidebarOpen(false);
  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logging out...");
    setTimeout(() => navigate("/"), 1300);
  };

  // Data fetching functions remain the same
  const generateThought = async () => {
    try {
      const response = await axios.get(
        "https://api.quotable.io/random?tags=health"
      );
      setThoughtOfTheDay(response.data.content);
    } catch (error) {
      setThoughtOfTheDay(
        "Quality cardiac care begins with prevention and early detection."
      );
    }
  };

  // useEffect hooks remain the same
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const [appointmentsRes, usersRes] = await Promise.all([
          API.get("/api/appointment/allAppointments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          API.get("/api/user/getAll", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const sortedAppointments = appointmentsRes.data.appointments.sort(
          (a, b) => new Date(a.slot.date) - new Date(b.slot.date)
        );

        setAppointmentCount(sortedAppointments.length);
        setRecentAppointments(sortedAppointments.slice(0, 5)); 
        setUserCount(usersRes.data.users.length);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchTodayAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await API.get(
          `/api/appointment/getAppointmentsByDate/${
            new Date().toISOString().split("T")[0]
          }`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCurrentCount(res.data.appointments.length);
      } catch (error) {
        console.error("Error fetching today's appointments:", error);
      }
    };

    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    checkScreenSize();
    fetchTodayAppointments();
    fetchData();
    generateThought();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [navigate]);

  // Status update function remains the same
  const handleUpdateStatus = async (id, currentStatus) => {
    const token = localStorage.getItem("token");
    let newStatus = currentStatus === "Completed" ? "Pending" : "Completed";

    try {
      setRecentAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: newStatus } : appt
        )
      );

      await API.put(
        "/api/appointment/updateStatus",
        { appointmentId: id, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      setRecentAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: currentStatus } : appt
        )
      );
      toast.error("Failed to update status");
    }
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

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all"
        onClick={toggleMobileSidebar}
      >
        {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} ${
          mobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        } bg-white shadow-xl p-4 flex flex-col fixed inset-y-0 left-0 z-30 transition-all duration-300 border-r border-gray-200`}
      >
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-8 pt-2">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <Stethoscope className="text-red-600 w-7 h-7" />
                <span className="text-xl font-bold text-gray-800">
                  CardioCare
                </span>
              </div>
            )}
            <button
              className="hidden md:flex items-center justify-center p-1.5 rounded-md bg-gray-100 hover:bg-gray-200"
              onClick={toggleSideBar}
            >
              {sidebarOpen ? (
                <ChevronLeft className="text-gray-600" size={18} />
              ) : (
                <ChevronRight className="text-gray-600" size={18} />
              )}
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            {[
              { icon: Home, label: "Dashboard", path: "/admin" },
              {
                icon: Calendar,
                label: "Manage Slots",
                path: "/admin/manageSlots",
              },
              {
                icon: ClipboardList,
                label: "Appointments",
                path: "/admin/appointments",
              },
              { icon: User, label: "Patients", path: "/admin/users" },
              { icon: Edit, label: "Profile", path: "/admin/edit-profile" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  window.location.pathname === item.path
                    ? "bg-red-50 text-red-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={closeMobileSidebar}
              >
                <item.icon className="min-w-[20px]" size={20} />
                {sidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto pb-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 w-full rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="min-w-[20px]" size={20} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
          {sidebarOpen && (
            <div className="mt-4 text-xs text-gray-400 text-center">
              v2.1.0 • Cardiac Suite
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                <Stethoscope className="text-red-600 mr-3" size={28} />
                Clinical Dashboard
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/manageSlots")}
              className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-colors"
            >
              <Plus className="mr-2" size={18} />
              Create New Slot
            </button>
          </div>

          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg mb-8">
            <div className="max-w-2xl mx-auto text-center">
              <Heart className="mx-auto mb-4" size={40} />
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Advancing Cardiac Care
              </h2>
              <p className="text-red-100">
                "Delivering exceptional cardiovascular health services with
                precision and compassion"
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {loading ? (
              Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} height={120} className="rounded-xl" />
                ))
            ) : (
              <>
                <StatCard
                  icon={Clock}
                  color="blue"
                  title="Today's Appointments"
                  value={currentCount}
                  change="+2 from yesterday"
                  link="/admin/appointments?filter=today"
                />
                <StatCard
                  icon={Calendar}
                  color="purple"
                  title="Total Bookings"
                  value={appointmentCount}
                  change="+15% this month"
                  link="/admin/appointments"
                />
                <StatCard
                  icon={User}
                  color="green"
                  title="Patients"
                  value={userCount - 1}
                  change="+8 new this week"
                  link="/admin/users"
                />
                <StatCard
                  icon={CheckCircle}
                  color="orange"
                  title="System Status"
                  value="100%"
                  change="All systems operational"
                />
              </>
            )}
          </div>

          {/* Recent Appointments */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <ClipboardList className="text-red-600 mr-3" />
                Recent Consultations
              </h2>
              <Link
                to="/admin/appointments"
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                View all <ChevronRight className="ml-1" size={16} />
              </Link>
            </div>

            {loading ? (
              <div className="p-6">
                <Skeleton count={5} height={60} className="mb-2" />
              </div>
            ) : recentAppointments.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {recentAppointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-red-100 p-2 rounded-full mr-4">
                          <User className="text-red-600" size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {appointment.user?.username || "Anonymous"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {formatDate(appointment.slot?.date)} •{" "}
                            {appointment.slot?.startTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            appointment.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateStatus(
                              appointment._id,
                              appointment.status
                            )
                          }
                          className={`text-sm ${
                            appointment.status === "Completed"
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-blue-600 hover:text-blue-800"
                          }`}
                          disabled={appointment.status === "Completed"}
                        >
                          Mark Complete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <FileText className="mx-auto mb-2 text-gray-300" size={32} />
                <p>No recent consultations found</p>
              </div>
            )}
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Clinical Insight */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <Shield className="text-red-600 mr-2" />
                  Clinical Insight
                </h3>
                <button
                  onClick={generateThought}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Refresh
                </button>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700 italic">"{thoughtOfTheDay}"</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold text-gray-800 flex items-center mb-4">
                <Activity className="text-red-600 mr-2" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate("/admin/manageSlots")}
                  className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 flex flex-col items-center justify-center transition-colors"
                >
                  <Plus size={20} className="mb-1" />
                  <span className="text-xs font-medium">New Slot</span>
                </button>
                <button
                  onClick={() => navigate("/admin/users")}
                  className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 flex flex-col items-center justify-center transition-colors"
                >
                  <User size={20} className="mb-1" />
                  <span className="text-xs font-medium">Add Patient</span>
                </button>
                <button
                  onClick={() => navigate("/admin/appointments")}
                  className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 flex flex-col items-center justify-center transition-colors"
                >
                  <Calendar size={20} className="mb-1" />
                  <span className="text-xs font-medium">View Calendar</span>
                </button>
                <button
                  onClick={() => navigate("/admin/reports")}
                  className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-orange-700 flex flex-col items-center justify-center transition-colors"
                >
                  <TrendingUp size={20} className="mb-1" />
                  <span className="text-xs font-medium">Reports</span>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold text-gray-800 flex items-center mb-4">
                <CheckCircle className="text-green-600 mr-2" />
                System Status
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "Appointment Module",
                    status: "Operational",
                    icon: Calendar,
                  },
                  {
                    name: "Patient Records",
                    status: "Operational",
                    icon: User,
                  },
                  {
                    name: "Billing System",
                    status: "Operational",
                    icon: FileText,
                  },
                  {
                    name: "API Services",
                    status: "Operational",
                    icon: Activity,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="bg-green-100 p-1.5 rounded-full mr-3">
                        <item.icon className="text-green-600" size={16} />
                      </div>
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Stethoscope className="text-red-600" size={18} />
                <span className="text-sm text-gray-500">
                  © {new Date().getFullYear()} CardioCare Admin
                </span>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/terms"
                  className="text-sm text-gray-500 hover:text-red-600"
                >
                  Terms
                </Link>
                <Link
                  to="/privacy"
                  className="text-sm text-gray-500 hover:text-red-600"
                >
                  Privacy
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-gray-500 hover:text-red-600"
                >
                  Contact
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="rounded-lg shadow-sm"
        progressClassName="bg-gradient-to-r from-red-500 to-red-600"
      />
    </div>
  );
};

// StatCard Component for reusable stats
const StatCard = ({ icon: Icon, color, title, value, change, link }) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-200",
    },
  };

  return (
    <Link
      to={link || "#"}
      className={`p-5 rounded-xl border-l-4 ${colorClasses[color].border} ${colorClasses[color].bg} hover:shadow-md transition-shadow`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${colorClasses[color].text} bg-white`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-3 flex items-center">
        <TrendingUp className="mr-1" size={14} />
        {change}
      </p>
    </Link>
  );
};

export default AdminDashboard;
