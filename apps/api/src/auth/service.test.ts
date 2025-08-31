import { describe, it, expect } from 'vitest';
import { registerUser, loginUser, getCurrentUser } from './service.js';

describe('Auth Service', () => {
  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      const input = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };
      
      const result = await registerUser(input);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe(input.email);
        expect(result.data.name).toBe(input.name);
        expect(result.data.id).toBeDefined();
        expect(result.data.createdAt).toBeDefined();
      }
    });
    
    it('should fail with invalid email', async () => {
      const input = {
        email: 'invalid-email',
        password: 'password123',
        name: 'Test User',
      };
      
      const result = await registerUser(input);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Validation error');
      }
    });
    
    it('should fail with short password', async () => {
      const input = {
        email: 'test2@example.com',
        password: '123',
        name: 'Test User',
      };
      
      const result = await registerUser(input);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Validation error');
      }
    });
  });
  
  describe('loginUser', () => {
    it('should login successfully with valid credentials', async () => {
      // First register a user
      await registerUser({
        email: 'login@example.com',
        password: 'password123',
        name: 'Login User',
      });
      
      const loginInput = {
        email: 'login@example.com',
        password: 'password123',
      };
      
      const result = await loginUser(loginInput);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.token).toBeDefined();
        expect(result.data.userId).toBeDefined();
        expect(result.data.expiresAt).toBeDefined();
      }
    });
    
    it('should fail with non-existent user', async () => {
      const loginInput = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };
      
      const result = await loginUser(loginInput);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Invalid credentials');
      }
    });
  });
  
  describe('getCurrentUser', () => {
    it('should return user for valid token', async () => {
      // Register and login to get a token
      const registerResult = await registerUser({
        email: 'current@example.com',
        password: 'password123',
        name: 'Current User',
      });
      
      if (!registerResult.success) {
        throw new Error('Registration failed');
      }
      
      const loginResult = await loginUser({
        email: 'current@example.com',
        password: 'password123',
      });
      
      if (!loginResult.success) {
        throw new Error('Login failed');
      }
      
      const currentUserResult = await getCurrentUser({
        token: loginResult.data.token,
      });
      
      expect(currentUserResult.success).toBe(true);
      if (currentUserResult.success) {
        expect(currentUserResult.data.email).toBe('current@example.com');
        expect(currentUserResult.data.name).toBe('Current User');
      }
    });
    
    it('should fail with invalid token', async () => {
      const result = await getCurrentUser({
        token: 'invalid-token',
      });
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Invalid token');
      }
    });
  });
});