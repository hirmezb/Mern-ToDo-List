import axios, { AxiosResponse } from 'axios';
import type { User, Task } from './types';

// Base API instance
const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Register a user
export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}): Promise<AxiosResponse<any>> => API.post('/users/register', data);

// Login a user
export const loginUser = (data: {
  email: string;
  password: string;
}): Promise<AxiosResponse<{ token: string; user: User }>> =>
  API.post('/users/login', data);

// Get tasks with filters
export const getTasks = (
  token: string,
  params: { priority: string; category: string; completed: string }
): Promise<AxiosResponse<Task[]>> =>
  API.get('/tasks', { headers: { Authorization: `Bearer ${token}` }, params });

// Create a task
export const createTask = (
  token: string,
  data: {
    title: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: Date | null;
    category?: string;
  }
): Promise<AxiosResponse<Task>> =>
  API.post('/tasks', data, { headers: { Authorization: `Bearer ${token}` } });

// Update a task
export const updateTask = (
  token: string,
  id: string,
  data: Partial<{
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: Date | null;
    category: string;
    completed: boolean;
  }>
): Promise<AxiosResponse<Task>> =>
  API.put(`/tasks/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

// Delete a task
export const deleteTask = (
  token: string,
  id: string
): Promise<AxiosResponse<{ message: string }>> =>
  API.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
