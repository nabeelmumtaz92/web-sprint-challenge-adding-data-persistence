// api/server.js
const express = require('express')
const server = express()

server.use(express.json())

// routers
const projectsRouter = require('./project/router')
const tasksRouter = require('./task/router')
const resourcesRouter = require('./resource/router')

// mount routers
server.use('/api/projects', projectsRouter)
server.use('/api/tasks', tasksRouter)
server.use('/api/resources', resourcesRouter)

// health check
server.get('/', (req, res) => {
  res.json({ api: 'up' })
})

// 404 for unknown API routes
server.use('/api', (req, res) => {
  res.status(404).json({ message: 'not found' })
})

// error handler
// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong',
  })
})

module.exports = server
