/**
 * Assignment 3 — minimal Express server:
 * - Serves files from ./public (static website)
 * - Four JSON APIs backed by MongoDB (maps to Assignment 2: register, login, profile, remove user)
 */

require('dotenv').config(); // loads PORT, MONGODB_URI from .env (optional)
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/assignment3';

// CORS: allows a separate front-end (e.g. Angular on :4200) to call these APIs
app.use(cors());
// express.json(): parses JSON request bodies into req.body
app.use(express.json());

// Static website: every file under public/ is served at the URL path (e.g. /index.html, /)
app.use(express.static(path.join(__dirname, 'public')));

/** Mongoose schema = shape of documents in the users collection */
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // demo only — hash in production
});
const User = mongoose.model('User', userSchema);

/** API 1 — Register (Create user): same idea as Angular RegisterComponent + AuthService.register */
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const doc = await User.create({ name, email, password });
    // 201 Created + client can use doc._id for later GET /api/user/:id
    res.status(201).json({ message: 'Registered', id: doc._id });
  } catch (err) {
    // duplicate email triggers Mongo duplicate key error
    res.status(400).json({ error: String(err.message) });
  }
});

/** API 2 — Login: find matching email+password; returns safe fields (no password) like session/profile */
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email, password });
  if (!u) return res.status(401).json({ error: 'Invalid email or password' });
  res.json({ id: u._id, name: u.name, email: u.email });
});

/** API 3 — Get user / profile by MongoDB id (read one user, password excluded) */
app.get('/api/user/:id', async (req, res) => {
  const u = await User.findById(req.params.id).select('-password');
  if (!u) return res.status(404).json({ error: 'User not found' });
  res.json(u);
});

/** API 4 — Delete user by id (cleanup / “logout account” style operation for the lab) */
app.delete('/api/user/:id', async (req, res) => {
  const u = await User.findByIdAndDelete(req.params.id);
  if (!u) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'Deleted', id: u._id });
});

// Connect DB then start HTTP server (listen only after DB is ready)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server http://localhost:${PORT}  |  DB: ${MONGODB_URI}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
