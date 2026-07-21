import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/helper/Navbar";
import HomePage from "./components/helper/HomePage";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import AdminDashBoard from "./components/Admin/AdminDashBoard";
import UserDashboard from "./components/User/UserDashboard";
import Appointments from "./components/Admin/Appointments";
import AddSlot from "./components/Admin/AddSlot";
import ManageSlots from "./components/Admin/Manageslots";
import UserManagement from "./components/Admin/UserManagement";
import EditProfileAdmin from "./components/Admin/EditProfileAdmin";
import AboutDoctor from "./components/Admin/AboutDoctor";
import EditProfileUser from "./components/User/EditProfileUser";
import BookSlots from "./components/User/BookSlots";
import UserProfile from "./components/User/UserProfile";
import PaymentForm from "./components/Auth/PaymentForm";
import UserDetails from "./components/Admin/UserDetails";
import TodayAppointments from "./components/Admin/TodayAppointments";
import ServicePage from "./components/helper/ServicePage";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ScrollToTop from "./components/helper/ScrollToTop";



function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminDashboard" element={<AdminDashBoard />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/admin/appointments" element={<Appointments />} />
        <Route path="/admin/manageSlots" element={<ManageSlots />} />
        <Route path="/admin/slots" element={<AddSlot />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/edit-profile" element={<EditProfileAdmin />} />
        <Route path="/user/about-doctor" element={<AboutDoctor />} />
        <Route path="/user/edit-profile" element={<EditProfileUser />} />
        <Route path="/user/book-appointment" element={<BookSlots />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/payment" element={<PaymentForm />} />
        <Route path="user-details/:id" element={<UserDetails />} />
        <Route path="/user/todayAppointments" element={<TodayAppointments />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
