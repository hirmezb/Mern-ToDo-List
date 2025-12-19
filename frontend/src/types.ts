// Shared TypeScript interfaces for the frontend

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Task {
  _id: string;
  user: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  completed: boolean;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}
