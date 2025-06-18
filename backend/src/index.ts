import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import { connectDB } from './config/database';
import authRoutes from './routes/auth.routes';
import courseRoutes from './routes/course.routes';
import { errorHandler } from './middlewares/error.middleware';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 8000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // 允许没有origin的请求（如服务器到服务器的请求或REST工具）
    if (!origin || allowedOrigins.includes(origin!)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log('Database connection failed, but server will start with in-memory storage');
  }
  
  // Start server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer(); 