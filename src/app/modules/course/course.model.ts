import mongoose, { Schema } from "mongoose";
import { ICourseDocument } from "./course.interface";

//  Mongoose Rating subdocument schema
const RatingSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String }, // optional
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const CourseSchema = new Schema<ICourseDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, lowercase: true, trim: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String },
    price: { type: Number, default: 0 },
    category: { type: String },
    duration: { type: String },
    teacher: {
      _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
      email: { type: String },
    },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    ratings: { type: [RatingSchema], default: [] }, // ✅ use Mongoose Schema here
    avgRating: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);



// Method to recalculate average rating
CourseSchema.methods.recalculateAvg = function () {
  if (!this.ratings || this.ratings.length === 0) {
    this.avgRating = 0;
  } else {
    const sum = this.ratings.reduce((s: number, r: any) => s + (r.rating || 0), 0);
    this.avgRating = sum / this.ratings.length;
  }
  return this.avgRating;
};


const CourseModel = mongoose.model<ICourseDocument>("Course", CourseSchema);
export default CourseModel;
