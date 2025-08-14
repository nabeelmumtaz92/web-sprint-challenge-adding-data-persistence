// build your `Resource` model here
// api/resource/model.js
const db = require('../../data/db-config')

async function get() {
  const rows = await db('resources').orderBy('resource_id')
  // normalize nulls explicitly
  return rows.map(r => ({
    resource_id: r.resource_id,
    resource_name: r.resource_name,
    resource_description: r.resource_description ?? null,
  }))
}

async function getById(resource_id) {
  const r = await db('resources').where({ resource_id }).first()
  return r
    ? {
        resource_id: r.resource_id,
        resource_name: r.resource_name,
        resource_description: r.resource_description ?? null,
      }
    : null
}

async function create(resource) {
  const toInsert = {
    resource_name: resource.resource_name,
  }
  if (resource.resource_description !== undefined) {
    toInsert.resource_description = resource.resource_description
  }
  const [id] = await db('resources').insert(toInsert)
  return getById(id)
}

module.exports = {
  get,
  getById,
  create,
}
