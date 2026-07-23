import API from "../../../api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  AlertTriangle,
  Phone,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";

const BookSlots = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [slots, setSlots] = useState([]);
  const [showPending, setShowPending] = useState(false);
  const navigate = useNavigate();

  const fetchSlots = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get(`/api/appointment/getSlots/${selectedDate}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSlots(res.data.slots);
    } catch (error) {
      setSlots([]);
      toast.error("Error fetching slots. Please try again.");
    }
  };

  const handleBookSlot = async (slot) => {
    if (pendingAppointments.length > 0) {
      toast.warning(
        "You already have pending appointments. Please contact admin to cancel them first."
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await API.get(`/api/appointment/bookSlot/${slot._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Appointment booked successfully!");
      setTimeout(() => {
        navigate("/userDashboard");
      }, 1500);
    } catch (error) {
      toast.error("Failed to book the slot. Please try again.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      toast.warning("Please select a date first");
      return;
    }
    fetchSlots();
  };

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const decoded = jwtDecode(token);
        const res = await API.get(`/api/appointment/myAppointments`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const pending = res.data.appointments.filter(
          (appt) => appt.status === "Pending"
        );
        setPendingAppointments(pending || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchUserAppointments();
  }, [navigate]);

  const handleOnlinePayment = async (slot) => {
    if (pendingAppointments.length > 0) {
      toast.warning(
        "You already have pending appointments. Please contact admin to cancel them first."
      );
      return;
    }
    navigate("/user/payment", { state: { slotId: slot._id } });
  };

  return (
    <div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2)), url('/ozkan-guner-fyD9fsd5gs4-unsplash.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Pending Appointments Warning */}
        {pendingAppointments.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <AlertTriangle className="text-yellow-600 mr-2" size={20} />
                You have {pendingAppointments.length} pending appointment
                {pendingAppointments.length > 1 ? "s" : ""}
              </h2>
              <button
                onClick={() => setShowPending(!showPending)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {showPending ? "Hide" : "Show Details"}
              </button>
            </div>

            {showPending && (
              <div className="space-y-4">
                {pendingAppointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="bg-white p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">
                          Date:{" "}
                          {new Date(appointment.slot.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                          Time: {appointment.slot.startTime} -{" "}
                          {appointment.slot.endTime}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        Pending
                      </span>
                    </div>
                    <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800 flex items-center">
                        <Phone className="mr-2" size={16} />
                        To cancel, please contact admin at{" "}
                        <a
                          href="tel:+919893210862"
                          className="font-semibold ml-1"
                        >
                          +91-9893210862
                        </a>
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        (Available 9AM - 5PM, Monday to Saturday)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 text-sm text-yellow-700">
              <p>
                Please cancel your pending appointment before booking a new one.
              </p>
              <p className="font-medium">
                Note: Cancellations require admin approval.
              </p>
            </div>
          </div>
        )}

        {/* Booking Form */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-semibold text-white flex items-center">
              <Calendar className="mr-3" size={24} />
              Book Your Appointment
            </h1>
          </div>

          {/* Content */}
          <div className="p-6">
            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="date"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center"
                >
                  <Search className="mr-2" size={18} />
                  Find Slots
                </button>
              </div>
            </form>

            {/* Slots List */}
            <div className="space-y-4">
              {slots.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    {selectedDate
                      ? "Search Slots for the date "
                      : "Please select a date to view available slots"}
                  </p>
                </div>
              ) : (
                slots.map((slot, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      slot.isBooked
                        ? "bg-gray-50 border-gray-200"
                        : "bg-white border-blue-200 hover:border-blue-300"
                    } transition-colors shadow-sm`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock
                          className={`mr-3 ${
                            slot.isBooked ? "text-gray-400" : "text-blue-500"
                          }`}
                          size={20}
                        />
                        <span
                          className={`text-lg font-medium ${
                            slot.isBooked ? "text-gray-500" : "text-gray-800"
                          }`}
                        >
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </div>
                      {slot.isBooked ? (
                        <div className="flex items-center text-gray-500">
                          <XCircle className="mr-1" size={18} />
                          Booked
                        </div>
                      ) : (
                        <div className="flex gap-2 flex-col sm:flex-row">
                          <button
                            onClick={() => handleBookSlot(slot)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center"
                            disabled={pendingAppointments.length > 0}
                          >
                            <CheckCircle className="mr-2" size={18} />
                            Book Now (Pay Later)
                          </button>
                          <button
                            onClick={() => handleOnlinePayment(slot)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center"
                            disabled={pendingAppointments.length > 0}
                          >
                            <CheckCircle className="mr-2" size={18} />
                            Pay Online
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-800 mb-2">
              Need to cancel an appointment?
            </h3>
            <p className="text-sm text-gray-600 flex items-center">
              <Phone className="mr-2 text-blue-600" size={16} />
              Contact our admin at{" "}
              <a
                href="tel:+919893210862"
                className="text-blue-600 hover:underline font-medium ml-1"
              >
                +91-9893210862
              </a>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Office hours: 9AM - 5PM, Monday to Saturday
            </p>
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
        toastClassName="rounded-lg shadow-md"
        progressClassName="bg-blue-500"
      />
    </div>
  );
};

export default BookSlots;
