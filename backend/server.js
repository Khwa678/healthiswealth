const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ CORS (KEEP IT SIMPLE)
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

// ❌ REMOVE ALL app.options() — not needed

// ✅ BODY PARSER
app.use(express.json({ limit: '10mb' }));

// ✅ RATE LIMIT
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use('/api/chat', require('./routes/chat'));
app.use('/api/research', require('./routes/research'));
app.use('/api/sessions', require('./routes/sessions'));

// ✅ MONGODB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB error:', err.message);
    process.exit(1);
  });

// ✅ HEALTH CHECK
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ✅ ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

// ✅ START SERVER
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});