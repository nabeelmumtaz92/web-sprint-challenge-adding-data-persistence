// build your `/api/resources` router here
// api/resource/router.js
const router = require('express').Router()
const Resources = require('./model')

// [GET] /api/resources
router.get('/', async (_req, res, next) => {
  try {
    const resources = await Resources.get()
    res.json(resources)
  } catch (err) {
    next(err)
  }
})

// [POST] /api/resources
router.post('/', async (req, res, next) => {
  try {
    const { resource_name, resource_description } = req.body || {}
    if (!resource_name || typeof resource_name !== 'string') {
      return res.status(400).json({ message: 'resource_name is required' })
    }

    const created = await Resources.create({
      resource_name: resource_name.trim(),
      resource_description,
    })

    res.status(201).json(created)
  } catch (err) {
    // unique constraint friendly message (SQLite)
    if (err && err.code === 'SQLITE_CONSTRAINT') {
      return res.status(400).json({ message: 'resource_name must be unique' })
    }
    next(err)
  }
})

module.exports = router
