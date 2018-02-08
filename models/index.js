

var mongoose = require('mongoose')
var UserSchema = require('../schemas')
var Login = mongoose.model('Login', UserSchema)

module.exports = {
  Login
}