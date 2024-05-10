import express from 'express';
import { router } from './router';
import { dbCore, envConfig } from './config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

const app = express();
const PORT = envConfig.PORT || 3000;

/**
 * Connect to MongDB
 */
dbCore.connectDB();

// CORS:
app.use(
  cors({
    origin: [envConfig.PUBLIC_FE_URL],
    credentials: true
  })
);

app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
  })
);

// Passport init:
app.use(passport.initialize());
app.use(passport.session());

// Parser:
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log('App is running on port ', PORT);
});
