import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  content: { type: String, required: true },
  avatar_url: { type: String }
});

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
