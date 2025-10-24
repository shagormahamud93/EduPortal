import { z } from "zod";
import { Types } from "mongoose";

export const createCourseSchema = z.object({
  title: z.string().min(3),
  shortDescription: z.string().min(10),
  fullDescription: z.string().optional(),
  price: z.number().nonnegative().optional(),
  category: z.string().optional(),
  duration: z.string().optional(),
  teacherId: z.string().refine((v) => Types.ObjectId.isValid(v), { message: "Invalid teacherId" }),
  teacherName: z.string().min(1),
  image: z.string().url().optional(),
  isPublished: z.boolean().optional(),
});

export const enrollSchema = z.object({
  studentId: z.string().refine((v) => Types.ObjectId.isValid(v)),
});

export const ratingSchema = z.object({
  studentId: z.string().refine((v) => Types.ObjectId.isValid(v)),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});
