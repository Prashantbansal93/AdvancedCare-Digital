import React, { useEffect, useState } from "react";
import API from "../../../api";
import { motion } from "framer-motion";
import { MdPerson, MdSchedule, MdPhone } from "react-icons/md";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found. Please login.");
          return;
        }

        const res = await API.get("/api/appointment/allAppointments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAppointments(res.data.appointments);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching appointments");
      }
    };

    fetchAppointments();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 p-5"
    >
      <div className="max-w-6xl mx-auto mt-30">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Appointments</h2>
        </div>

        {error && <p className="text-red-500 mb-6">{error}</p>}

        {appointments.length === 0 ? (
          <p className="text-gray-600 text-lg">No Appointments Yet!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appt) =>
              appt && appt.slot ? (
                <motion.div
                  key={appt._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <MdPerson className="text-xl text-blue-500" />
                    <h3 className="text-lg font-medium text-gray-900">
                      {appt.user.username}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700 mb-3">
                    <MdSchedule className="text-xl text-green-500" />
                    <div>
                      <p className="font-medium">
                        {new Date(appt.slot.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm">
                        {appt.slot.startTime} - {appt.slot.endTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700 mb-4">
                    <MdPhone className="text-xl text-gray-500" />
                    <p>{appt.user.phoneNumber || "N/A"}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        appt.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : appt.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {appt.status.charAt(0).toUpperCase() +
                        appt.status.slice(1)}
                    </span>
                  </div>
                </motion.div>
              ) : null
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Appointments;
