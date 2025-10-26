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