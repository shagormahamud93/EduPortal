import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateBody = (schema: ZodSchema<any>, key?: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    const dataToValidate = key ? req.body[key] : req.body;
    const result = schema.safeParse(dataToValidate);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }
    if (key) req.body[key] = result.data;
    else req.body = result.data;
    next();
  };
