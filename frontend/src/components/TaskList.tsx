import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import { getTasks, updateTask, deleteTask } from '../api';
import type { Task } from '../types';

interface TaskListProps {}

/**
 * Displays a list of tasks for the authenticated user.  Supports filtering by
 * priority, category and completion state.  Provides actions to mark tasks
 * complete/incomplete and to delete tasks.
 */
const TaskList: React.FC<TaskListProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState({
    priority: '',
    category: '',
    completed: '',
  });

  const fetchTasks = async () => {
    try {
      const res = await getTasks(filters);
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks', err);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const toggleComplete = async (task: Task) => {
    await updateTask(task._id, { completed: !task.completed });
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div>
      <TaskForm onTaskAdded={fetchTasks} />
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Filter by priority</label>
          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Filter by category</label>
          <input
            type="text"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Category"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={filters.completed === 'true'}
            onChange={(e) =>
              setFilters({ ...filters, completed: e.target.checked ? 'true' : '' })
            }
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="text-sm text-gray-600">Show completed only</label>
        </div>
      </div>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-md shadow-sm ${
              task.completed ? 'bg-green-50 line-through text-gray-500' : 'bg-white'
            }`}
          >
            <div className="flex-1">
              <span className="font-semibold text-gray-800">{task.title}</span>
              {task.description && (
                <span className="text-gray-600"> – {task.description}</span>
              )}
              {task.dueDate && (
                <span className="text-sm text-gray-500 ml-2">
                  | Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
              {task.priority && (
                <span className="text-sm text-gray-500 ml-2">
                  | Priority: {task.priority}
                </span>
              )}
              {task.category && (
                <span className="text-sm text-gray-500 ml-2">
                  | Category: {task.category}
                </span>
              )}
            </div>
            <div className="mt-3 sm:mt-0 flex-shrink-0 flex space-x-2">
              <button
                onClick={() => toggleComplete(task)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  task.completed
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
