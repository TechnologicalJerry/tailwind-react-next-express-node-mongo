import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../types/request.types';
import authService from './auth.service';
import { sendSuccess } from '../../utils/apiResponse';
import logger from '../../utils/logger';

export class AuthController {
  /**
   * @swagger
   * /api/auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - firstName
   *               - lastName
   *               - userName
   *               - email
   *               - password
   *               - confirmPassword
   *               - phone
   *               - gender
   *               - dob
   *             properties:
   *               firstName:
   *                 type: string
   *                 example: Rajat
   *               lastName:
   *                 type: string
   *                 example: Verma
   *               userName:
   *                 type: string
   *                 example: rajat_verma
   *               email:
   *                 type: string
   *                 example: rajat.verma@example.com
   *               password:
   *                 type: string
   *                 example: Password@123
   *               confirmPassword:
   *                 type: string
   *                 example: Password@123
   *               phone:
   *                 type: string
   *                 example: "9876543210"
   *               gender:
   *                 type: string
   *                 example: male
   *               dob:
   *                 type: string
   *                 format: date
   *                 example: 1998-06-15
   *     responses:
   *       201:
   *         description: User registered successfully
   */

  async register(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const ipAddress = req.ip || req.socket.remoteAddress;
      const userAgent = req.get('user-agent');

      const result = await authService.register(req.body, ipAddress, userAgent);

      logger.info(`User registered: ${result.user.email}`);
      sendSuccess(res, result, 'User registered successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Login user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 description: Email or Username
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login successful
   */
  async login(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const ipAddress = req.ip || req.socket.remoteAddress;
      const userAgent = req.get('user-agent');

      const result = await authService.login(req.body.email, req.body.password, ipAddress, userAgent);

      logger.info(`User logged in: ${result.user.email}`);
      sendSuccess(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/auth/logout:
   *   post:
   *     summary: Logout user
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Logout successful
   */
  async logout(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.substring(7);
      await authService.logout(req.user!._id.toString(), token);

      logger.info(`User logged out: ${req.user!.email}`);
      sendSuccess(res, null, 'Logout successful');
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/auth/logout-all:
   *   post:
   *     summary: Logout from all devices
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Logged out from all devices
   */
  async logoutAll(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await authService.logoutAll(req.user!._id.toString());

      logger.info(`User logged out from all devices: ${req.user!.email}`);
      sendSuccess(res, null, 'Logged out from all devices');
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/auth/sessions:
   *   get:
   *     summary: Get all active sessions
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Active sessions retrieved
   */
  async getSessions(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const sessions = await authService.getSessions(req.user!._id.toString());
      sendSuccess(res, sessions, 'Active sessions retrieved');
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/auth/sessions/{sessionId}:
   *   delete:
   *     summary: Logout from specific session
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: sessionId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Session logged out successfully
   */
  async logoutSession(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await authService.logoutSession(req.user!._id.toString(), req.params.sessionId);
      sendSuccess(res, null, 'Session logged out successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/auth/forgot-password:
   *   post:
   *     summary: Request password reset
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *             properties:
   *               email:
   *                 type: string
   *     responses:
   *       200:
   *         description: Password reset email sent
   */
  async forgotPassword(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.forgotPassword(req.body.email);
      sendSuccess(res, result, 'If email exists, password reset link has been sent');
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/auth/reset-password:
   *   post:
   *     summary: Reset password with token
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - token
   *               - password
   *             properties:
   *               token:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Password reset successful
   */
  async resetPassword(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await authService.resetPassword(req.body.token, req.body.password);
      sendSuccess(res, null, 'Password reset successful');
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
