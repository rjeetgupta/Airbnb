import type { NextFunction, Request, Response } from "express";
import { ApiError, InternalServerError } from "../utils/ApiError.js"
import logger from "../config/logger.config.js";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ApiError) {
    logger.warn({ err, path: req.originalUrl }, err.message);
    return res.status(err.statusCode).json(err.toJSON());
  }

  logger.error({ err, path: req.originalUrl }, "Unhandled error");
  const internal = new InternalServerError();
  return res.status(internal.statusCode).json(internal.toJSON());
};
