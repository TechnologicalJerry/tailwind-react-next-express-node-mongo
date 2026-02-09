import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRE: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
  CLIENT_URL: string;
  LOG_LEVEL: string;
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

export const env: EnvConfig = {
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),
  PORT: parseInt(getEnvVar('PORT', '9000'), 10),
  MONGODB_URI: getEnvVar('MONGODB_URI', 'mongodb://localhost:27017/tailwind-react-next-express-node-mongo'),
  JWT_SECRET: getEnvVar('JWT_SECRET', 'your-secret-key-change-this-in-production'),
  JWT_EXPIRE: getEnvVar('JWT_EXPIRE', '7d'),
  SMTP_HOST: getEnvVar('SMTP_HOST', 'smtp.gmail.com'),
  SMTP_PORT: parseInt(getEnvVar('SMTP_PORT', '587'), 10),
  SMTP_USER: getEnvVar('SMTP_USER', ''),
  SMTP_PASS: getEnvVar('SMTP_PASS', ''),
  CLIENT_URL: getEnvVar('CLIENT_URL', 'http://localhost:3000'),
  LOG_LEVEL: getEnvVar('LOG_LEVEL', 'info'),
};

export default env;
