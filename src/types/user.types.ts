import { JwtPayload } from 'jsonwebtoken';
import { Schema } from 'mongoose';

class UserSchemaType {
  name: string;
  email: string;
  password: string;
  age: number;
  role: 'admin' | 'user';
  isActive: boolean;
  isVerified: boolean;
  class: string;
  course: Schema.Types.ObjectId;
  info: Schema.Types.ObjectId;
  address: Schema.Types.ObjectId;
}

type LogInPayload = Pick<UserSchemaType, 'email' | 'password'>;

type JwtUserPayload = JwtPayload &
  Pick<UserSchemaType, 'email' | 'password' | 'role'>;

export { UserSchemaType, LogInPayload, JwtUserPayload };
