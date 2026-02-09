import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Product name must be at least 2 characters',
    'string.max': 'Product name cannot exceed 100 characters',
    'any.required': 'Product name is required',
  }),
  description: Joi.string().max(1000).optional().messages({
    'string.max': 'Description cannot exceed 1000 characters',
  }),
  price: Joi.number().min(0).required().messages({
    'number.min': 'Price cannot be negative',
    'any.required': 'Price is required',
  }),
  category: Joi.string().max(50).optional().messages({
    'string.max': 'Category cannot exceed 50 characters',
  }),
  stock: Joi.number().min(0).optional().default(0).messages({
    'number.min': 'Stock cannot be negative',
  }),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  description: Joi.string().max(1000).optional(),
  price: Joi.number().min(0).optional(),
  category: Joi.string().max(50).optional(),
  stock: Joi.number().min(0).optional(),
  isActive: Joi.boolean().optional(),
});

export const getProductQuerySchema = Joi.object({
  page: Joi.string().pattern(/^\d+$/).optional(),
  limit: Joi.string().pattern(/^\d+$/).optional(),
  sort: Joi.string().optional(),
  order: Joi.string().valid('asc', 'desc').optional(),
  search: Joi.string().optional(),
  category: Joi.string().optional(),
});

export const productIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export default {
  createProductSchema,
  updateProductSchema,
  getProductQuerySchema,
  productIdParamSchema,
};
