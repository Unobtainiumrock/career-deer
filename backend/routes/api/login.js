const router = require('express').Router();
const loginController = require('../../controllers/loginController');
const passport = require('../../config');

// Matching with "/api/user/login"
router.route('/login')
  .post(passport.authenticate('local'), loginController.login)

// Matching with "/api/user/signup"
router.route('/signup')
  .post(loginController.signUp, loginController.login)

// So on and so forth.
router.route('/logout')
  .get(loginController.logout)

router.route('/resetpw')
  .post(loginController.resetPW)

module.exports = router;
