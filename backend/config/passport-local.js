const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, User.authenticate());
