import { Result, createSuccess, createError } from '../types.js';
import { Teacher, GetTeacherByIdInput, GetTeacherByIdSchema } from './types.js';

// Mock data store
const teachers: Teacher[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    specialties: ['Math', 'Physics'],
    rating: 4.8,
    isAvailable: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    specialties: ['English', 'Literature'],
    rating: 4.9,
    isAvailable: true,
    createdAt: new Date('2024-01-02'),
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    specialties: ['Chemistry', 'Biology'],
    rating: 4.7,
    isAvailable: false,
    createdAt: new Date('2024-01-03'),
  },
];

export async function listTeachers(): Promise<Result<Teacher[]>> {
  try {
    // In a real app, this might have filters, pagination, etc.
    return createSuccess(teachers);
  } catch (error) {
    return createError(`Failed to list teachers: ${error}`);
  }
}

export async function getTeacherById(input: unknown): Promise<Result<Teacher>> {
  try {
    const validatedInput = GetTeacherByIdSchema.parse(input);
    
    const teacher = teachers.find(t => t.id === validatedInput.id);
    if (!teacher) {
      return createError('Teacher not found');
    }
    
    return createSuccess(teacher);
  } catch (error) {
    return createError(`Validation error: ${error}`);
  }
}