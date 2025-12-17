const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Get all tasks with optional filters
router.get('/', auth, async (req, res) => {
  try {
    const { priority, category, completed } = req.query;
    const query = { user: req.user };
    if (priority) query.priority = priority;
    if (category) query.category = category;
    if (completed !== undefined && completed !== '') {
      query.completed = completed === 'true';
    }
    const tasks = await Task.find(query).sort({ dueDate: 1 });
    return res.json(tasks);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Create a new task
router.post('/', auth, async (req, res) => {
  const { title, description, priority, dueDate, category } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  try {
    const task = new Task({
      user: req.user,
      title,
      description,
      priority,
      dueDate,
      category
    });
    await task.save();
    return res.status(201).json(task);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Update an existing task
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ _id: id, user: req.user });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    Object.assign(task, req.body);
    await task.save();
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, user: req.user });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    return res.json({ message: 'Task deleted' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
