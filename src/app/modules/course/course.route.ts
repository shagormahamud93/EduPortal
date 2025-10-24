import { Router } from "express";
import { validateBody } from "../../middleware/middleware";
import { createCourseSchema, enrollSchema, ratingSchema } from "./course.validation";
import { CourseController } from "./course.controller";
import { upload } from "../../middleware/upload.middleware";

const router = Router();

router.post("/", validateBody(createCourseSchema), upload.single("image"), CourseController.createCourse);
router.get("/", CourseController.listCourses);
router.get("/:id", CourseController.getCourse);
router.post("/:id/enroll", validateBody(enrollSchema), CourseController.enrollStudent);
router.post("/:id/rating", validateBody(ratingSchema), CourseController.addRating);

 export const courseRouter = router;
