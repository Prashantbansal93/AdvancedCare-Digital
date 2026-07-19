const bcrypt = require("bcryptjs");
const User = require("../Models/UserModel");

const getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findOne({ isAdmin: true }).select("-password"); // Exclude password
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateAdminProfile = async (req, res) => {
  try {
    const { oldPassword, password, name, email } = req.body;

    const admin = await User.findOne({ isAdmin: true });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      admin.password
    );

    if (!isOldPasswordCorrect) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    admin.name = name || admin.name;
    admin.email = email || admin.email;

    if (password) {
      admin.password = password;
    }

    await admin.save();

    return res.status(200).json({
      message: "Admin profile updated successfully",
      admin,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAdminProfile, updateAdminProfile };
