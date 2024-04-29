import { Schema, model } from 'mongoose';

interface UserInfoType {
  userRole: string;
  isActive: boolean;
}

const userInfoSchema = new Schema<UserInfoType>({
  userRole: String,
  isActive: Boolean
});

const UserInfo = model('UserInfo', userInfoSchema);

export default UserInfo;
