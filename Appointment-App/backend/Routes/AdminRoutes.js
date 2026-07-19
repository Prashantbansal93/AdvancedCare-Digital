const express = require("express");

const router = express.Router();

const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/AuthMiddleware");

const AdminController = require("../Controllers/adminController");

router.get(
  "/profile",
  authMiddleware,
  adminMiddleware,
  AdminController.getAdminProfile
);

router.put(
  "/edit-profile",
  authMiddleware,
  adminMiddleware,
  AdminController.updateAdminProfile
);

module.exports = router;
