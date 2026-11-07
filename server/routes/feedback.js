import express from 'express';
import { feedbackStore } from '../data/store.js';

const router = express.Router();

// GET /api/feedback - Retrieve all approved and published feedback
router.get('/', async (req, res) => {
  try {
    const feedbackList = await feedbackStore.getPublished();
    res.json({
      success: true,
      count: feedbackList.length,
      data: feedbackList,
    });
  } catch (error) {
    console.error('Error fetching published feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve feedback.',
      error: error.message,
    });
  }
});

// POST /api/feedback - Submit new feedback (saved as 'pending')
router.post('/', async (req, res) => {
  try {
    const { name, message, email, rating, publicConsent } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Feedback message is required.',
      });
    }

    if (message.trim().length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Feedback message cannot exceed 1000 characters.',
      });
    }

    const createdItem = await feedbackStore.create({
      name: name?.trim() || 'Anonymous Visitor',
      message: message.trim(),
      email: email?.trim() || '',
      rating: rating ? Math.max(1, Math.min(5, Number(rating))) : 5,
      publicConsent: publicConsent !== false,
    });

    res.status(201).json({
      success: true,
      message: 'Thanks for your feedback! It will appear here after review.',
      data: {
        id: createdItem._id,
        name: createdItem.name,
        status: createdItem.status,
        createdAt: createdItem.createdAt,
      },
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback. Please try again.',
      error: error.message,
    });
  }
});

export default router;
