import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/request.types';
import { ROLES } from '../constants/roles.constants';
import { ForbiddenError } from './error.middleware';

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new ForbiddenError('Authentication required');
    }

    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError('You do not have permission to perform this action');
    }

    next();
  };
};

export const isAdmin = authorize(ROLES.ADMIN);
export const isUser = authorize(ROLES.USER);
export const isAdminOrUser = authorize(ROLES.ADMIN, ROLES.USER);

export default { authorize, isAdmin, isUser, isAdminOrUser };
