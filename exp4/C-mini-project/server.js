/**
 * Mini project (Education domain) — full stack minimum:
 * - Express serves jQuery Mobile static site from ./public
 * - MongoDB stores course enrollments
 * AWS Elastic Beanstalk runs `npm start` / Procfile and sets PORT automatically.
 */

require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
// Elastic Beanstalk injects PORT; locally we default to 3000
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/education_mini';

app.use(express.json());
// Single-folder static hosting: HTML/CSS/JS for the mobile UI
app.use(express.static(path.join(__dirname, 'public')));

/** One collection: who enrolled in which course (lab-friendly schema) */
const enrollmentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  courseTitle: { type: String, required: true },
  enrolledAt: { type: Date, default: Date.now },
});
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

/**
 * GET /api/courses — fixed catalog (no DB) so the UI can build a &lt;select&gt;.
 * Returns JSON array the jQuery Mobile page loads with $.getJSON into a select.
 */
app.get('/api/courses', (req, res) => {
  res.json([
    { id: 'web', title: 'Web Application Development' },
    { id: 'db', title: 'Database Systems' },
    { id: 'mobile', title: 'Mobile Computing' },
  ]);
});

/** POST /api/enroll — body: { studentName, courseTitle } — Create in MongoDB */
app.post('/api/enroll', async (req, res) => {
  try {
    const { studentName, courseTitle } = req.body;
    const doc = await Enrollment.create({ studentName, courseTitle });
    res.status(201).json({ ok: true, id: doc._id });
  } catch (e) {
    res.status(400).json({ error: String(e.message) });
  }
});

/** GET /api/enrollments — list rows for the “My enrollments” page */
app.get('/api/enrollments', async (req, res) => {
  const rows = await Enrollment.find().sort({ enrolledAt: -1 }).lean();
  res.json(rows);
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Education mini app http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB:', err.message);
    process.exit(1);
  });
