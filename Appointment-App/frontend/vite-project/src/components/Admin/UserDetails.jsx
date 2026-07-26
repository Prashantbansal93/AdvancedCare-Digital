import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../../api";
import { useNavigate, useParams } from "react-router";
import { User, Calendar, Clock, Clipboard } from "lucide-react";

const DoctorUserView = () => {
  const [patient, setPatient] = useState(null); // Changed from patients to patient
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(
          `/api/user/get/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPatient(res.data.user); // Set single patient object
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]); // Added id to dependency array

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await API.get(
          `/api/appointment/user/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setAppointments(res.data.appointments);
      } catch (error) {
        toast.error("Error fetching appointments.");
      }
    };
    fetchAppointments();
  }, appointments);

  if (loading)
    return <div className="p-4 text-center">Loading patient data...</div>;
  if (!patient) return <div className="p-4 text-center">Patient not found</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <User size={24} /> Patient Overview
      </h1>

      {/* Changed from grid to single card since we're showing one patient */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-blue-50">
          <h3 className="font-semibold text-lg">{patient.username}</h3>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>Age: {patient.age}</span>
            <span>{patient.gender}</span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 text-gray-700 mb-3">
            <Clipboard size={16} />
            <span className="font-medium">Medical Notes</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {patient.medicalNotes || "No notes available"}
          </p>

          <div className="flex items-center gap-2 text-gray-700 mb-2">
            <Calendar size={16} />
            <span className="font-medium">Appointments</span>
          </div>
          <div className="space-y-2">
            {appointments?.length > 0 ? (
              appointments.map((appt) => (
                <div key={appt._id} className="text-sm p-2 bg-gray-50 rounded">
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {formatDate(appt.slot.date)}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        appt.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : appt.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 mt-1">
                    <Clock size={12} />
                    <span>
                      {appt.slot.startTime} -{appt.slot.endTime}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No appointments scheduled</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorUserView;
