import { logIn, register, verifyAccount } from '@/controllers/auth.controller';
import * as express from 'express';

const authRouter = express.Router();

authRouter.post('/sign-up', register);

authRouter.post('/sign-in', logIn);

authRouter.get('/verify/:userId', verifyAccount);

export default authRouter;
