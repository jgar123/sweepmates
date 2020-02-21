const port = 8000
const dbURIPrefix = 'mongodb://localhost/'
const dbName = 'sweepmates'
const dbURI = `${dbURIPrefix}${dbName}`
const secret = 'Very juicy secret'

module.exports = {
  port,
  dbURI,
  secret
}