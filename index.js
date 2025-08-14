// start your server here
// index.js
const server = require('./api/server')

const PORT = process.env.PORT || 9000

server.listen(PORT, () => {
  console.log(`\nAPI running on http://localhost:${PORT}\n`)
})
