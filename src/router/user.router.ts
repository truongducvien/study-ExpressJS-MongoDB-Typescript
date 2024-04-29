import {
  create,
  getById,
  getList,
  update
} from '@/controllers/user.controller';
import express from 'express';

const userRouter = express.Router();

// TODO: Add validator middlewares to validate request body and params
userRouter.get('/', getList);

userRouter.post('/', create);

userRouter.get('/:userId', getById);

userRouter.patch('/:userId', update);

export default userRouter;
