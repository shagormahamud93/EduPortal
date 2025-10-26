import { Router } from "express";
import { validateBody } from "../../middleware/middleware";
import { createCourseSchema, enrollSchema, ratingSchema } from "./course.validation";
import { CourseController } from "./course.controller";
import { upload } from "../../middleware/upload.middleware";
import { courseValidateBody } from "../../middleware/courseValidate";

const router = Router();

router.post(
    "/",
    upload.single("image"),                 // <-- multer first
    courseValidateBody(createCourseSchema), // <-- then validation
    CourseController.createCourse
);
router.get("/", CourseController.listCourses);
router.get("/:id", CourseController.getCourse);
router.post("/:id/enroll", courseValidateBody(enrollSchema), CourseController.enrollStudent);
router.post("/:id/rating", courseValidateBody(ratingSchema), CourseController.addRating);

export const courseRouter = router;
