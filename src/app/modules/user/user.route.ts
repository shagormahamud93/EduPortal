// import { UserController } from "./user.controller";
// import { UserValidation } from "./user.validation";

// const { Router } = require('express');
// const router = Router();

// router.post("/register",
//     UserValidation.userValidationSchema,
//     UserController.userCreated
// );

// export const userRouter = router;

import { Router } from "express";
import { createUserSchema } from "./user.validation";
import { validateBody } from "../../middleware/middleware";
import { UserController } from "./user.controller";

const router = Router();

router.post("/", validateBody(createUserSchema), UserController.createUser);
router.get("/", UserController.listUsers);
router.get("/:id", UserController.getUser);

export const userRouter = router;
