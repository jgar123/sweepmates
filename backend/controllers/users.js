const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment') 

function register(req, res, next) {
  User
    .create(req.body)
    .then(user => res.status(200).json({ message: `Welcome on board ${user.username}` }))
    .catch(next)
}

function login(req, res) {
  User
    .findOne({ username: req.body.username })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorised' })
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '48h' }) 
      res.status(202).json({ message: `Welcome Back ${user.username}`, token })
    }) 
    .catch(() =>  res.status(401).json({ message: 'Unauthorized' }))
}

function profile(req, res) {
  console.log(req.currentUser)
  User
    .findById(req.currentUser.id)
    .then(user => {
      console.log(user)
      res.status(200).json(user)
    })
}

function removeUser(req, res) {
  User
    .findById(req.currentUser.id)
    .then(user => {
      return user.remove()
    })
    .then(() => res.status(200).json({ message: 'User deleted' }))
}

module.exports = {
  register,
  login,
  profile,
  removeUser
}