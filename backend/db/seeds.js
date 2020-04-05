const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const User = require('../models/User')

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
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  }
)