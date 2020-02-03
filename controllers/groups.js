const User = require('../models/User')
const Group = require('../models/Group')

function index(req, res) {
  Group
    .find()
    .populate('username')
    .then(groups => res.status(200).json(groups))
}

function create(req, res, next) {
  req.body.user = req.currentUser
  Group
    .create(req.body)
    .then(group => res.status(201).json(group))
    .catch(next)
}

function remove(req, res) {
  Group
    .findById(req.params.id)
    .then(group => {
      if (!group) return res.status(404).json({ message: 'Not Found' })
      return group.remove()
    })
    .then(() => res.status(200).json({ message: 'Group deleted' }))
    .catch(err => console.log(err))
}

function showGroup(req, res) {
  Group
    .findById(req.params.id)
    .populate('user')
    .then(group => res.status(200).json(group))
}

function addMemberToGroup(req, res) {
  console.log(req.body.username)
  User
    .findOne({ username: req.body.username })
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found' })
      Group
        .findById(req.params.id)
        .then(group => {
          if (group.members.includes(user.username)) return res.status(203).json({ message: 'User already in group' })
          console.log(group.members)
          group.members.push(req.body.username)
          console.log(group.members)
          return group.save()
        })
        .then(() => res.status(202).json({ message: 'user added' }))
    })
}



// if user is authorized and their user ID exists in members array - they can message

module.exports = {
  create,
  remove,
  index,
  showGroup,
  addMemberToGroup
}