const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Research API working ✅" });
});

module.exports = router;