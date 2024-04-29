import { UserSchemaType } from '@/types';
import { Schema, model } from 'mongoose';

export { default as User } from './user.model';

const userSchema = new Schema<UserSchemaType>(
  {
    name: {
      type: String,
      required: [true, 'name is required, got {VALUE}']
    },
    age: {
      type: Number,
      validate: {
        validator: (value) => value >= 18,
        message: 'Age must be at least 18'
      }
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ['admin', 'user'],
        message: 'Role must be "admin" or "user"'
      }
      // default: 'user'
    },
    isActive: Boolean,
    class: String,
    // address: addressSchema
    address: {
      type: Schema.ObjectId,
      ref: 'Address' // Reference to model Address
    },
    course: {
      type: Schema.ObjectId,
      ref: function () {
        return 'Course';
      }
    },
    info: {
      type: Schema.ObjectId,
      ref: function () {
        return this.role === 'admin' ? 'AdminInfo' : 'UserInfo';
      }
    }
    // adminInfoModel: {
    //   type: String,
    //   enum: ['AdminInfo']
    // },
    // userInfoModel: {
    //   type: String,
    //   enum: ['UserInfo']
    // }
  },
  {
    versionKey: false,
    bufferTimeoutMS: 30 * 1000, // 30 seconds
    timestamps: true,
    statics: {
      findByName(name: string) {
        return this.find({ name });
      }
    },
    methods: {
      sayHi() {
        return `Hello, I am ${this.name}!`;
      }
    },
    virtuals: {
      greeting: {
        get() {
          return `Hello, I am ${this.name}!`;
        },
        set(newName: string) {
          this.name = newName.toUpperCase();
        }
      }
    },
    toJSON: {
      transform(a, b) {
        // Transform property "_id" to "id"
        b.id = a._id;
      }
    }
  }
);

const User = model<UserSchemaType>('User', userSchema);

export default User;
