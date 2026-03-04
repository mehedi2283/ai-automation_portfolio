import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String, required: true },
  tools: { type: [String], default: [] },
  stats: { type: [Object], default: [] },
  order_index: { type: Number, default: 0 }
});

export const Project = mongoose.model('Project', projectSchema);
