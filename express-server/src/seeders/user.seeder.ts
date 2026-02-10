import User from '../models/user.model';
import { hashPassword } from '../utils/password.util';
import { ROLES } from '../constants/roles.constants';
import logger from '../utils/logger';

export const seedUsers = async (): Promise<void> => {
  try {
    // Check if users already exist
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      logger.info('Users already exist, skipping seed');
      return;
    }

    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await hashPassword('Admin123!'),
        role: ROLES.ADMIN,
        isActive: true,
        isEmailVerified: true,
      },
      {
        name: 'Test User',
        email: 'user@example.com',
        password: await hashPassword('User123!'),
        role: ROLES.USER,
        isActive: true,
        isEmailVerified: true,
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await hashPassword('John123!'),
        role: ROLES.USER,
        isActive: true,
        isEmailVerified: false,
      },
    ];

    await User.insertMany(users);
    logger.info('Users seeded successfully');
  } catch (error) {
    logger.error('Error seeding users:', error);
    throw error;
  }
};

export default seedUsers;
