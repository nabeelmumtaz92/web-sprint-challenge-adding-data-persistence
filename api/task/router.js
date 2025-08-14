// build your `/api/tasks` router here
// api/task/router.js
const router = require('express').Router()
const Tasks = require('./model')
const db = require('../../data/db-config')

// [GET] /api/tasks
router.get('/', async (_req, res, next) => {
  try {
    const tasks = await Tasks.get()
    res.json(tasks)
  } catch (err) {
    next(err)
  }
})

// [POST] /api/tasks
router.post('/', async (req, res, next) => {
  try {
    const { task_description, task_notes, task_completed, project_id } = req.body || {}

    if (!task_description || typeof task_description !== 'string') {
      return res.status(400).json({ message: 'task_description is required' })
    }
    if (!project_id) {
      return res.status(400).json({ message: 'project_id is required' })
    }

    // ensure project exists (FK error message is often cryptic)
    const project = await db('projects').where({ project_id }).first()
    if (!project) {
      return res.status(400).json({ message: 'project_id must reference an existing project' })
    }

    const created = await Tasks.create({
      task_description: task_description.trim(),
      task_notes,
      task_completed,
      project_id,
    })

    res.status(201).json(created)
  } catch (err) {
    next(err)
  }
})

module.exports = router
