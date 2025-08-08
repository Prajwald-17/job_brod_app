const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Application = require('../models/Application');
const Job = require('../models/Job');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'resume-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

// POST application for a job
router.post('/:jobId', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, resumeUrl, resumeType } = req.body;
    const { jobId } = req.params;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Validate resume based on type
    if (resumeType === 'file' && !req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }
    if (resumeType === 'url' && !resumeUrl) {
      return res.status(400).json({ message: 'Resume URL is required' });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user already applied for this job
    const existingApplication = await Application.findOne({ jobId, email });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Create application data
    const applicationData = {
      jobId,
      name,
      email,
      resumeType: resumeType || 'url'
    };

    if (resumeType === 'file' && req.file) {
      applicationData.resumeFile = req.file.filename;
    } else {
      applicationData.resumeUrl = resumeUrl;
    }

    const newApp = new Application(applicationData);
    await newApp.save();
    
    res.status(201).json({
      message: 'Application submitted successfully',
      application: newApp
    });
  } catch (error) {
    // If there was an error and a file was uploaded, clean it up
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    res.status(500).json({ message: error.message });
  }
});

// GET all applications (admin only - for future use)
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find().populate('jobId');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;