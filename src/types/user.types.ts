import { Schema } from 'mongoose';

interface UserSchemaType {
  name: string;
  age: number;
  role: 'admin' | 'user';
  isActive: boolean;
  class: string;
  course: Schema.Types.ObjectId;
  info: Schema.Types.ObjectId;
  address: Schema.Types.ObjectId;
}

export { UserSchemaType };
