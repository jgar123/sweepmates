const mongoose = require('mongoose')
// let mongooseHidden = require('mongoose-hidden')()
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, hide: true  },
  groups: { type: [] }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, json) {
      return { username: json.username, groups: json.groups }
    }
  }
})

userSchema.plugin(require('mongoose-unique-validator'))
// userSchema.plugin(mongooseHidden)


userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation  = passwordConfirmation
  })

userSchema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

userSchema
  .pre('save',  function hashPassword(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
    }
    next()
  })

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}
module.exports = mongoose.model('User', userSchema) 