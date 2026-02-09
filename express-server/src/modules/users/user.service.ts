import User from '../../models/user.model';
import { IUserCreate, IUserUpdate, IUserResponse } from '../../types/user.types';
import { hashPassword } from '../../utils/password.util';
import { NotFoundError, ValidationError } from '../../middlewares/error.middleware';


export class UserService {
  /**
   * Create a new user
   */
  async createUser(userData: IUserCreate): Promise<IUserResponse> {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new ValidationError('Email already registered');
    }

    // Hash password
    const hashedPassword = await hashPassword(userData.password);

    // Create user
    const user = await User.create({
      ...userData,
      password: hashedPassword,
    });

    return this.formatUserResponse(user);
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<IUserResponse> {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return this.formatUserResponse(user);
  }

  /**
   * Get user profile
   */
  async getUserProfile(userId: string): Promise<IUserResponse> {
    return this.getUserById(userId);
  }

  /**
   * Update user
   */
  async updateUser(userId: string, updateData: IUserUpdate): Promise<IUserResponse> {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Check if email is being updated and if it's already taken
    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await User.findOne({ email: updateData.email });
      if (existingUser) {
        throw new ValidationError('Email already registered');
      }
    }

    // Update user
    Object.assign(user, updateData);
    await user.save();

    return this.formatUserResponse(user);
  }

  /**
   * Delete user (soft delete)
   */
  async deleteUser(userId: string): Promise<void> {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Soft delete
    user.isActive = false;
    await user.save();
  }

  /**
   * Get all users with pagination, filtering, and sorting
   */
  async getUsers(query: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    search?: string;
    role?: string;
    isActive?: boolean;
  }): Promise<{ users: IUserResponse[]; total: number; page: number; limit: number; totalPages: number }> {
    const {
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'desc',
      search,
      role,
      isActive,
    } = query;

    // Build filter
    const filter: any = {};

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { userName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (role) {
      filter.role = role;
    }

    if (isActive !== undefined) {
      filter.isActive = isActive;
    }

    // Build sort
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj: any = { [sort]: sortOrder };

    // Execute query
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      User.find(filter).sort(sortObj).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);

    return {
      users: users.map((user) => this.formatUserResponse(user)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Format user response
   */
  private formatUserResponse(user: any): IUserResponse {
    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

export default new UserService();
