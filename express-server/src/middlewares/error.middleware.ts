import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';
import logger from '../utils/logger';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  // Log error
  logger.error(`Error: ${err.message}`, {
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return sendError(res, 'Invalid ID format', 400);
  }

  // Mongoose duplicate key
  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyPattern)[0];
    return sendError(res, `${field} already exists`, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values((err as any).errors).map((e: any) => e.message);
    return sendError(res, messages.join(', '), 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 'Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'Token expired', 401);
  }

  // Custom AppError
  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode);
  }

  // Default error
  const statusCode = (err as any).statusCode || 500;
  const message = err.message || 'Internal server error';

  return sendError(res, message, statusCode);
};

export default errorHandler;
