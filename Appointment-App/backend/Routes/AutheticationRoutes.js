const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/AuthController");

router.route("/register").post(AuthController.register);
router.route("/login").post(AuthController.login);

router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password/:token", AuthController.resetPassword);

module.exports = router;
