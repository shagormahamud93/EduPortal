import httpStatus from 'http-status';
import { Request, Response, NextFunction } from "express";
import { CourseService } from "./course.service";
import sendResponse from "../../utils/sendResponse";
import UserModel from '../user/user.model';

export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseData = req.body.course ? JSON.parse(req.body.course) : req.body;

    if (req.file) {
      courseData.image = `/uploads/${req.file.filename}`;
    }

    const course = await CourseService.createCourse(courseData);

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (err) {
    next(err);
  }
};

export const listCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await CourseService.getAllCourses();

    if (!courses || courses.length === 0) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "No courses found",
        data: [],
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Courses retrieved successfully",
      data: courses,
    });
  } catch (err) {
    next(err);
  }
};

export const getCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Course ID is required",
        data: null,
      });
    }

    const course = await CourseService.getCourseById(id);

    if (!course) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "Course not found",
        data: null,
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Course retrieved successfully",
      data: course,
    });
  } catch (err) {
    next(err);
  }
};

export const enrollStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseId = req.params.id;
    const { studentId } = req.body;

    //  Validation checks
    if (!courseId) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Course ID is required",
        data: null,
      });
    }

    if (!studentId) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Student ID is required",
        data: null,
      });
    }

    // Enroll logic
    const updatedCourse = await CourseService.enrollStudentToCourse(courseId, studentId);

    if (!updatedCourse) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "Course not found or enrollment failed",
        data: null,
      });
    }

    //  Success response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Student enrolled successfully",
      data: updatedCourse,
    });
  } catch (err) {
    next(err);
  }
};

export const addRating = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseId = req.params.id;
    const { studentId, rating, comment } = req.body;

    // Validate required fields
    if (!courseId) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Course ID is required",
        data: null,
      });
    }

    if (!studentId) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Student ID is required",
        data: null,
      });
    }

    if (rating == null || rating < 1 || rating > 5) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Rating must be a number between 1 and 5",
        data: null,
      });
    }

    //  Verify student exists in DB
    const student = await UserModel.findById(studentId);
    if (!student) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "Student not found",
        data: null,
      });
    }

    // Add rating via service
    const updatedCourse = await CourseService.addRatingToCourse(courseId, studentId, rating, comment);

    if (!updatedCourse) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "Course not found or rating could not be added",
        data: null,
      });
    }
    // Success response
    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rating added successfully",
      data: updatedCourse,
    });
  } catch (err) {
    next(err);
  }
};


export const CourseController = {
  createCourse,
  listCourses,
  getCourse,
  enrollStudent,
  addRating,
};