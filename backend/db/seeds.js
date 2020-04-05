const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const User = require('../models/User')
const Group = require('../models/Group')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    if (err) return console.log(err)
    db.dropDatabase()
      .then(() => {
        return User.create([{
          username: 'jonny',
          password: 'jonny',
          passwordConfirmation: 'jonny',
          profilePicture: 'HELLO',
          groups: []
        },
        {
          username: 'adam',
          password: 'adam',
          passwordConfirmation: 'adam',
          profilePicture: 'HELLO',
          groups: []
        },
        {
          username: 'elliot',
          password: 'elliot',
          passwordConfirmation: 'elliot',
          profilePicture: 'HELLO',
          groups: []
        }
        ])
      })
      .then(users => {
        console.log(`${users.length} users created`)
        return Group.create([
          {
            name: 'Test group',
            user: users[0],
            messages: {
              text: 'This is a message',
              user: users[0]
            },
            bets: {
              content: 'This is a bet',
              wager: 45,
              user: users[0]
            },
            members: [users[0], users[1], users[2]]
          }
        ]
        )
      })
      .then(locations => console.log(`${locations.length} Locations created`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  }
)