const express = require("express");
const router = express.Router();
console.log("✅ authRoutes loaded");
const {
  registerUser,
  loginUser
} = require("../controllers/authController");

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

module.exports = router;