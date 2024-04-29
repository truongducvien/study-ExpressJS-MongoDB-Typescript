import express from 'express';
import { router } from './router';
import { dbCore, envConfig } from './config';

const app = express();
const PORT = envConfig.PORT || 3000;

/**
 * Connect to MongDB
 */
dbCore.connectDB();

// Parser:
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log('App is running on port ', PORT);
});
