import React, { useState } from "react";
import API from "../../../api";
import axios from "axios";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { Calendar, Clock, AlertCircle, Plus } from "react-feather";
import AddSlot from "./AddSlot";

const ManageSlots = () => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchSlots = async () => {
    if (!selectedDate) {
      setError("Please select a date first");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await API.get(`/api/appointment/getSlots/${selectedDate}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSlots(res.data.slots);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching slots");
      setSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSlotAdded = () => {
    fetchSlots();
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.request({
        method: "DELETE",
        url: "http://localhost:8000/api/appointment/deleteSlot",
        headers: { Authorization: `Bearer ${token}` },
        data: { slotId },
      });
      fetchSlots();
    } catch (err) {
      console.error("Error deleting slot", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Appointment Slot Management
            </h1>
            <p className="text-gray-600">
              Manage and schedule available appointment slots
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 md:mt-0 flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-300"
          >
            <Plus className="mr-2" size={18} />
            Add New Slot
          </button>
        </div>

        {/* Search Panel */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Find Available Slots
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="text-gray-400" size={18} />
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <button
              onClick={fetchSlots}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Searching...
                </>
              ) : (
                "Search Slots"
              )}
            </button>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-600">
              <AlertCircle className="mr-3" size={18} />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Slots List */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Available Time Slots
            </h2>
            {slots.length > 0 && (
              <span className="text-sm text-gray-500">
                {slots.length} {slots.length === 1 ? "slot" : "slots"} found
              </span>
            )}
          </div>

          {slots.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Calendar className="mx-auto text-gray-300 mb-3" size={40} />
              <h3 className="text-lg font-medium text-gray-500 mb-1">
                {selectedDate ? "No slots available" : "No date selected"}
              </h3>
              <p className="text-gray-400">
                {selectedDate
                  ? "Try another date or add new slots"
                  : "Please select a date to view available slots"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {slots.map((slot) => (
                <motion.div
                  key={slot._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-5 rounded-xl border transition-all hover:shadow-md ${
                    slot.isBooked
                      ? "border-red-200 bg-red-50 hover:bg-red-50"
                      : "border-green-200 bg-green-50 hover:bg-green-100"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <Clock
                        className={`mr-3 ${
                          slot.isBooked ? "text-red-500" : "text-green-500"
                        }`}
                        size={20}
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {slot.startTime} - {slot.endTime}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(slot.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        slot.isBooked
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {slot.isBooked ? "Booked" : "Available"}
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDeleteSlot(slot._id)}
                      disabled={slot.isBooked}
                      className={`flex items-center text-sm px-3 py-1.5 rounded-lg transition-all ${
                        slot.isBooked
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-red-600 hover:text-white hover:bg-red-600"
                      }`}
                    >
                      <MdDelete className="mr-1.5" size={16} />
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Slot Modal */}
      {isModalOpen && (
        <AddSlot
          onClose={() => setIsModalOpen(false)}
          onSlotAdded={handleSlotAdded}
        />
      )}
    </div>
  );
};

export default ManageSlots;
