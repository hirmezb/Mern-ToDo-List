import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import { getTasks, updateTask, deleteTask } from '../api';
import type { Task } from '../types';

interface TaskListProps {
  token: string;
}

const TaskList: React.FC<TaskListProps> = ({ token }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState({
    priority: '',
    category: '',
    completed: ''
  });

  const fetchTasks = async () => {
    try {
      const res = await getTasks(token, filters);
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks', err);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, filters]);

  const toggleComplete = async (task: Task) => {
    await updateTask(token, task._id, { completed: !task.completed });
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(token, id);
    fetchTasks();
  };

  return (
    <div>
      <TaskForm token={token} onTaskAdded={fetchTasks} />
      <div style={{ marginTop: '20px' }}>
        <label>
          Filter by priority:{' '}
          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>{' '}
        <label>
          Filter by category:{' '}
          <input
            type="text"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          />
        </label>{' '}
        <label>
          Show completed only:{' '}
          <input
            type="checkbox"
            checked={filters.completed === 'true'}
            onChange={(e) =>
              setFilters({ ...filters, completed: e.target.checked ? 'true' : '' })
            }
          />
        </label>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task._id}
            style={{
              margin: '10px 0',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              textDecoration: task.completed ? 'line-through' : 'none'
            }}
          >
            <strong>{task.title}</strong>{' '}
            {task.description && <span>- {task.description} </span>}
            {task.dueDate && (
              <span>
                | Due: {new Date(task.dueDate).toLocaleDateString()}{' '}
              </span>
            )}
            {task.priority && <span> | Priority: {task.priority} </span>}
            {task.category && <span> | Category: {task.category} </span>}
            <div style={{ marginTop: '5px' }}>
              <button onClick={() => toggleComplete(task)}>
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button onClick={() => handleDelete(task._id)} style={{ marginLeft: '5px' }}>
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
