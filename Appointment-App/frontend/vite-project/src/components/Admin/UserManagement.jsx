import React, { useEffect, useState } from "react";
import API from "../../../api";
import { useNavigate } from "react-router";

const UserManagement = () => {
  
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersAndAppointments = async () => {
      try {
        const token = localStorage.getItem("token");

        const userRes = await API.get("/api/user/getAll", {
          headers: { Authorization: `Bearer ${token}` },
        });
        let usersData = userRes.data.users.filter((user) => !user.isAdmin);

        setUsers(usersData);
        setFilteredUsers(usersData);

        const appointmentRes = await API.get(
          "/api/appointment/allAppointments",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const appointmentsData = {};

        appointmentRes.data.appointments.forEach((appointment) => {
          if (appointment.user && appointment.slot) {
            appointmentsData[appointment.user._id] = {
              date: appointment.slot.date,
              status: appointment.status.toLowerCase(),
            };
          }
        });

        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsersAndAppointments();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => {
        const userAppointment = appointments[user._id] || {};
        const userStatus = userAppointment.status || "";

        // Strictly match status filter (including case sensitivity)
        const statusMatch =
          statusFilter === "" || userStatus === statusFilter.toLowerCase();

        // Compare date by converting both to YYYY-MM-DD
        const dateMatch =
          dateFilter === "" ||
          (userAppointment.date &&
            new Date(userAppointment.date).toISOString().split("T")[0] ===
              dateFilter);

        return (
          user.username.toLowerCase().includes(search.toLowerCase()) &&
          statusMatch &&
          dateMatch
        );
      })
    );
  }, [search, statusFilter, dateFilter, users, appointments]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setDateFilter("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleRowClick = (userId) => {
    navigate(`/user-details/${userId}`);
  };

  return (
    <div className="p-6 mt-30 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-blue-900 mb-6">
        User Management
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="">Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          onClick={clearFilters}
          className="p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200"
        >
          Clear Filters
        </button>
        <button
          onClick={() => navigate("/adminDashboard")}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Back to Dashboard
        </button>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-3 text-left text-sm font-semibold text-blue-900 uppercase">
                Username
              </th>
              <th className="p-3 text-left text-sm font-semibold text-blue-900 uppercase">
                Email
              </th>
              <th className="p-3 text-left text-sm font-semibold text-blue-900 uppercase">
                Phone
              </th>
              <th className="p-3 text-left text-sm font-semibold text-blue-900 uppercase">
                Appointment Status
              </th>
              <th className="p-3 text-left text-sm font-semibold text-blue-900 uppercase">
                Appointment Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  onClick={() =>
                    handleRowClick(user._id, appointments[user._id])
                  }
                  className="hover:bg-gray-50 cursor-pointer transition duration-200"
                >
                  <td className="p-3 border-t border-gray-200 text-sm text-gray-700">
                    {user.username}
                  </td>
                  <td className="p-3 border-t border-gray-200 text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="p-3 border-t border-gray-200 text-sm text-gray-700">
                    {user.phoneNumber || "N/A"}
                  </td>
                  <td className="p-3 border-t border-gray-200 text-sm text-gray-700">
                    {appointments[user._id]?.status || "No Appointment"}
                  </td>
                  <td className="p-3 border-t border-gray-200 text-sm text-gray-700">
                    {appointments[user._id]?.date
                      ? formatDate(appointments[user._id]?.date)
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-3 text-center text-sm text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
