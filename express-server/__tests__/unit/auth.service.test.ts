import authService from '../../src/modules/auth/auth.service';
import User from '../../src/models/user.model';
import Session from '../../src/models/session.model';
import { hashPassword } from '../../src/utils/password.util';

describe('AuthService', () => {
  describe('register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Test123!',
      };

      const result = await authService.register(userData);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe(userData.email);
    });

    it('should throw error if email already exists', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Test123!',
      };

      await User.create({
        ...userData,
        password: await hashPassword(userData.password),
      });

      await expect(authService.register(userData)).rejects.toThrow();
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const email = 'test@example.com';
      const password = 'Test123!';

      await User.create({
        name: 'Test User',
        email,
        password: await hashPassword(password),
      });

      const result = await authService.login(email, password);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe(email);
    });

    it('should throw error for invalid credentials', async () => {
      await expect(authService.login('invalid@example.com', 'wrong')).rejects.toThrow();
    });
  });
});
