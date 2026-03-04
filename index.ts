import express from 'express';
import { createServer as createViteServer } from 'vite';
import mongoose from 'mongoose';
import portfolioRoutes from './routes/portfolio.js';
import adminRoutes from './routes/admin.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://BabuPortfolio:Mehedi1358549@cluster0.w5am0gy.mongodb.net/?appName=Cluster0';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Connect to MongoDB
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }

  // API Routes
  app.use('/api', portfolioRoutes);
  app.use('/api/admin', adminRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
