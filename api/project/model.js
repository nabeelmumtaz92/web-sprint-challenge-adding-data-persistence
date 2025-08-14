// build your `Project` model here
// api/project/model.js
const db = require('../../data/db-config')

const toBool = (n) => Boolean(n)

function mapProject(row) {
  return {
    project_id: row.project_id,
    project_name: row.project_name,
    project_description: row.project_description ?? null,
    project_completed: toBool(row.project_completed),
  }
}

async function get() {
  const rows = await db('projects').orderBy('project_id')
  return rows.map(mapProject)
}

async function getById(project_id) {
  const row = await db('projects').where({ project_id }).first()
  return row ? mapProject(row) : null
}

async function create(project) {
  // project_completed, if provided, comes as boolean from client; store 0/1
  const toInsert = {
    project_name: project.project_name,
  }
  if (project.project_description !== undefined) {
    toInsert.project_description = project.project_description
  }
  if (project.project_completed !== undefined) {
    toInsert.project_completed = project.project_completed ? 1 : 0
  }
  const [id] = await db('projects').insert(toInsert)
  return getById(id)
}

module.exports = {
  get,
  getById,
  create,
}
