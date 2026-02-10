import nodemailer from 'nodemailer';
import { env } from '../config/env.config';
import logger from './logger';

// Create transporter
const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

/**
 * Send email
 */
export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  text?: string
): Promise<void> => {
  try {
    if (!env.SMTP_USER || !env.SMTP_PASS) {
      logger.warn('SMTP credentials not configured. Email not sent.');
      return;
    }

    const mailOptions = {
      from: `"Express API" <${env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
  } catch (error) {
    logger.error(`Error sending email: ${error}`);
    throw new Error('Failed to send email');
  }
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string
): Promise<void> => {
  const resetUrl = `${env.CLIENT_URL}/reset-password?token=${resetToken}`;
  const subject = 'Password Reset Request';
  const html = `
    <h2>Password Reset Request</h2>
    <p>You requested to reset your password. Click the link below to reset it:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>This link will expire in 1 hour.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `;
  const text = `Password Reset Request\n\nClick the link to reset your password: ${resetUrl}\n\nThis link will expire in 1 hour.`;

  await sendEmail(email, subject, html, text);
};

/**
 * Send welcome email
 */
export const sendWelcomeEmail = async (email: string, name: string): Promise<void> => {
  const subject = 'Welcome to Express API';
  const html = `
    <h2>Welcome, ${name}!</h2>
    <p>Thank you for registering with us.</p>
    <p>Your account has been created successfully.</p>
  `;
  const text = `Welcome, ${name}!\n\nThank you for registering with us. Your account has been created successfully.`;

  await sendEmail(email, subject, html, text);
};

export default { sendEmail, sendPasswordResetEmail, sendWelcomeEmail };
