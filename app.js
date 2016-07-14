const Hapi = require('hapi')
const mongoose = require('mongoose')
const secret = require('./config')
const env = require('./env')
const validate = require('./app/util/validate')

const routes = require('./app/routes')

const app = new Hapi.Server()

// Define host and port
app.connection({ host: 'localhost', port: 3000 })

// Define the database URI from an environment variable, stored in env.js
const db = env.MONGODB_URI

// Register the JWT authentication plugin
app.register(require('hapi-auth-jwt2'), (err) => {
  if (err) console.log(err)

  // JWT is the authentication strategy
  app.auth.strategy('jwt', 'jwt', {
    key: secret,
    validateFunc: validate,
    verifyOptions: { algorithms: ['HS256'] }
  })

  // Register the routes, stored in routes.js
  app.route(routes)
})

// If we're not running tests, pretty print request/response
if (!env.TESTING) {
  app.on('response', (request) => {
    console.log('Payload: ' + JSON.stringify(request.payload))
    console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode)
  })
}

// Start the app
app.start((err) => {
  if (err) throw err

  // Connect to the Mongo database
  mongoose.connect(db, {}, (err) => {
    if (err) throw err
  })
})

module.exports = app
