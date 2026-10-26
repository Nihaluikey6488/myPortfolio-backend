const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const sendContactEmails = require('../utils/sendEmail');

// Validation Rules
const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 chars'),
];

// POST /api/contact
router.post('/contact', contactValidation, async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email,company, subject, message } = req.body;

    // 1. Save details in MongoDB Database
    const newContact = new Contact({ name, email,company, subject, message });
    await newContact.save();

    // 2. Trigger Email Notifications (Admin notification + Client auto-reply)
    try {
      await sendContactEmails({ name, email,company, subject, message });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Even if email fails, data is saved in DB, but we can log it.
    }

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully and saved to database!',
    });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
});

module.exports = router;