import express from 'express';
import { openDb } from '../db.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// GET /api/messages
router.get('/', async (req, res) => {
  try {
    const db = await openDb();
    const messages = await db.all(`
      SELECT m.id, m.content, m.created_at, u.name as author, u.avatar
      FROM messages m
      JOIN users u ON m.author_id = u.id
      ORDER BY m.created_at ASC
    `);
    
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// POST /api/messages
router.post('/', authenticateToken, async (req, res) => {
  const { content } = req.body;
  
  if (!content) {
    return res.status(400).json({ error: 'Message content is required' });
  }

  try {
    const db = await openDb();
    
    const result = await db.run(
      'INSERT INTO messages (content, author_id) VALUES (?, ?)',
      [content, req.user.id]
    );

    const newMessage = await db.get(`
      SELECT m.id, m.content, m.created_at, u.name as author, u.avatar
      FROM messages m
      JOIN users u ON m.author_id = u.id
      WHERE m.id = ?
    `, [result.lastID]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Failed to create message' });
  }
});

export default router;
