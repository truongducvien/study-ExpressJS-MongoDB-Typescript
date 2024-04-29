import { Schema, model } from 'mongoose';

const adminInfoSchema = new Schema({
  adminRole: String,
  permission: [String]
});

const AdminInfo = model('AdminInfo', adminInfoSchema);

export default AdminInfo;
