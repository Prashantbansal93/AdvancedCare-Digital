import React, { useState } from "react";
import API from "../../../api";

import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router";

const AddSlot = ({ onClose, onSlotAdded }) => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!date || !startTime || !endTime) {
      setError("Fill all the details");
      return;
    }
    if (startTime >= endTime) {
      setError("End time must be after start time");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/api/appointment/generateSlot",
        { date, startTime, endTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status == 201) alert("slot added succesfully");
      navigate("/adminDashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding slot");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Slot</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <MdClose size={24} />
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Add Slot
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddSlot;
