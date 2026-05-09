const express = require('express')

const Task = require('../models/task')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// CREATE TASK
router.post(
  '/',
  authMiddleware,
  async (req, res) => {
    try {
      const task = await Task.create(req.body)

      res.status(201).json(task)
    } catch (err) {
      console.log(err)

      res.status(500).json({
        message: 'Server Error',
      })
    }
  }
)

// GET TASKS
router.get(
  '/',
  authMiddleware,
  async (req, res) => {
    try {
      const tasks = await Task.find()
        .populate('projectId')
        .populate('assignedTo')

      res.json(tasks)
    } catch (err) {
      console.log(err)

      res.status(500).json({
        message: 'Server Error',
      })
    }
  }
)

// UPDATE TASK STATUS
router.put(
  '/:id',
  authMiddleware,
  async (req, res) => {
    try {
      const updatedTask =
        await Task.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        )

      res.json(updatedTask)
    } catch (err) {
      console.log(err)

      res.status(500).json({
        message: 'Server Error',
      })
    }
  }
)

// DELETE TASK
router.delete(
  '/:id',
  authMiddleware,
  async (req, res) => {
    try {
      await Task.findByIdAndDelete(
        req.params.id
      )

      res.json({
        message: 'Task Deleted',
      })
    } catch (err) {
      console.log(err)

      res.status(500).json({
        message: 'Server Error',
      })
    }
  }
)

module.exports = router