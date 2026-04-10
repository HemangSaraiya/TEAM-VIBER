import express from 'express';
import { openDb } from '../db.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// GET /api/resources
router.get('/', async (req, res) => {
  try {
    const db = await openDb();
    const resources = await db.all(`
      SELECT r.id, r.title, r.type, r.tags, r.created_at, u.name as author
      FROM resources r
      JOIN users u ON r.author_id = u.id
      ORDER BY r.created_at DESC
    `);
    
    // Parse tags JSON string back to array
    const formattedResources = resources.map(r => ({
      ...r,
      tags: JSON.parse(r.tags)
    }));

    res.json(formattedResources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

// POST /api/resources
router.post('/', authenticateToken, async (req, res) => {
  const { title, type, tags } = req.body;
  
  if (!title || !type) {
    return res.status(400).json({ error: 'Title and type are required' });
  }

  try {
    const db = await openDb();
    const tagsString = JSON.stringify(tags || []);
    
    const result = await db.run(
      'INSERT INTO resources (title, type, tags, author_id) VALUES (?, ?, ?, ?)',
      [title, type, tagsString, req.user.id]
    );

    const newResource = await db.get(`
      SELECT r.id, r.title, r.type, r.tags, r.created_at, u.name as author
      FROM resources r
      JOIN users u ON r.author_id = u.id
      WHERE r.id = ?
    `, [result.lastID]);

    newResource.tags = JSON.parse(newResource.tags);

    res.status(201).json(newResource);
  } catch (error) {
    console.error('Error creating resource:', error);
    res.status(500).json({ error: 'Failed to create resource' });
  }
});

// DELETE /api/resources/:id
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const db = await openDb();
    
    // Check if resource exists and belongs to the user
    const resource = await db.get('SELECT * FROM resources WHERE id = ?', [req.params.id]);
    
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    
    if (resource.author_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this resource' });
    }

    await db.run('DELETE FROM resources WHERE id = ?', [req.params.id]);
    
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).json({ error: 'Failed to delete resource' });
  }
});

export default router;
