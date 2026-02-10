import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.config';
import { IUser } from '../types/user.types';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Generate JWT token
 */
export const generateToken = (user: IUser): string => {
  const payload: TokenPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn as any,
  });
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, jwtConfig.secret) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Decode JWT token without verification (for debugging)
 */
export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch (error) {
    return null;
  }
};

export default { generateToken, verifyToken, decodeToken };
