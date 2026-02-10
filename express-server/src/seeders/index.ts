import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { env } from '../config/env.config';
import seedUsers from './user.seeder';
import seedProducts from './product.seeder';
import logger from '../utils/logger';

dotenv.config();

const runSeeders = async (): Promise<void> => {
  try {
    // Connect to database
    await mongoose.connect(env.MONGODB_URI);
    logger.info('Connected to database for seeding');

    // Run seeders
    await seedUsers();
    await seedProducts();

    logger.info('All seeders completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Error running seeders:', error);
    process.exit(1);
  }
};

runSeeders();
