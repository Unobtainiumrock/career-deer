const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  googleId: { type: String, default: null },
  resetPW_hash: { type: String, default: null }
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email', // Use email instead of the default username
  // Optional: disable username uniqueness error (since email is unique in the schema)
  errorMessages: {
    UserExistsError: 'A user with the given email is already registered.'
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
