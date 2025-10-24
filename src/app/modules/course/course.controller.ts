import { Request, Response, NextFunction } from "express";
import { CourseService } from "./course.service";

export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseData = { ...req.body };
        if (req.file) {
            courseData.image = `/uploads/${req.file.filename}`;
        }
        const course = await CourseService.createCourse(courseData); // pass updated object
        res.status(201).json(course);
    } catch (err) {
        next(err);
    }
};

export const listCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await CourseService.getAllCourses();
        res.json(courses);
    } catch (err) {
        next(err);
    }
};

export const getCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const course = await CourseService.getCourseById(req.params.id as string);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json(course);
    } catch (err) {
        next(err);
    }
};

export const enrollStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.body;
        const updated = await CourseService.enrollStudentToCourse(req.params.id as string, studentId);
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

export const addRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId, rating, comment } = req.body;
        const updated = await CourseService.addRatingToCourse(req.params.id as string, studentId, rating, comment);
        res.json(updated);
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