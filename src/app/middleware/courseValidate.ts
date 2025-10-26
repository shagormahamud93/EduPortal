export const courseValidateBody = (schema: any) => (req: any, res: any, next: any) => {
  try {
    let data = req.body.course ? JSON.parse(req.body.course) : req.body;
    schema.parse(data);  // Zod validation
    next();
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
