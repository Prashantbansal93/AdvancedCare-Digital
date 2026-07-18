const Slot = require("../Models/SlotModel");
const Appointment = require("../Models/AppointmentModel");

const generateSlot = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingSlot = await Slot.findOne({ date, startTime, endTime });
    if (existingSlot) {
      return res
        .status(400)
        .json({ message: "Slot already exists for this time" });
    }

    const slot = await Slot.create({
      date,
      startTime,
      endTime,
      isBooked: false,
    });

    return res.status(201).json({ message: "Slot created successfully", slot });
  } catch (error) {
    console.error("Error creating slot:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

const getSlotsByDate = async (req, res) => {
  try {
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({ message: "Please provide the date" });
    }

    const slotArray = await Slot.find({ date }).sort({ sortOrder: 1 });

    if (slotArray.length === 0) {
      return res.status(404).json({
        message: "No slots available for this Date! Try Another Date",
      });
    }

    return res.status(200).json({
      slots: slotArray,
      message: "Slots fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching slots:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

const deleteSlots = async (req, res) => {
  const { slotId } = req.body;
  if (!slotId) {
    return res.status(400).json({ msg: "Please Provide SlotId" });
  }
  try {
    await Appointment.deleteMany({ slot: slotId });
    const slot = await Slot.findByIdAndDelete(slotId);

    if (!slot) {
      return res.status(400).json({ msg: "Slot not Found" });
    }
    const appointment = await Appointment.find();
    return res.status(200).json({ msg: "Slot Deleted Succesfully" });
  } catch (error) {
    return res.status(400).json({ msg: "Server Error Occured" }, error);
  }
};

module.exports = { generateSlot, getSlotsByDate, deleteSlots };
