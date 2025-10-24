import { Types } from "mongoose";

export type Guardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}

export type UserName = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export type LocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string
}

export type Student = {
    id:string;
    user: Types.ObjectId; //reference to user model _id
    name: UserName;
    gender: "male" | "female" | "other";
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: BloodGroup;
    presentAdreess: string;
    permanentAddres: string;
    guardian: Guardian;
    localGuardian: LocalGuardian;
    profileImg?:string;
    isActive:"active" | "blocked";
}

