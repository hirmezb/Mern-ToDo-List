import React, { useState } from 'react';
import { createTask } from '../api';

interface TaskFormProps {
  // Callback to refresh the task list after a new task is added.
  onTaskAdded: () => void;
}

/**
 * Renders a form allowing users to add new tasks with optional description,
 * priority, due date and category.  Validates that the title is provided.
 */
const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError('');
    if (!title) {
      setError('Title is required');
      return;
    }
    try {
      await createTask({
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        category,
      });
      setTitle('');
      setDescription('');
      setPriority('low');
      setDueDate('');
      setCategory('');
      onTaskAdded();
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to add task');
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-md mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Add Task</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
        <div>
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <label className="flex-1">
            <span className="block mb-1 text-sm text-gray-600">Priority</span>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label className="flex-1 mt-4 sm:mt-0">
            <span className="block mb-1 text-sm text-gray-600">Due Date</span>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </label>
        </div>
        <div>
          <input
            type="text"
            placeholder="Category (optional)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
