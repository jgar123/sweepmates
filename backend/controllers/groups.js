const User = require('../models/User')
const Group = require('../models/Group')

function index(req, res) {
  Group
    .find()
    .populate('user')
    // .populate('messages.user')
    .populate('bets.user')
    .then(groups => {
      console.log(groups)
      res.status(200).json(groups)
    })
}

function create(req, res, next) {
  req.body.user = req.currentUser
  Group
    .create(req.body)
    .then(group => {
      res.status(201).json(group)
      User
        .findById(req.currentUser._id)
        .then(user => {
          user.groups.push({
            id: group.id,
            name: group.name
          })
          return user.save()
        })
    })
    .catch(next)
}

function removeGroup(req, res) {
  Group
    .findById(req.params.id)
    .then(group => {
      if (!group) return res.status(404).json({ message: 'Not Found' })
      if (req.currentUser.username !== group.user.username) return res.status(402).json({ message: 'Not admin of group' })
      return group.remove()
    })
    .then(() => res.status(200).json({ message: 'Group deleted' }))
    .catch(err => console.log(err))
}

function showGroup(req, res) {
  Group
    .findById(req.params.id)
    .populate('user')
    .populate('messages.user')
    .populate('bets.user')
    .then(group => res.status(200).json(group))
}

function addMemberToGroup(req, res) {
  User
    .findOne({ username: req.body.username })
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found' })
      Group
        .findById(req.params.id)
        .then(group => {
          if (group.members.includes(user.username)) return res.status(203).json({ message: 'User already in group' })
          // pushing the username into the members array on the group object
          group.members.push(req.body.username)
          // pushing the group name and id onto the user object
          user.groups.push({
            id: group.id,
            name: group.name
          })
          // save both changes
          user.save()
          return group.save()
        })
        .then(() => res.status(202).json({ message: 'user added' }))
    })
}

function addMessageToGroup(req, res) {
  req.body.user = req.currentUser
  Group
    .findById(req.params.id)
    .populate('user')
    .then(group => {
      if (group.members.includes(!req.currentUser.username) || req.currentUser.username === !group.user.username) 
        return res.status(404).json({ message: 'Not authorised to access group' })
      group.messages.push(req.body)
      return group.save()
    })
    .then(() => res.status(202).json({ message: 'message sent' }))
}

function addBetToGroup(req, res) {
  req.body.user = req.currentUser
  Group
    .findById(req.params.id)
    .populate('user')
    .then(group => {
      if (group.members.includes(!req.currentUser.username) || req.currentUser.username === !group.user.username) 
        return res.status(404).json({ message: 'Not authorised to access group' })
      group.bets.push(req.body)
      return group.save()
    })
    .then(() => res.status(202).json({ message: 'bet placed' }))
}

// if user is authorized and their user ID exists in members array - they can message

module.exports = {
  create,
  removeGroup,
  index,
  showGroup,
  addMemberToGroup,
  addMessageToGroup,
  addBetToGroup
}