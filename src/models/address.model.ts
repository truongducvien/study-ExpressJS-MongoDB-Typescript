import { Schema, model } from 'mongoose';

const addressSchema = new Schema(
  {
    country: {
      type: String,
      default: 'Viet Nam'
    },
    city: {
      type: String,
      default: 'Da Nang'
    },
    street: String,
    course: {
      type: Schema.ObjectId,
      ref: 'Course'
    }
  },
  {
    versionKey: false,
    toJSON: {
      transform: (a, b) => {
        // Transform property "_id" to "id"
        b.id = a._id;
      }
    }
  }
);

const Address = model('Address', addressSchema);

export { addressSchema };
export default Address;
