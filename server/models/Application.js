const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  name: String,
  email: String,
  resumeUrl: String,
  resumeFile: String, // Path to uploaded file
  resumeType: { type: String, enum: ['url', 'file'], default: 'url' },
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);