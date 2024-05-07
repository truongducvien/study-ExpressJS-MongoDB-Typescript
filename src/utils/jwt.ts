import { envConfig } from '@/config';
import { JwtUserPayload, UnAuthenticatedError } from '@/types';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

const generateToken = (data: object): string => {
  return jwt.sign(data, envConfig.SECRET_KEY, { expiresIn: 5 * 60 });
};

const verifyToken = (req: Request) => {
  try {
    const bearerToken = req.headers.authorization?.split(' ')[1];
    return jwt.verify(bearerToken, envConfig.SECRET_KEY) as JwtUserPayload;
  } catch (e) {
    console.log(e);
    throw new UnAuthenticatedError('Invalid token');
  }
};

export { generateToken, verifyToken };
