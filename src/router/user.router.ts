import {
  create,
  getById,
  getList,
  logIn,
  register,
  update,
  verifyAccount
} from '@/controllers/user.controller';
import { authGuard } from '@/middlewares';
import express from 'express';

const userRouter = express.Router();

// TODO: Add validator middlewares to validate request body and params
userRouter.get('/', authGuard({ roles: ['admin', 'user'] }), getList);

userRouter.post('/', authGuard({ roles: ['admin'] }), create);

userRouter.get('/:userId', authGuard({ roles: ['admin'] }), getById);

userRouter.patch('/:userId', authGuard({ roles: ['admin'] }), update);

userRouter.post('/sign-up', register);

userRouter.post('/sign-in', logIn);

userRouter.get('/verify/:userId', verifyAccount);

export default userRouter;
