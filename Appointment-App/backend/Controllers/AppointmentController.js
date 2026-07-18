const Appointment = require("../Models/AppointmentModel");
const Slot = require("../Models/SlotModel");

const bookSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    const userId = req.user.id;

    // Find the slot by ID
    const slot = await Slot.findById(slotId);

    // Check if slot exists
    if (!slot) {
      return res.status(404).json({ msg: "Slot not found" });
    }

    // Check if the slot is already booked
    if (slot.isBooked) {
      return res.status(400).json({ msg: "Slot is already booked" });
    }

    // Mark slot as booked
    slot.isBooked = true;
    await slot.save();

    // Create an appointment with the booked slot
    const appointment = await Appointment.create({
      user: userId,
      slot: slot._id,
      date: slot.date, // Use slot's existing date
    });

    return res.status(200).json({
      msg: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { slotId } = req.body;
    const userId = req.user.id;

    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ msg: "Slot not found" });

    if (!slot.isBooked)
      return res.status(400).json({ msg: "Slot is not booked" });

    const appointment = await Appointment.findOneAndDelete({
      slot: slotId,
      user: userId,
    });

    if (!appointment) {
      return res
        .status(400)
        .json({ msg: "No appointment found for this slot and user" });
    }

    slot.isBooked = false;
    await slot.save();

    return res.status(200).json({ msg: "Slot canceled successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

    const appointments = await Appointment.find({ user: userId })
      .populate("slot")
      .populate("user", "username email");



    return res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const appointment = await Appointment.findOne({ _id: id, user: userId })
      .populate("slot")
      .populate("user", "username email");

    if (!appointment) {
      return res
        .status(404)
        .json({ message: "Appointment not found or not accessible" });
    }

    return res.status(200).json({ appointment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllAppointmentsForAdmin = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("slot")
      .populate("user", "username email phoneNumber");

    return res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAppointmentsByDate = async (req, res) => {
  try {
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({ message: "Please provide the date" });
    }

    const slots = await Slot.find({ date });

    if (!slots.length) {
      return res.status(404).json({
        message: "No slots available for this date! Try another date.",
      });
    }

    const slotIds = slots.map((slot) => slot._id);

    const appointments = await Appointment.find({ slot: { $in: slotIds } })
      .populate("slot")
      .populate("user", "username email phoneNumber");

    if (!appointments.length) {
      return res.status(404).json({
        message: "No appointments found for this date!",
      });
    }

    return res.status(200).json({
      appointments,
      message: "Appointments fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

const updateAppointmentStatus = async (req, res) => {
  const { appointmentId, status } = req.body;

  if (!appointmentId || !status) {
    return res.status(400).json({ msg: "Missing required fields" });
  }
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }
    if (appointment.status == "Pending") {
      appointment.status = "Completed";
    }
    appointment.slot.status = status;
    await appointment.save();
    return res
      .status(200)
      .json({ msg: "Appointment status updated", appointment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  bookSlot,
  cancelAppointment,
  getUserAppointments,
  getAppointment,
  getAllAppointmentsForAdmin,
  getAppointmentsByDate,
  updateAppointmentStatus,
};
