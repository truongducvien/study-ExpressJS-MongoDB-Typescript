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
  googleId?: string;
}
class UserGoogleResponse {
  id: string;
  displayName: string;
  emails: { value: string; verified: boolean }[];
}

type LogInPayload = Pick<UserSchemaType, 'email' | 'password'>;

type JwtUserPayload = Pick<UserSchemaType, 'email' | 'password' | 'role'>;

type JwtVerifyEmailPayload = { email: string };

export {
  UserSchemaType,
  UserGoogleResponse,
  LogInPayload,
  JwtUserPayload,
  JwtVerifyEmailPayload
};
