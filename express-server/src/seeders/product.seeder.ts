import Product from '../models/product.model';
import User from '../models/user.model';

import logger from '../utils/logger';

export const seedProducts = async (): Promise<void> => {
  try {
    // Check if products already exist
    const productCount = await Product.countDocuments();
    if (productCount > 0) {
      logger.info('Products already exist, skipping seed');
      return;
    }

    // Get a user to assign as creator
    const user = await User.findOne();
    if (!user) {
      logger.warn('No users found. Please seed users first.');
      return;
    }

    const products = [
      {
        name: 'Laptop',
        description: 'High-performance laptop for work and gaming',
        price: 999.99,
        category: 'Electronics',
        stock: 50,
        createdBy: user._id,
        isActive: true,
      },
      {
        name: 'Smartphone',
        description: 'Latest smartphone with advanced features',
        price: 699.99,
        category: 'Electronics',
        stock: 100,
        createdBy: user._id,
        isActive: true,
      },
      {
        name: 'Headphones',
        description: 'Wireless noise-cancelling headphones',
        price: 199.99,
        category: 'Electronics',
        stock: 75,
        createdBy: user._id,
        isActive: true,
      },
      {
        name: 'Desk Chair',
        description: 'Ergonomic office chair',
        price: 299.99,
        category: 'Furniture',
        stock: 30,
        createdBy: user._id,
        isActive: true,
      },
      {
        name: 'Coffee Maker',
        description: 'Automatic coffee maker with timer',
        price: 89.99,
        category: 'Appliances',
        stock: 40,
        createdBy: user._id,
        isActive: true,
      },
    ];

    await Product.insertMany(products);
    logger.info('Products seeded successfully');
  } catch (error) {
    logger.error('Error seeding products:', error);
    throw error;
  }
};

export default seedProducts;
