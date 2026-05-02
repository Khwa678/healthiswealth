const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// ─── CORS (FIXED) ─────────────────────────────────────────────
app.use(cors({
  origin: [
    "http://localhost:5174",
    "https://healthiswealth-7.onrender.com"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

// ─── BODY PARSER ─────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));

// ─── RATE LIMITER (BEFORE ROUTES) ─────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// ─── ROUTES (ONLY ONCE) ──────────────────────────────────────
app.use('/api/chat', require('./routes/chat'));
app.use('/api/research', require('./routes/research'));
app.use('/api/sessions', require('./routes/sessions'));

// ─── HEALTH CHECK ────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    llmProvider: process.env.LLM_PROVIDER || 'ollama',
  });
});

// ─── MONGODB CONNECTION ──────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB error:', err.message);
    process.exit(1);
  });

// ─── ERROR HANDLER ───────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// ─── START SERVER ────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});