import Joi from 'joi';
import { ROLES } from '../../constants/roles.constants';

export const createUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  userName: Joi.string().pattern(/^[a-zA-Z0-9_]+$/).min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
  }),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dob: Joi.date().less('now').required(),
  role: Joi.string().valid(...Object.values(ROLES)).optional(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
  role: Joi.string().valid(...Object.values(ROLES)).optional(),
  isActive: Joi.boolean().optional(),
  isEmailVerified: Joi.boolean().optional(),
});

export const getUserQuerySchema = Joi.object({
  page: Joi.string().pattern(/^\d+$/).optional(),
  limit: Joi.string().pattern(/^\d+$/).optional(),
  sort: Joi.string().optional(),
  order: Joi.string().valid('asc', 'desc').optional(),
  search: Joi.string().optional(),
  role: Joi.string().valid(...Object.values(ROLES)).optional(),
  isActive: Joi.string().valid('true', 'false').optional(),
});

export const userIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export default {
  createUserSchema,
  updateUserSchema,
  getUserQuerySchema,
  userIdParamSchema,
};
