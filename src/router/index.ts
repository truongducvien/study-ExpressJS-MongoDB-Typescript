import express, { Router } from 'express';
import { PATHS } from '../constant';
import userRouter from './user.router';
import authRouter from './auth.router';
import fileRouter from './file.route';

const ROUTER_MAPPING = [
  [PATHS.USERS, userRouter],
  [PATHS.AUTH, authRouter],
  [PATHS.FILE, fileRouter]
];

const router = express.Router();

ROUTER_MAPPING.forEach(([path, routeControl]) => {
  router.use(`/api/${path}`, routeControl as Router);
});

export { router };
