import express from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import {dbConnect} from './config/dbConfig.js';
import adminRouter from './routes/adminRoutes.js';
import {errorMiddleWare} from './middlewares/error.js';
import doctorRouter from './routes/doctorRoutes.js';
import userRouter from './routes/userRoute.js';
dotenv.config ();

const app = express ();
const PORT = process.env.PORT || 5000;

const upload = multer ({dest: 'uploads/'});
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'token', 'atoken'],
  })
);

app.use (express.json ());
app.use (cookieParser ());
app.use (morgan ('dev'));
app.use ('/api/admin', adminRouter);
app.use ('/api/doctor', doctorRouter);
app.use ('/api/user', userRouter);
app.use (errorMiddleWare);
dbConnect ()
  .then (() => {
    app.listen (PORT, () => {
      console.log (`🔥 Server running on http://localhost:${PORT}`);
    });
  })
  .catch (err => {
    console.log ('nope', err.message);
  });
