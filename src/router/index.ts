import express, { Router } from 'express';
import { PATHS } from '../constant';
import userRouter from './user.router';

const ROUTER_MAPPING = [[PATHS.USERS, userRouter]];

const router = express.Router();

ROUTER_MAPPING.forEach(([path, routeControl]) => {
  router.use(`/api/${path}`, routeControl as Router);
});

export { router };
