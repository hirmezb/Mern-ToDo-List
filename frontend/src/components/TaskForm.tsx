import React, { useState } from 'react';
import { createTask } from '../api';

interface TaskFormProps {
  token: string;
  onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ token, onTaskAdded }) => {
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
      await createTask(token, {
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        category
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
    <div>
      <h2>Add Task</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>
            Priority:
            <select value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Due Date:
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <input
            type="text"
            placeholder="Category (optional)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
