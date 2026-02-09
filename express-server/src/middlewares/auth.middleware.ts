import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token.util';
import { AuthRequest } from '../types/request.types';
import User from '../models/user.model';
import { UnauthorizedError } from './error.middleware';

export const authenticate = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = verifyToken(token);

    // Get user from database
    const user = await User.findById(decoded.userId).select('+password');
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedError('User account is deactivated');
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
