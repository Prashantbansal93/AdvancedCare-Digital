const express = require("express");
const router = express.Router();
const PaymentController = require("../Controllers/paymentController.js");
const { authMiddleware } = require("../middlewares/AuthMiddleware.js");

router.post(
  "/create-intent",
  authMiddleware,
  PaymentController.createPaymentIntent
);

module.exports = router;
