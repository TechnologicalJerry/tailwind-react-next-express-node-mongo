import { Document } from 'mongoose';
import { Role } from '../constants/roles.constants';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  dob: Date;
  role: Role;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreate {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  dob: string | Date;
  role?: Role;
}

export interface IUserUpdate {
  firstName?: string;
  lastName?: string;
  userName?: string;
  phone?: string;
  gender?: string;
  dob?: string | Date;
  email?: string;
  role?: Role;
  isActive?: boolean;
  isEmailVerified?: boolean;
}

export interface IUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: Role;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
