const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    res.json({
      reply: `Chat working: ${message}`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;