const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Dummy controller to register the user
exports.registerUser = {
  auth: 'jwt',
  validate: {},
  handler: (req, res) => {
    // Log the payload
    console.log(req.payload)
    // Respond to the request
    res()
  }
}
