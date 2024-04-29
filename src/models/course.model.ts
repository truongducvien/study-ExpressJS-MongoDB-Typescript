import { Schema, model } from 'mongoose';

const courseSchema = new Schema(
  {
    name: String,
    period: Number
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

const Course = model('Course', courseSchema);

export { courseSchema };
export default Course;
