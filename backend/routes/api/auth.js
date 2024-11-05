const router = require('express').Router();
const authController = require('../../controllers/authController');
const passport = require('../../config');

// Matching  api/auth/google
router.route('/google')
  .get(passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  authController.googleCallback
);

// Matching with /api/auth/load
router.route('/load')
  .get(authController.initialLoad);

// Matching with /api/auth/signup
router.route('/signup')
  .post(authController.signUp);

// Matching with /api/auth/login
router.route('/login')
  .post(passport.authenticate('local'), authController.login);

// So on and so forth.
router.route('/logout')
  .get(authController.logout);

router.route('/resetpw')
  .post(authController.resetPW);

router.route('/updatepw')
  .post(authController.updatepw);

module.exports = router;
