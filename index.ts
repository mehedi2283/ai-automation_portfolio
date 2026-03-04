import express from 'express';
import mongoose from 'mongoose';
import portfolioRoutes from './routes/portfolio';
import adminRoutes from './routes/admin';
import authRoutes from './routes/auth';

const MONGO_URI = process.env.MONGO_URI;

async function startServer() {
  const app = express();
  const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Simple CORS (works, but you can replace with "cors" package later)
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Connect to MongoDB
  if (!MONGO_URI) {
    console.error('❌ Missing MONGO_URI environment variable');
  } else {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('✅ Connected to MongoDB');
    } catch (err) {
      console.error('❌ MongoDB connection error:', err);
    }
  }

  // Health check / root route
  app.get('/', (req, res) => {
    res.status(200).send('API is running ✅');
  });

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api', portfolioRoutes);
  app.use('/api/admin', adminRoutes);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((e) => {
  console.error('❌ Server failed to start:', e);
  process.exit(1);
});