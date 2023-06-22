import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const handleValidationError = (req: Request, res: Response, next: NextFunction): void => {
  console.log('running validation error middlware');
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.json(error);
  }
  next();
};

export default handleValidationError;