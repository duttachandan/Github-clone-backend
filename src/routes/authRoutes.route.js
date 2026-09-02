const express = require('express');
const WrapAsync = require('../utils/WrapAsync');
const AuthController = require('../controllers/Auth.controller');
const passport = require('../components/Passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
}));
router.get('/google/callback', passport.authenticate('google', {
    session: false,
    failureRedirect: '/login'
}), WrapAsync(AuthController.GoogleSignIn));
router.post('/signin', WrapAsync(AuthController.signIn));
router.post('/signup', WrapAsync(AuthController.signUp));
router.get('/new/token', WrapAsync(AuthController.tokenRefresh));


module.exports = router;




