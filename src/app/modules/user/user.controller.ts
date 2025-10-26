import { Request, Response, NextFunction } from "express";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import UserModel from "./user.model";
import httpStatus from "http-status";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body.user);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!id) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: "User ID is required",
        data: null,
      });
    }

    const user = await userService.getUserById(id);

    if (!user) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "User not found",
        data: null,
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};


// export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { role } = req.query; // ?role=student or ?role=teacher
//     const filter: any = {};
//     if (role) filter.role = role;
//     const users = await UserModel.find(filter).select("-passwordHash").lean();

//       sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: "User retrieved successfully",
//       data: users,
//     });
//     // res.json(users);
//   } catch (err) {
//     next(err);
//   }
// };

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.query; // ?role=student or ?role=teacher

    // Build filter dynamically
    const filter: Record<string, any> = {};
    if (role) filter.role = role;

    const users = await UserModel.find(filter)
      .select("-passwordHash")
      .lean();

    // If no users found
    if (!users || users.length === 0) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "No users found",
        data: [],
      });
    }

    // Success response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:
        role && users.length > 0
          ? `Users with role '${role}' retrieved successfully`
          : "All users retrieved successfully",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createUser,
  listUsers,
  getUser
};