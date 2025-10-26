
import { Types } from "mongoose";

export type UserRole = "student" | "teacher" | "admin";

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  passwordHash?: string;
  role: UserRole;
  enrolledCourses?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
