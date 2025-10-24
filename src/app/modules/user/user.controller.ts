// import catchAsync from "../../utils/catchAsync";
// import sendResponse from "../../utils/sendResponse";
// import httpStatus from "http-status";
// import { UserServices } from "./user.service";

// const userCreated = catchAsync(async (req, res) => {
//   const userData = req.body;
//   const result = await UserServices.CreateUserIntoDB(userData);
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.CREATED,
//     message: "Register SuccessFull",
//     data: result,
//   });
// });

// export const UserController={
//     userCreated
// }

import { Request, Response, NextFunction } from "express";
import { userService } from "./user.service";
import UserModel from "./user.model";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    next(err);
  }
};

// export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const users = await userService.getAllUsers();
//     res.json(users);
//   } catch (err) {
//     next(err);
//   }
// };

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "User id is required" });
    }
    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

 export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.query; // ?role=student or ?role=teacher
    const filter: any = {};
    if (role) filter.role = role;
    const users = await UserModel.find(filter).select("-passwordHash").lean();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

 export const UserController = {
  createUser,
  listUsers,
  getUser
};