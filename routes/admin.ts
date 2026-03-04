import express from 'express';
import { Project } from '../models/Project.js';
import { Inquiry } from '../models/Inquiry.js';
import { Setting } from '../models/Setting.js';

const router = express.Router();

router.get('/projects', async (req, res) => {
  try {
    const projectsDocs = await Project.find().sort({ order_index: 1 });
    const projects = projectsDocs.map(p => ({
      ...p.toObject(),
      id: p._id
    }));
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.json({ id: project._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/inquiries', async (req, res) => {
  try {
    const inquiriesDocs = await Inquiry.find().sort({ created_at: -1 });
    const inquiries = inquiriesDocs.map(i => ({
      ...i.toObject(),
      id: i._id
    }));
    res.json(inquiries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/settings', async (req, res) => {
  try {
    const settingsDocs = await Setting.find();
    const settings = settingsDocs.reduce((acc, doc: any) => ({ ...acc, [doc.key]: doc.value }), {});
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/settings', async (req, res) => {
  const settings = req.body;
  try {
    for (const [key, value] of Object.entries(settings)) {
      await Setting.findOneAndUpdate(
        { key },
        { value: String(value) },
        { upsert: true, new: true }
      );
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
