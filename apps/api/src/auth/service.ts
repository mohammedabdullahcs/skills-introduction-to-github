import { Result, createSuccess, createError } from '../types.js';
import {
  RegisterUserInput,
  LoginUserInput,
  GetCurrentUserInput,
  User,
  AuthToken,
  RegisterUserSchema,
  LoginUserSchema,
  GetCurrentUserSchema,
} from './types.js';

// Mock data store (in real app, this would be a database)
const users: User[] = [];
const tokens: AuthToken[] = [];

export async function registerUser(input: unknown): Promise<Result<User>> {
  try {
    const validatedInput = RegisterUserSchema.parse(input);
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === validatedInput.email);
    if (existingUser) {
      return createError('User with this email already exists');
    }
    
    // Create new user
    const user: User = {
      id: crypto.randomUUID(),
      email: validatedInput.email,
      name: validatedInput.name,
      createdAt: new Date(),
    };
    
    users.push(user);
    return createSuccess(user);
  } catch (error) {
    return createError(`Validation error: ${error}`);
  }
}

export async function loginUser(input: unknown): Promise<Result<AuthToken>> {
  try {
    const validatedInput = LoginUserSchema.parse(input);
    
    // Find user
    const user = users.find(u => u.email === validatedInput.email);
    if (!user) {
      return createError('Invalid credentials');
    }
    
    // In real app, verify password hash here
    // For now, just create a token
    const token: AuthToken = {
      token: crypto.randomUUID(),
      userId: user.id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    };
    
    tokens.push(token);
    return createSuccess(token);
  } catch (error) {
    return createError(`Validation error: ${error}`);
  }
}

export async function getCurrentUser(input: unknown): Promise<Result<User>> {
  try {
    const validatedInput = GetCurrentUserSchema.parse(input);
    
    // Find token
    const authToken = tokens.find(t => t.token === validatedInput.token);
    if (!authToken) {
      return createError('Invalid token');
    }
    
    // Check if token is expired
    if (authToken.expiresAt < new Date()) {
      return createError('Token expired');
    }
    
    // Find user
    const user = users.find(u => u.id === authToken.userId);
    if (!user) {
      return createError('User not found');
    }
    
    return createSuccess(user);
  } catch (error) {
    return createError(`Validation error: ${error}`);
  }
}