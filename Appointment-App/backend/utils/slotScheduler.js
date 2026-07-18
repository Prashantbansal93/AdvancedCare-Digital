const Slot = require("../Models/SlotModel");

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 14; hour < 20; hour++) {
    slots.push({
      startTime: `${hour.toString().padStart(2, "0")}:00`,
      endTime: `${hour.toString().padStart(2, "0")}:30`,
      sortOrder: hour * 2,
    });
    slots.push({
      startTime: `${hour.toString().padStart(2, "0")}:30`,
      endTime: `${(hour + 1).toString().padStart(2, "0")}:00`,
      sortOrder: hour * 2 + 1,
    });
  }
  return slots;
};

const generateSlots = async () => {
  try {
    const slotTimes = generateTimeSlots();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const batchOperations = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = formatDate(date);

      slotTimes.forEach((slot) => {
        batchOperations.push({
          updateOne: {
            filter: {
              date: dateStr,
              startTime: slot.startTime,
            },
            update: {
              $setOnInsert: {
                date: dateStr,
                startTime: slot.startTime,
                endTime: slot.endTime,
                isBooked: false,
                sortOrder: slot.sortOrder,
                dateTime: new Date(`${dateStr}T${slot.startTime}`),
              },
            },
            upsert: true,
          },
        });
      });
    }

    if (batchOperations.length > 0) {
      await Slot.bulkWrite(batchOperations);
    }
  } catch (err) {
    console.error("Error in generateSlots:", err);
  }
};

const deleteOldSlots = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const result = await Slot.deleteMany({
      dateTime: { $lt: today },
    });
    console.log(`Deleted ${result.deletedCount} old slots`);
  } catch (err) {
    console.error("Error deleting old slots:", err);
  }
};

const slotScheduler = async () => {
  try {
    await generateSlots();
    await deleteOldSlots();

    const interval = setInterval(async () => {
      try {
        await generateSlots();
        await deleteOldSlots();
      } catch (err) {
        console.error("Scheduled job error:", err);
      }
    }, 24 * 60 * 60 * 1000);

    process.on("SIGTERM", () => clearInterval(interval));
    process.on("SIGINT", () => clearInterval(interval));
  } catch (err) {
    console.error("Scheduler initialization error:", err);
  }
};

module.exports = {
  generateSlots,
  deleteOldSlots,
  slotScheduler,
  generateTimeSlots, // Export for testing
  formatDate, // Export for testing
};
