import type { Request, Response } from "express";
import { StudentService } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
    try {
        const studentData = req.body.student;
        const result = await StudentService.createStudentIntoDB(studentData);
        res.status(200).json({
            success: true,
            message: "Student is created successfully",
            data: result
        });

    } catch (error) {
        console.log(error);
    }
}

const getStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentService.getAllStudentsFromDB();

        res.status(200).json({
            success: true,
            message: "Students data retrieved successfully",
            data: result
        });
    } catch (error) {
        console.log(error);
    }
}

export const StudentControllers = {
    createStudent,
    getStudents
}