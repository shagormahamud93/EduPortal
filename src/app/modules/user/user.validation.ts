// import z from "zod";

// const userValidationSchema = z.object({
//     password: z.string({
//         error: (issue) => issue.input === undefined
//             ? "Password is required"
//             : "Password must be a string"
//     }).max(20, { message: "Password can not be more then 20 characters" }).optional()
// });

// export const UserValidation = {
//     userValidationSchema,
// }

import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
  role: z.enum(["student", "teacher", "admin"]).optional(),
});
