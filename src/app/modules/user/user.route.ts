import { Router } from "express";
import { createUserSchema } from "./user.validation";
import { validateBody } from "../../middleware/middleware";
import { UserController } from "./user.controller";

const router = Router();

router.post("/", validateBody(createUserSchema), UserController.createUser);
router.get("/", UserController.listUsers);
router.get("/:id", UserController.getUser);

export const userRouter = router;
