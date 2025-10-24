import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./user.interface";

export interface IUserDocument extends Document, Omit<IUser, "_id"> {}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String },
    role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>("User", UserSchema);
export default UserModel;
