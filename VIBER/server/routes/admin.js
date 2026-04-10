import express from 'express';
import { openDb } from '../db.js';
import { authenticateAdmin } from './auth.js';

const router = express.Router();

// GET /api/admin/users
router.get('/users', authenticateAdmin, async (req, res) => {
  try {
    const db = await openDb();
    const users = await db.all('SELECT id, name, email, major, year, avatar, role, category FROM users ORDER BY id DESC');
    res.json(users);
  } catch (error) {
    console.error('Error fetching admin users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', authenticateAdmin, async (req, res) => {
  try {
    const db = await openDb();
    const userId = Number(req.params.id);
    
    // Prevent admin from deleting themselves
    if (userId === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete yourself' });
    }

    // Optionally cleanup user's resources/messages or let foreign keys handle it
    await db.run('DELETE FROM resources WHERE author_id = ?', [userId]);
    await db.run('DELETE FROM messages WHERE author_id = ?', [userId]);

    const result = await db.run('DELETE FROM users WHERE id = ?', [userId]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User and associated data deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// PUT /api/admin/users/:id/category
router.put('/users/:id/category', authenticateAdmin, async (req, res) => {
  try {
    const { category } = req.body;
    if (!['Seeker', 'Helper', 'Mentor'].includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const db = await openDb();
    const result = await db.run('UPDATE users SET category = ? WHERE id = ?', [category, req.params.id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating user category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

export default router;
