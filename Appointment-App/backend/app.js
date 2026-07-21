require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const UserRoutes = require("./Routes/UserRoutes");
const AuthenticationRoutes = require("./Routes/AutheticationRoutes");
const AppointmentRoutes = require("./Routes/AppointmentRoutes");
const AdminRoutes = require("./Routes/AdminRoutes");
const paymentRoutes = require("./Routes/PaymentRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ["https://advancedcardiaccare.netlify.app"];
// const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Mounting the routes
app.use("/api/user", UserRoutes);
app.use("/api/auth", AuthenticationRoutes);
app.use("/api/appointment", AppointmentRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/payment", paymentRoutes);

module.exports = app;
