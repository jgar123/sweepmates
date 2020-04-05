const router = require('express').Router()
const users = require('./controllers/users')
const groups = require('./controllers/groups')
const secureRoute = require('./lib/secureRoute')

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

router.route('/user')
  .get(secureRoute, users.profile)

router.route('/user/:id')
  .delete(users.removeUser)

router.route('/groups')
  .get(groups.index)
  .post(secureRoute, groups.create)

router.route('/group/:id')
  .get(secureRoute, groups.showGroup)
  .delete(secureRoute, groups.removeGroup)

router.route('/group/:id/addmember')
  .post(secureRoute, groups.addMemberToGroup)

router.route('/group/:id/removemember')
  .put(secureRoute, groups.removeUsersFromGroup)

router.route('/group/:id/newmessage')
  .post(secureRoute, groups.addMessageToGroup)

router.route('/group/:id/newBet')
  .post(secureRoute, groups.addBetToGroup)

module.exports = router