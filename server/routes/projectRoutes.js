const express = require('express')

const Project = require('../models/project')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// CREATE PROJECT
router.post(
  '/',
  authMiddleware,
  async (req, res) => {
    try {
      const { title, description } = req.body

      const project = await Project.create({
        title,
        description,
        createdBy: req.user.id,
      })

      res.status(201).json(project)
    } catch (err) {
      console.log(err)

      res.status(500).json({
        message: 'Server Error',
      })
    }
  }
)

// GET ALL PROJECTS
router.get(
  '/',
  authMiddleware,
  async (req, res) => {
    try {
      const projects = await Project.find()

      res.json(projects)
    } catch (err) {
      console.log(err)

      res.status(500).json({
        message: 'Server Error',
      })
    }
  }
)

module.exports = router