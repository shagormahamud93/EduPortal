

// import config from "../../config";
// import { Student } from "../student/student.interface";
// import { TUser } from "./user.interface";
// import { UserModel } from "./user.model";



// const CreateUserIntoDB = async (password: String, studentData: Student) => {

//     if (!password) {
//         password = config.default_password as string;
//     }

//     //create a user instance
//     const userData: Partial<TUser> = {};

//     // if password is not given set default password
//     userData.password = password || (config.default_password as string);

//     //set student role
//     userData.role = "student";
//     // set menually generated id
//     userData.id = '2030100001';
//     // create a user
//     const result = await UserModel.create(userData);
//     //   create a student
//     if (Object.keys(result).length) {
//         // set id, _id as user
//         studentData.id = result.id;
//         studentData.user = result._id;

//     }
// }

// export const UserServices = {
//     CreateUserIntoDB
// }

import bcrypt from 'bcryptjs';
import { IUser } from "./user.interface";
import UserModel from './user.model';

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}): Promise<IUser> => {
  const existing = await UserModel.findOne({ email: data.email });
  if (existing) throw new Error("User already exists");

  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await UserModel.create({
    name: data.name,
    email: data.email,
    passwordHash,
    role: data.role || "student",
  });

  return user.toObject() as IUser;
};

export const getAllUsers = async () => {
  return UserModel.find().select("-passwordHash").lean();
};

export const getUserById = async (id: string) => {
  return UserModel.findById(id).select("-passwordHash").lean();
};

export const userService ={
  createUser,
  getAllUsers, 
  getUserById,
};