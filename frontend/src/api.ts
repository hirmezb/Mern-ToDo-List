import axios, { AxiosResponse } from 'axios';
import type { User, Task } from './types';


const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});


// Global request interceptor: attach the JWT token from localStorage
// to the Authorization header for all outgoing requests.
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global response interceptor: if the server returns a 401, the token has
// likely expired or is invalid.  Clear local storage and redirect to the
// login page so the user can re-authenticate.
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Remove token and user from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Register a new user.  Sends name, email and password to the backend.
 * Returns a promise resolving to the Axios response.
 */
export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}): Promise<AxiosResponse<any>> => API.post('/users/register', data);

/**
 * Login a user.  Sends email and password to the backend and expects
 * an object containing a JWT token and user details in the response.
 */
export const loginUser = (data: {
  email: string;
  password: string;
}): Promise<AxiosResponse<{ token: string; user: User }>> =>
  API.post('/users/login', data);

/**
 * Fetch tasks for the authenticated user.  Accepts optional query
 * parameters for filtering and sorting tasks.  The token is automatically
 * attached via the request interceptor.
 */
export const getTasks = (
  params: { priority: string; category: string; completed: string }
): Promise<AxiosResponse<Task[]>> => API.get('/tasks', { params });

/**
 * Create a new task.  The token is automatically attached via the
 * request interceptor.
 */
export const createTask = (
  data: {
    title: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: Date | null;
    category?: string;
  }
): Promise<AxiosResponse<Task>> => API.post('/tasks', data);

/**
 * Update an existing task by ID.  Only include fields that you want to
 * update (e.g. completed, title, description, etc.).
 */
export const updateTask = (
  id: string,
  data: Partial<{
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: Date | null;
    category: string;
    completed: boolean;
  }>
): Promise<AxiosResponse<Task>> => API.put(`/tasks/${id}`, data);

/**
 * Delete a task by ID.  The token is automatically attached via the
 * request interceptor.
 */
export const deleteTask = (
  id: string
): Promise<AxiosResponse<{ message: string }>> => API.delete(`/tasks/${id}`);
