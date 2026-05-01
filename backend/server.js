const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

<<<<<<< HEAD
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
=======
const app = express();

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    "https://healthiswealth-7.onrender.com",
    "http://localhost:5173"
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use('/api/chat', require('./routes/chat'));
// Rate limiting - protect from abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
>>>>>>> 0e43532eec4721979e504ff8cff13981d6c113b9
  max: 50,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

<<<<<<< HEAD
// ✅ ROUTES
app.use("/api/auth", authRoutes);
=======
// ─── MongoDB ─────────────────────────────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI not set in .env file');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅  MongoDB connected'))
  .catch((err) => {
    console.error('❌  MongoDB connection error:', err.message);
    process.exit(1);
  });

// ─── Routes ──────────────────────────────────────────────────────────────────
>>>>>>> 0e43532eec4721979e504ff8cff13981d6c113b9
app.use('/api/chat', require('./routes/chat'));
app.use('/api/research', require('./routes/research'));
app.use('/api/sessions', require('./routes/sessions'));

<<<<<<< HEAD
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
=======
// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    llmProvider: process.env.LLM_PROVIDER || 'ollama',
  });
});

// ─── Error handler ───────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// ─── Start ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀  CuraLink backend running on http://localhost:${PORT}`);
  console.log(`🤖  LLM provider: ${process.env.LLM_PROVIDER || 'ollama'}`);
  console.log(`📄  API docs: http://localhost:${PORT}/api/health\n`);
>>>>>>> 0e43532eec4721979e504ff8cff13981d6c113b9
});