import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { dbConnect } from './config/dbConfig.js';
import adminRouter from './routes/adminRoutes.js';
import doctorRouter from './routes/doctorRoutes.js';
import userRouter from './routes/userRoute.js';
import { errorMiddleWare } from './middlewares/error.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://doctor-application-omega.vercel.app',
];

 
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);  
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token', 'atoken'],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

 
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

app.use(errorMiddleWare);

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🔥 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('DB Connection failed:', err.message);
  });
