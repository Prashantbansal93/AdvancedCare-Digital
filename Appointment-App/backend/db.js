const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");
const { slotScheduler } = require("./utils/slotScheduler"); // Adjust path as needed

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

slotScheduler();

slotScheduler();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = connectDB;
