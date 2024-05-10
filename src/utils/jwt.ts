import { envConfig } from '@/config';
import { UnAuthenticatedError } from '@/types';
import { JwtPayload, SignOptions, sign, verify } from 'jsonwebtoken';

const generateToken = (
  data: string | object | Buffer,
  options: SignOptions = { expiresIn: 5 * 60 }
): string => {
  return sign(data, envConfig.SECRET_KEY, options);
};

const verifyToken = <T>(token: string = '') => {
  try {
    return verify(token, envConfig.SECRET_KEY) as JwtPayload & T;
  } catch {
    throw new UnAuthenticatedError('Invalid token');
  }
};

export { generateToken, verifyToken };
