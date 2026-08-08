const express = require("express");
const router = express.Router();
const { askFaq } = require("../Controllers/FaqController");

router.post("/ask", askFaq);

module.exports = router;