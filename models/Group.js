const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: false }
})

const betSchema = new mongoose.Schema({
  content: { type: String, required: true },
  wager: { type: Number, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: false }
})

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: false },
  messages: [ messageSchema ],
  bets: [ betSchema ],
  members: []
}, {
  timestamps: true
})

groupSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Group', groupSchema)
