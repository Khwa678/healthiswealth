const express = require("express");
const router = express.Router();

// TEMP TEST ROUTE
router.post("/", (req, res) => {
  res.json({ message: "Chat route working ✅" });
});

module.exports = router;