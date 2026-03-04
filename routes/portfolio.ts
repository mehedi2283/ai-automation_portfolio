import express from 'express';
import { Project } from '../models/Project.js';
import { Testimonial } from '../models/Testimonial.js';
import { Setting } from '../models/Setting.js';
import { Inquiry } from '../models/Inquiry.js';

const router = express.Router();

router.get('/portfolio', async (req, res) => {
  try {
    const projectsDocs = await Project.find().sort({ order_index: 1 });
    const projects = projectsDocs.map(p => ({
      ...p.toObject(),
      id: p._id
    }));
    const testimonials = await Testimonial.find();
    const settingsDocs = await Setting.find();
    const settings = settingsDocs.reduce((acc, doc: any) => ({ ...acc, [doc.key]: doc.value }), {});

    res.json({ projects, testimonials, settings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/contact', async (req, res) => {
  const { name, email, details } = req.body;
  if (!name || !email || !details) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const inquiry = new Inquiry({ name, email, details });
    await inquiry.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
