

var mongoose = require('mongoose')
var UserSchema = require('./db')
var Login = mongoose.model('Login', UserSchema)

// const express = require('express');
// const router = express.Router();

module.exports = {
  Login
}