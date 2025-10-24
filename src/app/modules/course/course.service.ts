import { Types } from "mongoose";
import CourseModel from "./course.model";
import UserModel from "../user/user.model";

export const createCourse = async (payload: any) => {
  const course = await CourseModel.create({
    title: payload.title,
    slug: payload.title.toLowerCase().replace(/\s+/g, "-"),
    shortDescription: payload.shortDescription,
    fullDescription: payload.fullDescription,
    price: payload.price,
    category: payload.category,
    duration: payload.duration,
    teacher: {
      _id: new Types.ObjectId(payload.teacherId),
      name: payload.teacherName,
      email: payload.teacherEmail,
    },
    image: payload.image,
    isPublished: payload.isPublished || false,
  });

  return course;
};

export const getAllCourses = async (filter = {}, limit = 50, skip = 0) => {
  return CourseModel.find(filter)
    .populate("teacher._id", "name email")
    .limit(limit)
    .skip(skip)
    .lean();
};

export const getCourseById = async (id: string) => {
  return CourseModel.findById(id)
    .populate("students", "name email")
    .populate("ratings.student", "name email")
    .lean();
};

export const enrollStudentToCourse = async (courseId: string, studentId: string) => {
  const [course, user] = await Promise.all([
    CourseModel.findById(courseId),
    UserModel.findById(studentId),
  ]);

  if (!course) throw new Error("Course not found");
  if (!user) throw new Error("Student not found");

  // Ensure arrays exist
  if (!course.students) course.students = [];
  if (!user.enrolledCourses) user.enrolledCourses = [];

  // Avoid duplicate enrollments
  if (!course.students.some((s: any) => s.equals(user._id as Types.ObjectId))) {
    course.students.push(user._id as Types.ObjectId);
    await course.save();
  }

  if (!user.enrolledCourses.some((c: any) => c.equals(course._id as Types.ObjectId))) {
    user.enrolledCourses.push(course._id as Types.ObjectId);
    await user.save();
  }

  return course;
};

export const addRatingToCourse = async (
  courseId: string,
  studentId: string,
  rating: number,
  comment?: string
) => {
  const course = await CourseModel.findById(courseId);
  if (!course) throw new Error("Course not found");

  // Ensure ratings array exists
  if (!course.ratings) course.ratings = [];

  // Build rating object safely
  const ratingObj: any = {
    student: new Types.ObjectId(studentId),
    rating,
  };
  if (comment !== undefined) ratingObj.comment = comment;

  course.ratings.push(ratingObj);
  course.recalculateAvg();
  await course.save();

  return course;
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getCourseById,
  enrollStudentToCourse,
  addRatingToCourse,
};