import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import portfolioRoutes from './routes/portfolio.js';
import adminRoutes from './routes/admin.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;


app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

  
 app.use('/api/auth', authRoutes);
app.use('/api', portfolioRoutes);
app.use('/api/admin', adminRoutes);

app.get("/", (req, res) => {
  res.status(200).send("API is running ✅");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

