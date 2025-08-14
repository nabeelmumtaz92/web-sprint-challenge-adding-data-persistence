// build your `/api/projects` router here
// api/project/router.js
const router = require('express').Router()
const Projects = require('./model')

// [GET] /api/projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.get()
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

// [POST] /api/projects
router.post('/', async (req, res, next) => {
  try {
    const { project_name, project_description, project_completed } = req.body || {}

    if (!project_name || typeof project_name !== 'string') {
      return res.status(400).json({ message: 'project_name is required' })
    }

    const created = await Projects.create({
      project_name: project_name.trim(),
      project_description,
      project_completed,
    })

    res.status(201).json(created)
  } catch (err) {
    next(err)
  }
})

module.exports = router
