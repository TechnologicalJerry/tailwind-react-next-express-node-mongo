import User from '../../models/user.model';
import Session from '../../models/session.model';
import { hashPassword, verifyPassword } from '../../utils/password.util';
import { generateToken } from '../../utils/token.util';
import { sendWelcomeEmail, sendPasswordResetEmail } from '../../utils/mail.util';
import { IUserCreate } from '../../types/user.types';
import { ISessionCreate } from '../../types/session.types';
import { NotFoundError, ValidationError } from '../../middlewares/error.middleware';
import { Types } from 'mongoose';
import * as crypto from 'crypto';

export class AuthService {
  /**
   * Register a new user
   */
  async register(userData: IUserCreate, ipAddress?: string, userAgent?: string) {
    // Check if user already exists
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { userName: userData.userName }],
    });
    if (existingUser) {
      throw new ValidationError('Email or Username already registered');
    }

    // Hash password
    const hashedPassword = await hashPassword(userData.password);

    // Create user
    const user = await User.create({
      ...userData,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user);

    // Create session
    await Session.create({
      userId: user._id,
      ipAddress,
      userAgent,
      token,
      deviceInfo: userAgent,
    } as ISessionCreate);

    // Send welcome email (non-blocking)
    sendWelcomeEmail(user.email, user.firstName).catch((err) => {
      console.error('Failed to send welcome email:', err);
    });

    return {
      user: this.formatUserResponse(user),
      token,
    };
  }

  /**
   * Login user
   */
  async login(loginIdentifier: string, password: string, ipAddress?: string, userAgent?: string) {
    // Find user with password by email or username
    const user = await User.findOne({
      $or: [{ email: loginIdentifier }, { userName: loginIdentifier }],
    }).select('+password');
    if (!user) {
      throw new NotFoundError('Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new ValidationError('Account is deactivated');
    }

    // Verify password
    const isPasswordValid = await verifyPassword(user.password, password);
    if (!isPasswordValid) {
      throw new NotFoundError('Invalid email or password');
    }

    // Generate token
    const token = generateToken(user);

    // Create session
    await Session.create({
      userId: user._id,
      ipAddress,
      userAgent,
      token,
      deviceInfo: userAgent,
    } as ISessionCreate);

    return {
      user: this.formatUserResponse(user),
      token,
    };
  }

  /**
   * Logout user (deactivate current session)
   */
  async logout(userId: string, token?: string) {
    const query: any = { userId: new Types.ObjectId(userId), isActive: true };
    if (token) {
      query.token = token;
    }

    const session = await Session.findOne(query);
    if (session) {
      await session.deactivate();
    }
  }

  /**
   * Logout from all devices
   */
  async logoutAll(userId: string) {
    await Session.updateMany(
      { userId: new Types.ObjectId(userId), isActive: true },
      { isActive: false, logoutAt: new Date() }
    );
  }

  /**
   * Get all active sessions for a user
   */
  async getSessions(userId: string) {
    const sessions = await Session.find({
      userId: new Types.ObjectId(userId),
      isActive: true,
    })
      .sort({ loginAt: -1 })
      .lean();

    return sessions.map((session) => ({
      id: session._id.toString(),
      userId: session.userId.toString(),
      isActive: session.isActive,
      loginAt: session.loginAt,
      logoutAt: session.logoutAt,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
      deviceInfo: session.deviceInfo,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    }));
  }

  /**
   * Logout from specific session
   */
  async logoutSession(userId: string, sessionId: string) {
    const session = await Session.findOne({
      _id: sessionId,
      userId: new Types.ObjectId(userId),
      isActive: true,
    });

    if (!session) {
      throw new NotFoundError('Session not found');
    }

    await session.deactivate();
  }

  /**
   * Forgot password - generate reset token
   */
  async forgotPassword(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if email exists
      return { message: 'If email exists, password reset link has been sent' };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    // const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour - Reserved for future use

    // Store reset token in user document (you might want to add these fields to User model)
    // For now, we'll use a simple approach
    // In production, you'd want to store this in a separate PasswordReset model

    // Send reset email
    await sendPasswordResetEmail(email, resetToken);

    return { message: 'If email exists, password reset link has been sent' };
  }

  /**
   * Reset password with token
   */
  async resetPassword(_token: string, _newPassword: string) {
    // In production, verify token from database
    // For now, this is a placeholder
    throw new ValidationError('Password reset functionality needs token storage implementation');
  }

  /**
   * Format user response
   */
  private formatUserResponse(user: any) {
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

export default new AuthService();
