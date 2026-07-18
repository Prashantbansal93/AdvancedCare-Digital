const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    sortOrder: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Indexes for optimal query performance
SlotSchema.index({ date: 1, sortOrder: 1 });
SlotSchema.index({ dateTime: 1 });
SlotSchema.index({ date: 1, startTime: 1 }, { unique: true });

module.exports = mongoose.model("Slot", SlotSchema);
