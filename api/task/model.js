// api/task/model.js
const db = require('../../data/db-config')

const toBool = (n) => Boolean(n)

function mapTaskForPost(row) {
  return {
    task_id: row.task_id,
    task_description: row.task_description,
    task_notes: row.task_notes ?? null,
    task_completed: toBool(row.task_completed),
    project_id: row.project_id,
  }
}

function mapTaskForList(row) {
  return {
    task_id: row.task_id,
    task_description: row.task_description,
    task_notes: row.task_notes ?? null,
    task_completed: toBool(row.task_completed),
    project_name: row.project_name,
    project_description: row.project_description ?? null,
  }
}

async function get() {
  const rows = await db('tasks as t')
    .join('projects as p', 'p.project_id', 't.project_id')
    .select(
      't.task_id',
      't.task_description',
      't.task_notes',
      't.task_completed',
      'p.project_name',
      'p.project_description'
    )
    .orderBy('t.task_id')
  return rows.map(mapTaskForList)
}

async function getById(task_id) {
  const row = await db('tasks').where({ task_id }).first()
  return row ? mapTaskForPost(row) : null
}

async function create(task) {
  const toInsert = {
    task_description: task.task_description,
    project_id: task.project_id,
  }
  if (task.task_notes !== undefined) toInsert.task_notes = task.task_notes
  if (task.task_completed !== undefined) {
    toInsert.task_completed = task.task_completed ? 1 : 0
  }
  const [id] = await db('tasks').insert(toInsert)
  return getById(id)
}

module.exports = {
  get,
  getById,
  create,
}
