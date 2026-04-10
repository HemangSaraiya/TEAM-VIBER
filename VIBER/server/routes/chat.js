import express from 'express';
import { authenticateToken } from './auth.js';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const query = message.toLowerCase();
  let aiResponse = "I'm not exactly sure about that, but let's connect on Campus Network!";

  // Simple mock intelligence
  if (query.includes('hi') || query.includes('hello')) {
    aiResponse = "Hello! I am your CamPus AI assistant. How can I help you find resources or peers today?";
  } else if (query.includes('resource') || query.includes('find')) {
    aiResponse = "You can jump over to the Resources Directory via the sidebar to search for study materials and collaboration opportunities!";
  } else if (query.includes('major') || query.includes('classes')) {
    aiResponse = "Many students share similar majors! Check out your Profile tab to update your major and skills so you can find academic peers.";
  } else if (query.includes('help')) {
    aiResponse = "I'm here to help! You can search to find resources, or ask me questions about how to use the CamPus ecosystem.";
  }

  // Add artificial delay to simulate AI typing...
  setTimeout(() => {
    res.json({ reply: aiResponse });
  }, 1000);
});

export default router;
