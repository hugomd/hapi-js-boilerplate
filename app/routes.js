const User = require('./controllers/User.js')

module.exports = [

  // Define a route
  { method: 'POST', path: '/api/v1/auth', config: User.registerUser }
  
]
