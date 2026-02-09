import { env } from './env.config';

export const jwtConfig = {
  secret: env.JWT_SECRET,
  expiresIn: env.JWT_EXPIRE,
};

export default jwtConfig;
