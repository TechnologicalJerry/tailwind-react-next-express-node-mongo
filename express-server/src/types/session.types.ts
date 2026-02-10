import { Document } from 'mongoose';
import { Types } from 'mongoose';

export interface ISession extends Document {
  userId: Types.ObjectId;
  isActive: boolean;
  loginAt: Date;
  logoutAt?: Date;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: string;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISessionCreate {
  userId: Types.ObjectId;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: string;
  token?: string;
}

export interface ISessionResponse {
  id: string;
  userId: string;
  isActive: boolean;
  loginAt: Date;
  logoutAt?: Date;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: string;
  createdAt: Date;
  updatedAt: Date;
}
