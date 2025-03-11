import {
  create,
  getById,
  getList,
  update
} from '@/controllers/user.controller';
import { authGuard } from '@/middlewares';
import express from 'express';

const userRouter = express.Router();

// TODO: Add validator middlewares to validate request body and params
userRouter.get('/', getList);

userRouter.post('/', authGuard({ roles: ['admin'] }), create);

userRouter.get('/:userId', authGuard({ roles: ['admin'] }), getById);

userRouter.patch('/:userId', authGuard({ roles: ['admin'] }), update);

export default userRouter;
