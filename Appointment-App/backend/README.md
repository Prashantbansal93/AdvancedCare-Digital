# ❤️ (AdvacnedCare-Digital) HeartCare – Cardiac Care Appointment Booking System (MERN)

A full-stack healthcare appointment booking platform (branded **Advanced Cardiac Care**) built with **React (Vite)**, **Node.js**, **Express**, and **MongoDB**, featuring slot-based scheduling, JWT authentication, Stripe payments, and a dedicated admin panel.

## 🚀 Features

### 👤 Patient / User Features
- Signup & login with JWT-based authentication
- Profile management (edit profile, upload profile image)
- Forgot / reset password via email link
- Browse available appointment slots by date
- Book and cancel appointment slots
- View personal appointment history
- Stripe-powered payment for consultations
- Toast notifications & animated UI (Framer Motion)

### 👨‍💼 Admin Features
- Role-based admin access (`isAdmin` flag)
- Admin dashboard with today's & all appointments
- Generate and manage (delete) appointment slots
- View appointments filtered by date
- Update appointment status (Pending / Completed / Cancelled)
- View and manage all registered users
- Edit admin profile (with old-password verification)

### ⚙️ Automation
- **Slot Scheduler** (`node-cron`-style interval job): auto-generates the next 30 days of appointment slots (2:00 PM – 8:00 PM, 30-min intervals) and purges expired slots daily

## 🏗️ Architecture Overview

```
Client (React + Vite)
  |
  |  HTTP (Axios + JWT Bearer Token)
  v
API Layer (Express)
  |
  |-- Auth Middleware (JWT verification)
  |-- Admin Middleware (role check)
  |
Controllers
  |
  |-- Auth (register/login/forgot/reset password)
  |-- User (CRUD, profile image upload via Multer)
  |-- Appointment (book/cancel/list/status)
  |-- Slot (generate/list/delete, cron scheduler)
  |-- Admin (profile view/update)
  |-- Payment (Stripe payment intents)
  |
Database (MongoDB via Mongoose)
  |
  |-- Users
  |-- Slots
  |-- Appointments
  |-- Payments
```

## 🗄️ Database Schema (Simplified)

**User**
- `username`, `age`, `phoneNumber`, `email` (unique), `password` (bcrypt hashed)
- `profileImage`, `gender`, `isAdmin`
- `resetPasswordToken`, `resetPasswordExpires`

**Slot**
- `date`, `startTime`, `endTime`, `dateTime`, `sortOrder`
- `isBooked` (boolean)
- Unique compound index on `date + startTime`

**Appointment**
- `user` (ref → User), `slot` (ref → Slot)
- `status`: `Pending` / `Completed` / `Cancelled`

**Payment**
- `userId` (ref → User), `amount`, `paymentIntentId`
- `status`: `pending` / `succeded` / `failed`
- `paymentMethod`

## 🔁 Appointment Booking Flow (High Level)

```
1. Admin/scheduler generates slots for upcoming days
2. Patient fetches available slots for a chosen date
3. Patient books a slot (slot marked isBooked = true)
4. Appointment record created linking user ↔ slot
5. Patient can cancel → slot freed, appointment deleted
6. Admin views/manages appointments by date or status
```

## 🔑 Authentication & Security

- JWT tokens (`Authorization: Bearer <token>`), 1-hour expiry
- Passwords hashed with `bcryptjs` (pre-save hook on the User model)
- Route-level `authMiddleware` + `adminMiddleware` for role protection
- Admin signup gated behind an `ADMIN_SECRET` key during registration
- Password reset via short-lived (15 min) JWT reset tokens emailed to the user
- CORS locked to a configured allowed-origin list

## 🧪 Tech Stack

**Backend**
- Node.js, Express
- MongoDB, Mongoose
- JWT (`jsonwebtoken`), `bcryptjs`
- `multer` (file/profile image uploads)
- `nodemailer` (password reset emails)
- `stripe` (payments)
- `node-cron`-style interval scheduler for slot generation
- `dotenv`, `cors`

**Frontend**
- React 19 + Vite
- React Router DOM
- Axios
- Tailwind CSS
- Framer Motion (animations)
- Stripe.js / React Stripe.js
- React Toastify, React Loading Skeleton
- Lucide React / React Icons / React Feather

## 📁 Project Structure

```
Healthcare-main/
└── Appointment-App/
    ├── backend/
    │   ├── Controllers/       # Auth, User, Appointment, Slot, Admin, Payment, ProfileImage
    │   ├── Models/             # User, Slot, Appointment, Payment (Mongoose schemas)
    │   ├── Routes/             # Auth, User, Appointment, Admin, Payment
    │   ├── middlewares/        # authMiddleware, adminMiddleware
    │   ├── utils/              # sendEmail.js, slotScheduler.js
    │   ├── uploads/             # Uploaded profile images
    │   ├── app.js               # Express app & route mounting
    │   └── db.js                 # Mongo connection + server bootstrap
    └── frontend/
        └── vite-project/
            └── src/
                ├── components/
                │   ├── Admin/     # Dashboard, Slots, Appointments, User management
                │   ├── Auth/      # Login, Register, Forgot/Reset Password, Payment form
                │   ├── User/       # Dashboard, Profile, Book Slots
                │   └── helper/     # HomePage, Navbar, Services, ScrollToTop
                └── App.jsx
```

## 📌 Environment Variables (backend/.env)

| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `PORT` | Backend server port |
| `JWT_SECRET` | Secret for signing auth & reset tokens |
| `ADMIN_SECRET` | Key required during signup to grant admin role |
| `STRIPE_SECRET_KEY` | Stripe secret API key |
| `EMAIL_USER` / `EMAIL_PASS` | Gmail credentials for sending reset-password emails |
| `CLIENT_URL` | Frontend URL used to build reset-password links |

> ⚠️ An `.env` file with real values is currently committed in the uploaded project. Rotate these secrets and add `.env` to `.gitignore` before pushing to a public repository.

## 🛠️ Getting Started

```bash
# Backend
cd Appointment-App/backend
npm install
npm run dev          # nodemon db.js

# Frontend
cd Appointment-App/frontend/vite-project
npm install
npm run dev           # vite
```

A convenience `build.sh` script is also provided at the `Appointment-App` root to install and run both apps.

## 📈 Possible Improvements

- Move `.env` out of version control and rotate exposed secrets
- Replace the `setInterval`-based scheduler with `node-cron` (already a listed dependency but unused directly)
- Add pagination/filtering to admin appointment and user lists
- Complete the payment flow (mark `Payment.status` as `succeded`/`failed` via Stripe webhooks, and link payments to appointments)
- Add automated tests for booking concurrency (double-booking edge cases)
- Add refresh tokens / logout token invalidation (current logout is client-side only)

## 🧑‍⚕️ About

An appointment booking system for a cardiac care clinic ("Advanced Cardiac Care" / HeartCare), covering patient self-service booking, admin scheduling controls, and integrated payments.
