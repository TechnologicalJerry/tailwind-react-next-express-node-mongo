import { Request } from 'express';
import { IUser } from './user.types';

export interface AuthRequest extends Request {
  user?: IUser;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface FilterQuery {
  search?: string;
  role?: string;
  isActive?: string;
  category?: string;
}
