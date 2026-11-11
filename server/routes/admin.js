import express from 'express';
import { feedbackStore } from '../data/store.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// POST /api/admin/login - Authenticate admin credentials
router.post('/login', (req, res) => {
  const { password } = req.body;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!password || password !== expectedPassword) {
    return res.status(401).json({
      success: false,
      message: 'Invalid administrator password.',
    });
  }

  return res.json({
    success: true,
    message: 'Authentication successful.',
    token: expectedPassword,
  });
});

// All following routes require authentication
router.use(authMiddleware);

// GET /api/admin/stats - Statistics on submissions
router.get('/stats', async (req, res) => {
  try {
    const stats = await feedbackStore.getStats();
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve stats.',
      error: error.message,
    });
  }
});

// GET /api/admin/feedback - View all submissions with optional status filter
router.get('/feedback', async (req, res) => {
  try {
    const { status } = req.query;
    const items = await feedbackStore.getAllAdmin(status);
    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve feedback.',
      error: error.message,
    });
  }
});

// PATCH /api/admin/feedback/:id - Update status (publish or reject)
router.patch('/feedback/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'published', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be "pending", "published", or "rejected".',
      });
    }

    const updated = await feedbackStore.updateStatus(id, status);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Feedback entry not found.',
      });
    }

    res.json({
      success: true,
      message: `Feedback status updated to "${status}".`,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update feedback.',
      error: error.message,
    });
  }
});

// DELETE /api/admin/feedback/:id - Delete feedback
router.delete('/feedback/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await feedbackStore.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Feedback entry not found.',
      });
    }

    res.json({
      success: true,
      message: 'Feedback successfully deleted.',
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete feedback.',
      error: error.message,
    });
  }
});

export default router;
