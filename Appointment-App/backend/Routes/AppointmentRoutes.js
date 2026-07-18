const express = require("express");
const router = express.Router();

const AppointmentController = require("../Controllers/AppointmentController");
const SlotController = require("../Controllers/SlotController");

const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/AuthMiddleware");

router.get("/bookSlot/:slotId", authMiddleware, AppointmentController.bookSlot);

router.post(
  "/cancelAppointment",
  authMiddleware,
  AppointmentController.cancelAppointment
);

router.get(
  "/myAppointments",
  authMiddleware,
  AppointmentController.getUserAppointments
);

router.get(
  "/getAppointment/:id",
  authMiddleware,
  AppointmentController.getAppointment
);

router.post(
  "/generateSlot",
  authMiddleware,
  adminMiddleware,
  SlotController.generateSlot
);

router.get(
  "/allAppointments",
  authMiddleware,
  adminMiddleware,
  AppointmentController.getAllAppointmentsForAdmin
);

router.get("/getSlots/:date", authMiddleware, SlotController.getSlotsByDate);

router.delete(
  "/deleteSlot",
  authMiddleware,
  adminMiddleware,
  SlotController.deleteSlots
);

router.get(
  "/getAppointmentsByDate/:date",
  authMiddleware,
  adminMiddleware,
  AppointmentController.getAppointmentsByDate
);

router.put(
  "/updateStatus",
  authMiddleware,
  adminMiddleware,
  AppointmentController.updateAppointmentStatus
);



module.exports = router;
