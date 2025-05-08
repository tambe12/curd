const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/college_admissions');

// Schema
const ApplicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  course: String,
  qualifications: String,
  status: { type: String, default: 'pending' },
  applicationDate: { type: Date, default: Date.now }
});

// Model
const Application = mongoose.model('Application', ApplicationSchema);

// GET - All applications
app.get('/api/applications', async (req, res) => {
  const applications = await Application.find();
  res.json(applications);
});

// GET - Single application
app.get('/api/applications/:id', async (req, res) => {
  const application = await Application.findById(req.params.id);
  res.json(application);
});

// POST - Create application
app.post('/api/applications', async (req, res) => {
  const newApplication = new Application(req.body);
  const saved = await newApplication.save();
  res.status(201).json(saved);
});

// PUT - Update application
app.put('/api/applications/:id', async (req, res) => {
  const updated = await Application.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE - Delete application
app.delete('/api/applications/:id', async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


/*
npm init -y
npm i express
npm i <je error asel te>
mode server.js
*/
