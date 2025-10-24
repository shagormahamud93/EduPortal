import { Types } from "mongoose";

export interface IRating {
  student: Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt?: Date;
}

export interface ICourse {
  title: string;
  slug?: string;
  shortDescription: string;
  fullDescription?: string;
  price?: number;
  category?: string;
  duration?: string;
  teacher: {
    _id: Types.ObjectId;
    name: string;
    email?: string;
  };
  students?: Types.ObjectId[];
  ratings?: IRating[];
  avgRating?: number;
  isPublished?: boolean;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

//Extend the document interface with methods
import { Document } from "mongoose";

export interface ICourseDocument extends ICourse, Document {
  recalculateAvg(): number; // tell TS about this method
}