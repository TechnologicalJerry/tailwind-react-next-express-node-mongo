import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  statusCode: number;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
    statusCode,
  });
};

export const sendError = (
  res: Response,
  message: string = 'Error',
  statusCode: number = 500,
  data?: any
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    ...(data && { data }),
  });
};

export default { sendSuccess, sendError };
