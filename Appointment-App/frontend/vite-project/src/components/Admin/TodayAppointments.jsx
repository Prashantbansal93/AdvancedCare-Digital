import React, { useState, useEffect } from "react";
import API from "../../../api";
import { Calendar, Clock, User, Phone } from "lucide-react";

const TodayAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found. Please login.");
          setLoading(false);
          return;
        }

        const today = new Date().toISOString().split("T")[0];
        const res = await API.get(
          `/api/appointment/getAppointmentsByDate/${today}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAppointments(res.data.appointments);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching appointments");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []); // Added empty dependency array to run only once

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

  return (
    <div className="p-4 mt-30">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Today's Appointments
      </h2>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : appointments.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="mx-auto text-gray-400" size={48} />
          <p className="text-gray-600 text-lg mt-4">
            No appointments scheduled for today
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <User className="mr-2 text-blue-500" size={18} />
                    {appt.user?.username || "Patient"}
                  </h3>
                  <p className="text-gray-600 text-sm flex items-center mt-1">
                    <Phone className="mr-2 text-green-500" size={16} />
                    {appt.user?.phoneNumber || "N/A"}
                  </p>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    appt.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {appt.status}
                </div>
              </div>

              <div className="flex items-center mt-4 text-gray-700">
                <Calendar className="mr-2 text-blue-500" size={18} />
                <span>{new Date(appt.slot.date).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center mt-2 text-gray-700">
                <Clock className="mr-2 text-blue-500" size={18} />
                <span>
                  {formatTime(appt.slot.startTime)} -{" "}
                  {formatTime(appt.slot.endTime)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayAppointments;
