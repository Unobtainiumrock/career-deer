const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../models');

const strategy = new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: `${process.env.ROOT_URL}/auth/google/redirect`
	},
	function(token, tokenSecret, profile, done) {
		// testing
		console.log('===== GOOGLE PROFILE =======')
		console.log(profile)
		console.log('======== END ===========')
    // code
		const { id, name, photos } = profile
		db.User.findOne({ 'google.googleId': id }, (err, userMatch) => {
			// handle errors here:
			if (err) {
				console.log('Error!! trying to find user with googleId')
				console.log(err)
				return done(null, false)
			}
			// if there is already someone with that googleId
			if (userMatch) {
				return done(null, userMatch)
			} else {
				// if no user in our db, create a new user with that googleId
				console.log('====== PRE SAVE =======')
				console.log(id)
				console.log(profile)
				console.log('====== post save ....')
				const newGoogleUser = new db.User({
					'google.googleId': id,
					firstName: name.givenName,
					lastName: name.familyName,
					photos: photos
				})
				// save this user
				newGoogleUser.save((err, savedUser) => {
					if (err) {
						console.log('Error!! saving the new google user')
						console.log(err)
						return done(null, false)
					} else {
						return done(null, savedUser)
					}
				}) // closes newGoogleUser.save
			}
		}) // closes User.findONe
	}
)

module.exports = strategy;
