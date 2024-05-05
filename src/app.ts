import express, { Request, Response } from 'express';
import { router } from './router';
import { dbCore, envConfig } from './config';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = envConfig.PORT || 3000;

/**
 * Connect to MongDB
 */
dbCore.connectDB();

// CORS:
app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
  })
);

app.use(cookieParser());

// Parser:
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log('App is running on port ', PORT);
});
